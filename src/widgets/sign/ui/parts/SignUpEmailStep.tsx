import type { Route } from 'next';
import Link from 'next/link';
import { OAuthButtons } from '~&/features/auth';
import { ROUTES } from '~&/shared/config';
import { cn } from '~&/shared/lib/utils';
import { Button, Checkbox, Field, FieldError, FieldLabel, Input, Spinner } from '~&/shared/ui';

import { AUTH_BUTTON_CLASS } from '../../lib';
import type { SignUpFlowModel } from '../../model/useSignUpFlow';

export function SignUpEmailStep({
    acceptedTerms,
    email,
    formError,
    handleAcceptedTermsChange,
    handleEmailChange,
    handleEmailSubmit,
    isSubmitting,
}: SignUpFlowModel) {
    return (
        <div className="flex flex-col">
            <h2 className="text-foreground font-[family-name:var(--font-inter)] text-[28px] leading-tight font-extrabold">
                Создайте аккаунт
            </h2>
            <p className="mt-1.5 text-sm text-[#9A9A9A]">
                Без пароля. Вход всегда по коду из письма.
            </p>

            <OAuthButtons
                action="continue"
                className="mt-1.5"
            />

            <div className="mt-1.5 flex items-center gap-1">
                <span className="bg-border h-px flex-1" />
                <span className="text-xs text-[#9A9A9A]">или по email</span>
                <span className="bg-border h-px flex-1" />
            </div>

            <form
                className="mt-1.5 flex flex-col"
                onSubmit={handleEmailSubmit}
            >
                <Field>
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

                {formError && <FieldError className="mt-1.5">{formError}</FieldError>}

                <Button
                    className={cn(AUTH_BUTTON_CLASS, 'mt-1.5')}
                    disabled={!email.trim() || !acceptedTerms || isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? <Spinner /> : 'Далее'}
                </Button>
            </form>

            <p className="mt-[23px] text-sm text-[#9A9A9A]">
                Уже есть аккаунт?{' '}
                <Link
                    className="text-primary font-medium transition-opacity hover:opacity-80"
                    href={ROUTES.AUTH.SIGN_IN as Route}
                >
                    Войти
                </Link>
            </p>
        </div>
    );
}
