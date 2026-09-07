import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { ROUTES } from '~&/shared/config';
import { saveUserSession } from '~&/shared/lib/session';

import {
    SIGN_UP_DEMO_CODE,
    SIGN_UP_LANGUAGES,
    SIGN_UP_LEVELS,
    SIGN_UP_MAX_LANGUAGES,
    type SignUpLanguageId,
    type SignUpLevelId,
    type SignUpStep,
} from '../lib';

export function useSignUpFlow() {
    const router = useRouter();
    const [step, setStep] = useState<SignUpStep>(1);
    const [email, setEmail] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState<string | null>(null);
    const [resendIn, setResendIn] = useState(0);
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
    };

    const handleAcceptedTermsChange = (checked: boolean) => {
        setAcceptedTerms(checked);
    };

    const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim() || !acceptedTerms) {
            return;
        }

        setCode('');
        setCodeError(null);
        setStep(2);
    };

    const handleBackToEmail = () => {
        setCode('');
        setCodeError(null);
        setStep(1);
    };

    const handleCodeChange = (value: string) => {
        setCode(value);
        setCodeError(null);
    };

    const handleCodeSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (code !== SIGN_UP_DEMO_CODE) {
            setCodeError('Неверный код. Проверьте письмо и попробуйте снова.');
            return;
        }

        setCodeError(null);
        setStep(3);
    };

    const handleResendCode = () => {
        if (resendIn > 0) {
            return;
        }

        setCode('');
        setCodeError(null);
        setResendIn(60);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleLevelChange = (value: SignUpLevelId) => {
        setLevel(value);
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

    const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name.trim() || !level || languages.length === 0) {
            return;
        }

        const selectedLanguages = languages
            .map((id) => SIGN_UP_LANGUAGES.find((item) => item.id === id)?.label)
            .filter((label): label is string => Boolean(label));

        const selectedLevel = SIGN_UP_LEVELS.find((item) => item.id === level);

        saveUserSession({
            email: email.trim(),
            languages: selectedLanguages,
            level: selectedLevel ? `${selectedLevel.title} · ${selectedLevel.experience}` : level,
            name: name.trim(),
        });

        router.push(ROUTES.PROFILE.ROOT as Route);
    };

    return {
        acceptedTerms,
        code,
        codeError,
        email,
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
        languages,
        level,
        name,
        resendIn,
        step,
    };
}

export type SignUpFlowModel = ReturnType<typeof useSignUpFlow>;
