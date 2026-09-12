import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import {
    confirmSignIn,
    getAuthErrorMessage,
    getResendCooldown,
    hasAuthErrorCode,
    isResendLimitReached,
    resendCode,
    signIn,
    useSession,
} from '~&/features/auth';
import { ROUTES } from '~&/shared/config';

import { AUTH_OTP_LENGTH } from '../lib';

export function useSignForm() {
    const router = useRouter();
    const { establishSession } = useSession();
    const [email, setEmail] = useState('');
    const [rememberDevice, setRememberDevice] = useState(false);
    const [step, setStep] = useState<'code' | 'email'>('email');
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [resendIn, setResendIn] = useState(0);
    const [resendBlocked, setResendBlocked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (resendIn <= 0) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setResendIn((current) => current - 1);
        }, 1000);

        return () => window.clearTimeout(timeoutId);
    }, [resendIn]);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setFormError(null);
    };

    const handleRememberChange = (checked: boolean) => {
        setRememberDevice(checked);
    };

    const handleCodeChange = (value: string) => {
        setCode(value);
        setCodeError(null);
    };

    const handleBackToEmail = () => {
        setCode('');
        setCodeError(null);
        setStep('email');
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextEmail = email.trim();

        if (!nextEmail || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setFormError(null);

        try {
            await signIn(nextEmail);
            setCode('');
            setCodeError(null);
            setResendBlocked(false);
            setResendIn(60);
            setStep('code');
        } catch (error) {
            if (hasAuthErrorCode(error, 'CODE_ALREADY_SENT')) {
                setCode('');
                setCodeError(null);
                setResendIn(getResendCooldown());
                setStep('code');
                return;
            }

            setFormError(getAuthErrorMessage(error, 'Не удалось отправить код'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (code.length !== AUTH_OTP_LENGTH || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setCodeError(null);

        try {
            const result = await confirmSignIn(email.trim(), code);
            await establishSession(result.token);
            router.push(ROUTES.PROFILE.ROOT as Route);
        } catch (error) {
            setCodeError(getAuthErrorMessage(error, 'Не удалось подтвердить код'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendCode = async () => {
        if (resendIn > 0 || resendBlocked || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setCodeError(null);

        try {
            const result = await resendCode(email.trim(), 'sign-in');
            setCode('');
            setResendIn(getResendCooldown(result));
            setResendBlocked(isResendLimitReached(result.retries));
        } catch (error) {
            if (hasAuthErrorCode(error, 'CODE_ALREADY_SENT')) {
                setResendIn(getResendCooldown());
                return;
            }

            setCodeError(getAuthErrorMessage(error, 'Не удалось отправить код повторно'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
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
    };
}

export type SignFormModel = ReturnType<typeof useSignForm>;
