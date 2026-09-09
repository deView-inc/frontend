import { Awareness, removeAwarenessStates } from 'y-protocols/awareness';
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';

import type { CollaborationSession, EditorSession, SyncState } from '../model/types';

export class WebsocketCollaborationSession implements CollaborationSession {
    readonly doc = new Doc();
    readonly awareness = new Awareness(this.doc);

    private readonly listeners = new Set<() => void>();
    private state: SyncState = { status: 'connecting', retryable: false };
    private provider: WebsocketProvider | undefined = undefined;
    private timer: ReturnType<typeof setTimeout> | undefined = undefined;
    private destroyed = false;
    private connectedBefore = false;

    constructor(config: EditorSession) {
        try {
            this.initialize(config);
        } catch {
            this.clearTimer();
            this.detachListeners();
            this.disposeConnection();
            this.clearPeers();
            this.publish({
                status: 'error',
                errorMessage:
                    'Сервис совместного редактирования недоступен. Обратитесь к администратору.',
                retryable: false,
            });
        }
    }

    // Public callbacks retain their context when passed to React or browser events.
    getSnapshot = (): SyncState => this.state;

    subscribe = (listener: () => void) => {
        if (this.destroyed) {
            return () => {};
        }
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    };

    retry = () => {
        const { provider } = this;
        if (this.destroyed || !provider) {
            return;
        }
        provider.disconnect();
        this.publishConnecting();
        this.startTimer();
        provider.connect();
    };

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.clearTimer();
        this.detachListeners();
        this.disposeResources();
        this.listeners.clear();
    };

    // Connection setup and matching subscriptions.
    private initialize(config: EditorSession) {
        this.validateConfig(config);
        this.awareness.setLocalStateField('user', config.user);
        const provider = new WebsocketProvider(
            config.wsUrl,
            encodeURIComponent(config.documentId),
            this.doc,
            {
                awareness: this.awareness,
                connect: false,
                disableBc: true,
                maxBackoffTime: 5_000,
            },
        );
        this.provider = provider;
        this.attachListeners(provider);
        this.startTimer();
        provider.connect();
    }

    private validateConfig(config: EditorSession) {
        const url = new URL(config.wsUrl);
        if (
            !['ws:', 'wss:'].includes(url.protocol) ||
            !config.documentId ||
            url.search ||
            url.hash
        ) {
            throw new Error('Invalid collaboration endpoint');
        }
    }

    private attachListeners(provider: WebsocketProvider) {
        provider.on('status', this.handleStatus);
        provider.on('sync', this.handleSync);
        provider.on('connection-error', this.handleError);
        provider.on('closed', this.handleClosed);
        window.addEventListener('offline', this.handleOffline);
        window.addEventListener('online', this.retry);
    }

    private detachListeners(): void {
        window.removeEventListener('offline', this.handleOffline);
        window.removeEventListener('online', this.retry);
        const { provider } = this;
        if (!provider) {
            return;
        }
        provider.off('status', this.handleStatus);
        provider.off('sync', this.handleSync);
        provider.off('connection-error', this.handleError);
        provider.off('closed', this.handleClosed);
    }

    private disposeConnection() {
        this.awareness.setLocalState(null);
        const { provider } = this;
        this.provider = undefined;
        provider?.destroy();
    }

    private disposeResources() {
        this.disposeConnection();
        this.awareness.destroy();
        this.doc.destroy();
    }

    // State notifications and synchronization timeout.
    private publish(next: SyncState) {
        if (this.destroyed) {
            return;
        }
        this.state = next;
        this.listeners.forEach((listener) => listener());
    }

    private publishConnecting() {
        this.publish({
            status: this.connectedBefore ? 'reconnecting' : 'connecting',
            retryable: this.connectedBefore,
        });
    }

    private clearTimer() {
        clearTimeout(this.timer);
        this.timer = undefined;
    }

    private startTimer() {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.timer = undefined;
            this.publish({
                status: 'error',
                errorMessage:
                    'Не удалось синхронизировать документ. Попробуйте подключиться снова.',
                retryable: true,
            });
        }, 15_000);
    }

    private clearPeers() {
        removeAwarenessStates(
            this.awareness,
            [...this.awareness.getStates().keys()].filter((id) => id !== this.doc.clientID),
            'disconnect',
        );
    }

    // Provider and browser event handlers.
    private handleSync = (synced: boolean) => {
        const { provider } = this;
        if (this.destroyed || !provider) {
            return;
        }
        if (synced && provider.wsconnected) {
            this.connectedBefore = true;
            this.clearTimer();
            this.publish({ status: 'connected', retryable: false });
        } else {
            this.publish({
                status: provider.wsconnected ? 'syncing' : 'reconnecting',
                retryable: !provider.wsconnected,
            });
        }
    };

    private handleStatus = ({
        status,
    }: {
        status: 'connected' | 'connecting' | 'disconnected';
    }) => {
        if (this.destroyed) {
            return;
        }
        if (status === 'connected') {
            this.publish({ status: 'syncing', retryable: false });
            this.startTimer();
        } else {
            this.clearPeers();
            this.publishConnecting();
        }
    };

    private handleError = () => {
        this.publish({
            status: 'reconnecting',
            errorMessage: 'Связь потеряна. Ввод будет доступен после синхронизации.',
            retryable: true,
        });
    };

    private handleClosed = () => {
        this.clearTimer();
        this.publish({
            status: 'error',
            errorMessage: 'Сервер отклонил подключение к документу.',
            retryable: true,
        });
    };

    private handleOffline = () => {
        const { provider } = this;
        if (this.destroyed || !provider) {
            return;
        }
        provider.disconnect();
        this.clearTimer();
        this.clearPeers();
        this.publish({
            status: 'reconnecting',
            errorMessage: 'Нет подключения к сети.',
            retryable: true,
        });
    };
}
