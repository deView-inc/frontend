import type { SignUpFlowModel } from '../../model/useSignUpFlow';
import { AuthCodeStep } from './AuthCodeStep';

export function SignUpCodeStep({
    code,
    codeError,
    email,
    handleBackToEmail,
    handleCodeChange,
    handleCodeSubmit,
    handleResendCode,
    isSubmitting,
    resendBlocked,
    resendIn,
}: SignUpFlowModel) {
    return (
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
    );
}
