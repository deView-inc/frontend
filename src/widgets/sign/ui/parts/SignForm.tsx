'use client';

import { GithubLogoIcon, GoogleLogoIcon } from '@phosphor-icons/react';
import type { Route } from 'next';
import Link from 'next/link';
import { cn } from '~&/shared/lib/utils';
import { Button, Checkbox, Field, FieldLabel, Input } from '~&/shared/ui';

import { SIGN_COPY, type SignMode } from '../../lib';
import { useSignForm } from '../../model/useSignForm';

const AUTH_BUTTON_CLASS = 'h-[46px] w-full gap-2';

interface Props {
    mode: SignMode;
}

export function SignForm({ mode }: Props) {
    const { email, handleEmailChange, handleRememberChange, handleSubmit, rememberDevice } =
        useSignForm();
    const copy = SIGN_COPY[mode];

    return (
        <div className="border-border bg-card w-full max-w-[420px] rounded-2xl border p-8">
            <h2 className="text-foreground font-[family-name:var(--font-inter)] text-[28px] leading-tight font-extrabold">
                {copy.title}
            </h2>
            <p className="mt-1.5 text-sm text-[#9A9A9A]">{copy.subtitle}</p>

            <div className="mt-1.5 flex flex-col gap-1.5">
                <Button
                    className={AUTH_BUTTON_CLASS}
                    type="button"
                    variant="secondary"
                >
                    <GithubLogoIcon size={18} />
                    Войти через GitHub
                </Button>
                <Button
                    className={AUTH_BUTTON_CLASS}
                    type="button"
                    variant="secondary"
                >
                    <GoogleLogoIcon size={18} />
                    Войти через Google
                </Button>
            </div>

            <div className="mt-1.5 flex items-center gap-1">
                <span className="bg-border h-px flex-1" />
                <span className="text-xs text-[#9A9A9A]">или по email</span>
                <span className="bg-border h-px flex-1" />
            </div>

            <form
                className="mt-1.5 flex flex-col"
                onSubmit={handleSubmit}
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

                <Button
                    className={cn(AUTH_BUTTON_CLASS, 'mt-1.5')}
                    type="submit"
                >
                    Получить код
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
