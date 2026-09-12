import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import {
    confirmSignUp,
    getAuthErrorMessage,
    getResendCooldown,
    hasAuthErrorCode,
    isResendLimitReached,
    resendCode,
    signUp,
    useSession,
} from '~&/features/auth';
import { ROUTES } from '~&/shared/config';

import {
    AUTH_OTP_LENGTH,
    SIGN_UP_LANGUAGES,
    SIGN_UP_MAX_LANGUAGES,
    type SignUpLanguageId,
    type SignUpLevelId,
    type SignUpStep,
} from '../lib';

export function useSignUpFlow() {
    const router = useRouter();
    const { establishSession } = useSession();
    const [step, setStep] = useState<SignUpStep>(1);
    const [email, setEmail] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [resendIn, setResendIn] = useState(0);
    const [resendBlocked, setResendBlocked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [level, setLevel] = useState<SignUpLevelId | null>(null);
    const [languages, setLanguages] = useState<SignUpLanguageId[]>([]);

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

    const handleAcceptedTermsChange = (checked: boolean) => {
        setAcceptedTerms(checked);
    };

    const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim() || !acceptedTerms) {
            return;
        }

        setFormError(null);
        setStep(2);
    };

    const handleBackToEmail = () => {
        setCode('');
        setCodeError(null);
        setFormError(null);
        setStep(1);
    };

    const handleCodeChange = (value: string) => {
        setCode(value);
        setCodeError(null);
    };

    const handleCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (code.length !== AUTH_OTP_LENGTH || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setCodeError(null);

        try {
            const result = await confirmSignUp(email.trim(), code);
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
            const result = await resendCode(email.trim(), 'sign-up');
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

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setFormError(null);
    };

    const handleLevelChange = (value: SignUpLevelId) => {
        setLevel(value);
        setFormError(null);
    };

    const handleLanguageToggle = (value: SignUpLanguageId) => {
        setLanguages((current) => {
            if (current.includes(value)) {
                return current.filter((item) => item !== value);
            }

            if (current.length >= SIGN_UP_MAX_LANGUAGES) {
                return current;
            }

            return [...current, value];
        });
    };

    const handleStepSelect = (nextStep: SignUpStep) => {
        if (nextStep < step) {
            setStep(nextStep);
        }
    };

    const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name.trim() || !level || isSubmitting) {
            return;
        }

        const selectedLanguages = SIGN_UP_LANGUAGES.filter((item) =>
            languages.includes(item.id),
        ).map((item) => item.label);

        setIsSubmitting(true);
        setFormError(null);

        try {
            await signUp({
                email: email.trim(),
                firstName: name.trim(),
                grade: level,
                stack: selectedLanguages,
            });
            setCode('');
            setCodeError(null);
            setResendBlocked(false);
            setResendIn(60);
            setStep(3);
        } catch (error) {
            if (hasAuthErrorCode(error, 'CODE_ALREADY_SENT')) {
                setCode('');
                setCodeError(null);
                setResendIn(getResendCooldown());
                setStep(3);
                return;
            }

            setFormError(getAuthErrorMessage(error, 'Не удалось отправить код'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        acceptedTerms,
        code,
        codeError,
        email,
        formError,
        handleAcceptedTermsChange,
        handleBackToEmail,
        handleCodeChange,
        handleCodeSubmit,
        handleEmailChange,
        handleEmailSubmit,
        handleLanguageToggle,
        handleLevelChange,
        handleNameChange,
        handleProfileSubmit,
        handleResendCode,
        handleStepSelect,
        isSubmitting,
        languages,
        level,
        name,
        resendBlocked,
        resendIn,
        step,
    };
}

export type SignUpFlowModel = ReturnType<typeof useSignUpFlow>;
