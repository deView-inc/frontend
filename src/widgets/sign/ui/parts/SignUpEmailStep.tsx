import { GithubLogoIcon, GoogleLogoIcon } from '@phosphor-icons/react';
import type { Route } from 'next';
import Link from 'next/link';
import { ROUTES } from '~&/shared/config';
import { cn } from '~&/shared/lib/utils';
import { Button, Checkbox, Field, FieldLabel, Input } from '~&/shared/ui';

import { AUTH_BUTTON_CLASS } from '../../lib';
import type { SignUpFlowModel } from '../../model/useSignUpFlow';

export function SignUpEmailStep({
    acceptedTerms,
    email,
    handleAcceptedTermsChange,
    handleEmailChange,
    handleEmailSubmit,
}: SignUpFlowModel) {
    return (
        <form
            className="flex flex-col"
            onSubmit={handleEmailSubmit}
        >
            <h2 className="text-foreground font-[family-name:var(--font-inter)] text-[28px] leading-tight font-extrabold">
                Создайте аккаунт
            </h2>
            <p className="mt-1.5 text-sm text-[#9A9A9A]">
                Без пароля. Вход всегда по коду из письма.
            </p>

            <div className="mt-1.5 flex flex-col gap-1.5">
                <Button
                    className={AUTH_BUTTON_CLASS}
                    type="button"
                    variant="secondary"
                >
                    <GithubLogoIcon size={18} />
                    Продолжить через GitHub
                </Button>
                <Button
                    className={AUTH_BUTTON_CLASS}
                    type="button"
                    variant="secondary"
                >
                    <GoogleLogoIcon size={18} />
                    Продолжить через Google
                </Button>
            </div>

            <div className="mt-1.5 flex items-center gap-1">
                <span className="bg-border h-px flex-1" />
                <span className="text-xs text-[#9A9A9A]">или по email</span>
                <span className="bg-border h-px flex-1" />
            </div>

            <Field className="mt-1.5">
                <FieldLabel htmlFor="sign-up-email">Email</FieldLabel>
                <Input
                    autoComplete="email"
                    className="h-[46px] px-3"
                    id="sign-up-email"
                    name="email"
                    onChange={handleEmailChange}
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={email}
                />
            </Field>

            <Field
                className="mt-1.5 items-start"
                orientation="horizontal"
            >
                <Checkbox
                    checked={acceptedTerms}
                    className="mt-0.5"
                    id="accepted-terms"
                    onCheckedChange={handleAcceptedTermsChange}
                    required
                />
                <FieldLabel
                    className="block min-w-0 flex-1 items-start leading-5 font-normal text-[#9A9A9A]"
                    htmlFor="accepted-terms"
                >
                    Согласен с{' '}
                    <a
                        className="text-primary"
                        href="#terms"
                    >
                        условиями использования
                    </a>{' '}
                    и
                    <br />
                    <a
                        className="text-primary"
                        href="#privacy"
                    >
                        политикой конфиденциальности
                    </a>
                </FieldLabel>
            </Field>

            <Button
                className={cn(AUTH_BUTTON_CLASS, 'mt-1.5')}
                disabled={!email.trim() || !acceptedTerms}
                type="submit"
            >
                Отправить код
            </Button>

            <p className="mt-[23px] text-sm text-[#9A9A9A]">
                Уже есть аккаунт?{' '}
                <Link
                    className="text-primary font-medium transition-opacity hover:opacity-80"
                    href={ROUTES.AUTH.SIGN_IN as Route}
                >
                    Войти
                </Link>
            </p>
        </form>
    );
}
