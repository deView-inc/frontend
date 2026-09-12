import { createServer } from 'node:http';

import * as decoding from 'lib0/decoding';
import * as encoding from 'lib0/encoding';
import { WebSocketServer } from 'ws';
import * as awarenessProtocol from 'y-protocols/awareness';
import * as syncProtocol from 'y-protocols/sync';
import * as Y from 'yjs';

const MESSAGE_SYNC = 0;
const MESSAGE_AWARENESS = 1;
const PING_MS = 30_000;
const CONNECTING = 0;
const OPEN = 1;

const templates = {
    room: '/** Пара с заданной суммой (Two Sum) */\nfunction twoSum(nums, target) {\n  const seen = new Map();\n  // ваш код здесь\n}\n',
    practice:
        '// Valid Parentheses\nfunction isValid(s) {\n  const stack = [];\n  // ваш код здесь\n}\n',
};

const rooms = new Map();

function getRoom(name) {
    const existing = rooms.get(name);
    if (existing) {
        return existing;
    }

    const doc = new Y.Doc();
    const awareness = new awarenessProtocol.Awareness(doc);
    const conns = new Map();
    awareness.setLocalState(null);

    const room = { awareness, conns, doc };
    rooms.set(name, room);

    doc.on('update', (update) => {
        const encoder = encoding.createEncoder();
        encoding.writeVarUint(encoder, MESSAGE_SYNC);
        syncProtocol.writeUpdate(encoder, update);
        broadcast(room, encoding.toUint8Array(encoder));
    });

    awareness.on('update', ({ added, updated, removed }, origin) => {
        const changed = added.concat(updated, removed);
        const ids = origin ? conns.get(origin) : undefined;
        if (ids) {
            added.forEach((id) => ids.add(id));
            removed.forEach((id) => ids.delete(id));
        }

        const encoder = encoding.createEncoder();
        encoding.writeVarUint(encoder, MESSAGE_AWARENESS);
        encoding.writeVarUint8Array(
            encoder,
            awarenessProtocol.encodeAwarenessUpdate(awareness, changed),
        );
        broadcast(room, encoding.toUint8Array(encoder));
    });

    return room;
}

function send(room, conn, message) {
    if (conn.readyState !== CONNECTING && conn.readyState !== OPEN) {
        closeConn(room, conn);
        return;
    }

    try {
        conn.send(message, {}, (error) => {
            if (error) {
                closeConn(room, conn);
            }
        });
    } catch {
        closeConn(room, conn);
    }
}

function broadcast(room, message) {
    room.conns.forEach((_, conn) => send(room, conn, message));
}

function closeConn(room, conn) {
    const ids = room.conns.get(conn);
    if (!ids) {
        conn.close();
        return;
    }

    room.conns.delete(conn);
    awarenessProtocol.removeAwarenessStates(room.awareness, [...ids], null);
    conn.close();
}

function onMessage(room, conn, data) {
    const encoder = encoding.createEncoder();
    const decoder = decoding.createDecoder(data);
    const type = decoding.readVarUint(decoder);

    if (type === MESSAGE_SYNC) {
        encoding.writeVarUint(encoder, MESSAGE_SYNC);
        syncProtocol.readSyncMessage(decoder, encoder, room.doc, conn);
        if (encoding.length(encoder) > 1) {
            send(room, conn, encoding.toUint8Array(encoder));
        }
        return;
    }

    if (type === MESSAGE_AWARENESS) {
        awarenessProtocol.applyAwarenessUpdate(
            room.awareness,
            decoding.readVarUint8Array(decoder),
            conn,
        );
    }
}

function setupConnection(conn, name) {
    conn.binaryType = 'arraybuffer';
    const room = getRoom(name);
    room.conns.set(conn, new Set());

    conn.on('message', (message) => onMessage(room, conn, new Uint8Array(message)));

    let alive = true;
    const ping = setInterval(() => {
        if (!alive) {
            closeConn(room, conn);
            clearInterval(ping);
            return;
        }

        alive = false;
        try {
            conn.ping();
        } catch {
            closeConn(room, conn);
            clearInterval(ping);
        }
    }, PING_MS);

    conn.on('pong', () => {
        alive = true;
    });
    conn.on('close', () => {
        closeConn(room, conn);
        clearInterval(ping);
    });

    const sync = encoding.createEncoder();
    encoding.writeVarUint(sync, MESSAGE_SYNC);
    syncProtocol.writeSyncStep1(sync, room.doc);
    send(room, conn, encoding.toUint8Array(sync));

    const states = room.awareness.getStates();
    if (states.size === 0) {
        return;
    }

    const awareness = encoding.createEncoder();
    encoding.writeVarUint(awareness, MESSAGE_AWARENESS);
    encoding.writeVarUint8Array(
        awareness,
        awarenessProtocol.encodeAwarenessUpdate(room.awareness, [...states.keys()]),
    );
    send(room, conn, encoding.toUint8Array(awareness));
}

const server = createServer((_request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Yjs development server');
});
const sockets = new WebSocketServer({ noServer: true });
const seeded = new Set();

server.on('upgrade', (request, socket, head) => {
    let name = '';
    try {
        name = decodeURIComponent(new URL(request.url, 'http://localhost').pathname.slice(1));
    } catch {
        socket.destroy();
        return;
    }

    if (!/^(?:room|practice):[^:]+:code$/.test(name)) {
        socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
        socket.destroy();
        return;
    }

    sockets.handleUpgrade(request, socket, head, (connection) => {
        const { doc } = getRoom(name);
        if (!seeded.has(name)) {
            seeded.add(name);
            doc.getText('code').insert(
                0,
                templates[name.startsWith('room:') ? 'room' : 'practice'],
            );
        }
        setupConnection(connection, name);
    });
});

const port = Number(process.env.COLLABORATION_PORT ?? 1234);
const host = process.env.COLLABORATION_HOST ?? '127.0.0.1';
server.listen(port, host, () => {
    process.stdout.write(`Yjs dev server: ws://${host}:${port}\n`);
});
