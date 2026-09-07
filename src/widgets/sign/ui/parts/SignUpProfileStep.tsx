import { cn } from '~&/shared/lib/utils';
import { Button, Field, FieldLabel, Input } from '~&/shared/ui';

import {
    AUTH_BUTTON_CLASS,
    SIGN_UP_LANGUAGES,
    SIGN_UP_LEVELS,
    SIGN_UP_MAX_LANGUAGES,
} from '../../lib';
import type { SignUpFlowModel } from '../../model/useSignUpFlow';
import { SignUpOptionChip } from './SignUpOptionChip';

export function SignUpProfileStep({
    handleLanguageToggle,
    handleLevelChange,
    handleNameChange,
    handleProfileSubmit,
    languages,
    level,
    name,
}: SignUpFlowModel) {
    const canSubmit = Boolean(name.trim() && level && languages.length > 0);

    return (
        <form
            className="flex flex-col"
            onSubmit={handleProfileSubmit}
        >
            <h2 className="text-foreground font-[family-name:var(--font-inter)] text-[28px] leading-tight font-extrabold">
                Расскажите о себе
            </h2>
            <p className="mt-1.5 text-sm text-[#9A9A9A]">
                Поможет подобрать подходящих собеседников
            </p>

            <Field className="mt-6">
                <FieldLabel htmlFor="sign-up-name">Имя</FieldLabel>
                <Input
                    autoComplete="name"
                    className="h-[46px] px-3"
                    id="sign-up-name"
                    name="name"
                    onChange={handleNameChange}
                    placeholder="Как к вам обращаться"
                    required
                    value={name}
                />
            </Field>

            <Field className="mt-5">
                <FieldLabel>Ваш уровень</FieldLabel>
                <div className="flex flex-col gap-2">
                    {SIGN_UP_LEVELS.map((item) => (
                        <SignUpOptionChip
                            key={item.id}
                            onClick={() => handleLevelChange(item.id)}
                            selected={level === item.id}
                        >
                            <span className="block font-medium">{item.title}</span>
                            <span className="block text-xs text-[#9A9A9A]">{item.experience}</span>
                        </SignUpOptionChip>
                    ))}
                </div>
            </Field>

            <Field className="mt-5">
                <FieldLabel>Языки программирования (до {SIGN_UP_MAX_LANGUAGES})</FieldLabel>
                <div className="flex flex-wrap gap-2">
                    {SIGN_UP_LANGUAGES.map((item) => {
                        const selected = languages.includes(item.id);
                        const disabled = !selected && languages.length >= SIGN_UP_MAX_LANGUAGES;

                        return (
                            <SignUpOptionChip
                                disabled={disabled}
                                key={item.id}
                                onClick={() => handleLanguageToggle(item.id)}
                                selected={selected}
                            >
                                {item.label}
                            </SignUpOptionChip>
                        );
                    })}
                </div>
            </Field>

            <Button
                className={cn(AUTH_BUTTON_CLASS, 'mt-6')}
                disabled={!canSubmit}
                type="submit"
            >
                Завершить регистрацию
            </Button>
        </form>
    );
}
