'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { OAuthButtons } from '~&/features/auth';
import { cn } from '~&/shared/lib/utils';
import { Button, Checkbox, Field, FieldError, FieldLabel, Input, Spinner } from '~&/shared/ui';

import { AUTH_BUTTON_CLASS, SIGN_COPY, type SignMode } from '../../lib';
import { useSignForm } from '../../model/useSignForm';
import { AuthCodeStep } from './AuthCodeStep';

interface Props {
    mode: SignMode;
}

export function SignForm({ mode }: Props) {
    const {
        code,
        codeError,
        email,
        formError,
        handleBackToEmail,
        handleCodeChange,
        handleCodeSubmit,
        handleEmailChange,
        handleRememberChange,
        handleResendCode,
        handleSubmit,
        isSubmitting,
        rememberDevice,
        resendBlocked,
        resendIn,
        step,
    } = useSignForm();
    const copy = SIGN_COPY[mode];

    if (step === 'code') {
        return (
            <div className="border-border bg-card w-full max-w-[420px] rounded-2xl border p-8">
                <AuthCodeStep
                    code={code}
                    codeError={codeError}
                    email={email}
                    isSubmitting={isSubmitting}
                    onBack={handleBackToEmail}
                    onCodeChange={handleCodeChange}
                    onResend={() => void handleResendCode()}
                    onSubmit={(event) => void handleCodeSubmit(event)}
                    resendBlocked={resendBlocked}
                    resendIn={resendIn}
                />
            </div>
        );
    }

    return (
        <div className="border-border bg-card w-full max-w-[420px] rounded-2xl border p-8">
            <h2 className="text-foreground font-[family-name:var(--font-inter)] text-[28px] leading-tight font-extrabold">
                {copy.title}
            </h2>
            <p className="mt-1.5 text-sm text-[#9A9A9A]">{copy.subtitle}</p>

            <OAuthButtons
                action="sign-in"
                className="mt-1.5"
            />

            <div className="mt-1.5 flex items-center gap-1">
                <span className="bg-border h-px flex-1" />
                <span className="text-xs text-[#9A9A9A]">или по email</span>
                <span className="bg-border h-px flex-1" />
            </div>

            <form
                className="mt-1.5 flex flex-col"
                onSubmit={(event) => void handleSubmit(event)}
            >
                <Field>
                    <FieldLabel htmlFor="sign-email">Email</FieldLabel>
                    <Input
                        autoComplete="email"
                        className="h-[46px] px-3"
                        id="sign-email"
                        name="email"
                        onChange={handleEmailChange}
                        placeholder="you@example.com"
                        required
                        type="email"
                        value={email}
                    />
                </Field>

                <Field
                    className="mt-1.5 items-center"
                    orientation="horizontal"
                >
                    <Checkbox
                        checked={rememberDevice}
                        id="remember-device"
                        onCheckedChange={handleRememberChange}
                    />
                    <FieldLabel
                        className="w-auto font-normal text-[#9A9A9A]"
                        htmlFor="remember-device"
                    >
                        Запомнить это устройство на 30 дней
                    </FieldLabel>
                </Field>

                {formError && <FieldError className="mt-1.5">{formError}</FieldError>}

                <Button
                    className={cn(AUTH_BUTTON_CLASS, 'mt-1.5')}
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? <Spinner /> : 'Получить код'}
                </Button>
            </form>

            <p className="mt-[23px] text-sm text-[#9A9A9A]">
                {copy.footerPrompt}{' '}
                <Link
                    className="text-primary font-medium transition-opacity hover:opacity-80"
                    href={copy.footerHref as Route}
                >
                    {copy.footerAction}
                </Link>
            </p>
        </div>
    );
}
