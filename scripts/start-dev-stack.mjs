import { spawn } from 'node:child_process';

let shuttingDown = false;
const children = [];

function run(command, args) {
    const child = spawn(command, args, { stdio: 'inherit', env: process.env });
    children.push(child);
    child.on('exit', (code) => {
        if (shuttingDown) {
            return;
        }

        shuttingDown = true;
        for (const other of children) {
            if (other.pid !== child.pid && !other.killed) {
                other.kill('SIGTERM');
            }
        }
        process.exit(code ?? 1);
    });
}

function shutdown(signal) {
    if (shuttingDown) {
        return;
    }

    shuttingDown = true;
    for (const child of children) {
        if (!child.killed) {
            child.kill(signal);
        }
    }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

run('node', ['scripts/collaboration-server.mjs']);
run('pnpm', ['run', 'start:dev']);
