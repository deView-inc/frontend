import type { SignMode } from '../lib';
import { SignForm } from './parts/SignForm';
import { SignHero } from './parts/SignHero';

interface Props {
    mode: SignMode;
}

export function SignScreen({ mode }: Props) {
    return (
        <div className="flex w-full max-w-[1100px] flex-col items-center justify-center gap-[60px] lg:flex-row lg:items-center">
            <SignHero />
            <SignForm mode={mode} />
        </div>
    );
}
