import { ArrowLeftIcon } from '@phosphor-icons/react';
import type { FormEvent } from 'react';
import { cn } from '~&/shared/lib/utils';
import { Button, FieldError, InputOTP, InputOTPGroup, InputOTPSlot, Spinner } from '~&/shared/ui';

const OTP_LENGTH = 6;
const OTP_INDEXES = [0, 1, 2, 3, 4, 5] as const;

interface Props {
    backLabel?: string;
    code: string;
    codeError: string | null;
    email: string;
    isSubmitting?: boolean;
    onBack: () => void;
    onCodeChange: (value: string) => void;
    onResend: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    resendBlocked?: boolean;
    resendIn: number;
}

export function AuthCodeStep({
    backLabel = 'Изменить email',
    code,
    codeError,
    email,
    isSubmitting = false,
    onBack,
    onCodeChange,
    onResend,
    onSubmit,
    resendBlocked = false,
    resendIn,
}: Props) {
    const canResend = resendIn === 0 && !resendBlocked && !isSubmitting;

    return (
        <form
            className="flex flex-col"
            onSubmit={onSubmit}
        >
            <button
                className="mb-4 flex items-center gap-1.5 self-start text-sm text-[#9A9A9A]"
                onClick={onBack}
                type="button"
            >
                <ArrowLeftIcon size={16} />
                {backLabel}
            </button>

            <h2 className="text-foreground font-[family-name:var(--font-inter)] text-[28px] leading-tight font-extrabold">
                Подтвердите email
            </h2>
            <p className="mt-1.5 text-sm text-[#9A9A9A]">Мы отправили 6-значный код на {email}</p>

            <div className="mt-6 w-full">
                <InputOTP
                    containerClassName="w-full"
                    maxLength={OTP_LENGTH}
                    onChange={onCodeChange}
                    value={code}
                >
                    <InputOTPGroup className="flex w-full gap-2">
                        {OTP_INDEXES.map((index) => (
                            <InputOTPSlot
                                aria-invalid={Boolean(codeError)}
                                className="h-12 flex-1 rounded-lg border border-l text-base first:rounded-lg first:border-l last:rounded-lg"
                                index={index}
                                key={index}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>

            {codeError && <FieldError className="mt-2">{codeError}</FieldError>}

            <Button
                className="mt-6 h-[46px] w-full gap-2"
                disabled={code.length !== OTP_LENGTH || isSubmitting}
                type="submit"
            >
                {isSubmitting ? <Spinner /> : 'Подтвердить'}
            </Button>

            <p className="mt-[23px] text-sm text-[#9A9A9A]">
                Не пришёл код?{' '}
                {resendBlocked ? (
                    <span className="text-[#5A5A5A]">Достигнут лимит отправки</span>
                ) : (
                    <button
                        className={cn(
                            'font-medium',
                            canResend
                                ? 'text-primary transition-opacity hover:opacity-80'
                                : 'cursor-not-allowed text-[#5A5A5A]',
                        )}
                        disabled={!canResend}
                        onClick={onResend}
                        type="button"
                    >
                        {canResend ? 'Отправить снова' : `Отправить снова (${resendIn}с)`}
                    </button>
                )}
            </p>
        </form>
    );
}
