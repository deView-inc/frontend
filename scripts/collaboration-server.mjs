import { createServer } from 'node:http';

// oxlint-disable-next-line sort-imports
import { getYDoc, setPersistence, setupWSConnection } from '@y/websocket-server/utils';
import { WebSocketServer } from 'ws';

const server = createServer((_request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Yjs development server');
});
const sockets = new WebSocketServer({ noServer: true });
setPersistence(null);
const initialized = new Set();
const templates = {
    room: '/** Пара с заданной суммой (Two Sum) */\nfunction twoSum(nums, target) {\n  const seen = new Map();\n  // ваш код здесь\n}\n',
    practice:
        '// Valid Parentheses\nfunction isValid(s) {\n  const stack = [];\n  // ваш код здесь\n}\n',
};

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
        const doc = getYDoc(name);
        if (!initialized.has(name)) {
            initialized.add(name);
            doc.getText('code').insert(
                0,
                templates[name.startsWith('room:') ? 'room' : 'practice'],
            );
        }
        setupWSConnection(connection, request, { docName: name });
    });
});

const port = Number(process.env.COLLABORATION_PORT ?? 1234);
server.listen(port, '127.0.0.1', () => {
    process.stdout.write(`Yjs dev server: ws://127.0.0.1:${port}\n`);
});
