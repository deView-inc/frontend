import { type ChangeEvent, type FormEvent, useState } from 'react';

export function useSignForm() {
    const [email, setEmail] = useState('');
    const [rememberDevice, setRememberDevice] = useState(false);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleRememberChange = (checked: boolean) => {
        setRememberDevice(checked);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return {
        email,
        handleEmailChange,
        handleRememberChange,
        handleSubmit,
        rememberDevice,
    };
}

export type SignFormModel = ReturnType<typeof useSignForm>;
