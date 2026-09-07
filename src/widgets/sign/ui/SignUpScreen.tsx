'use client';

import { Logo } from '~&/shared/ui/logo';

import { useSignUpFlow } from '../model/useSignUpFlow';
import { SignUpCodeStep } from './parts/SignUpCodeStep';
import { SignUpEmailStep } from './parts/SignUpEmailStep';
import { SignUpProfileStep } from './parts/SignUpProfileStep';
import { SignUpStepper } from './parts/SignUpStepper';

export function SignUpScreen() {
    const flow = useSignUpFlow();

    return (
        <div className="flex w-full max-w-[448px] flex-col items-center">
            <Logo
                className="w-auto justify-center"
                size="md"
            />
            <div className="mt-7 w-full">
                <SignUpStepper
                    currentStep={flow.step}
                    onStepSelect={flow.handleStepSelect}
                />
            </div>
            <div className="border-border bg-card mt-7 w-full rounded-2xl border p-8">
                {flow.step === 1 && <SignUpEmailStep {...flow} />}
                {flow.step === 2 && <SignUpCodeStep {...flow} />}
                {flow.step === 3 && <SignUpProfileStep {...flow} />}
            </div>
        </div>
    );
}
