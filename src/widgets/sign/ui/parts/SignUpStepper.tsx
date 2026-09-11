import { cn } from '~&/shared/lib/utils';

import { SIGN_UP_STEPS, type SignUpStep } from '../../lib';

interface Props {
    currentStep: SignUpStep;
    onStepSelect: (step: SignUpStep) => void;
}

export function SignUpStepper({ currentStep, onStepSelect }: Props) {
    return (
        <div className="flex w-full items-start">
            {SIGN_UP_STEPS.map((item, index) => {
                const isActive = item.id === currentStep;
                const isCompleted = item.id < currentStep;
                const isHighlighted = isActive || isCompleted;

                return (
                    <div
                        className="contents"
                        key={item.id}
                    >
                        {index > 0 && (
                            <div
                                className={cn(
                                    'mt-3.5 h-px min-w-4 flex-1',
                                    item.id <= currentStep ? 'bg-primary' : 'bg-[#3F3F3F]',
                                )}
                            />
                        )}
                        <button
                            className="flex w-fit shrink-0 flex-col items-center"
                            onClick={() => onStepSelect(item.id)}
                            type="button"
                        >
                            <span
                                className={cn(
                                    'flex size-7 items-center justify-center rounded-full text-sm font-bold',
                                    isHighlighted
                                        ? 'bg-primary text-primary-foreground'
                                        : 'border border-[#9A9A9A] text-[#9A9A9A]',
                                )}
                            >
                                {item.id}
                            </span>
                            <span className="mt-1 h-[17px] text-center text-[11px] leading-[17px] text-[#9A9A9A]">
                                {item.label}
                            </span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
