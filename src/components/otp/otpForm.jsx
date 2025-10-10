import React from 'react';
import {
    InputOTP,
    InputOTPGroup, InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const OtpForm = () => {
    return (
        <form>
            <div className="flex justify-center mb-8">
                <InputOTP maxLength={4}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </form>
    );
};

export default OtpForm;
