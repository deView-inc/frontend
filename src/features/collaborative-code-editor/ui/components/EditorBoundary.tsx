import { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export class EditorBoundary extends Component<Props, { failed: boolean }> {
    constructor(props: Props) {
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    handleRetry = () => {
        // React's class-based error boundary resets its fallback through state.
        // oxlint-disable-next-line react/no-set-state
        this.setState({ failed: false });
    };

    render() {
        if (this.state.failed) {
            return (
                <div
                    role="alert"
                    className="p-4 text-sm"
                >
                    Не удалось открыть редактор.{' '}
                    <button
                        type="button"
                        className="underline"
                        onClick={this.handleRetry}
                    >
                        Повторить
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
