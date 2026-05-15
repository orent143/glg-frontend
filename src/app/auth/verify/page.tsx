"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type VerificationStatus = "idle" | "loading" | "success" | "error" | "expired";

export default function EmailVerification() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [status, setStatus] = useState<VerificationStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [resendTimer, setResendTimer] = useState(0);
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Resend cooldown timer
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    // Auto-focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Handle OTP input change
    const handleInputChange = (index: number, value: string) => {
        // Only allow digits
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take last digit
        setOtp(newOtp);

        // Clear error when user starts typing
        if (status === "error") {
            setStatus("idle");
            setErrorMessage("");
        }

        // Auto-focus next field
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

        if (pastedData) {
            const newOtp = [...otp];
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i];
            }
            setOtp(newOtp);

            // Focus last filled field
            const lastFilledIndex = Math.min(pastedData.length - 1, 5);
            inputRefs.current[lastFilledIndex]?.focus();
        }
    };

    // Check if OTP is complete
    const isOtpComplete = otp.every((digit) => digit !== "");
    const otpCode = otp.join("");

    // Handle verification
    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isOtpComplete) return;

        setStatus("loading");
        setErrorMessage("");

        try {
            // TODO: Integrate with Supabase verifyOtp
            // const { data, error } = await supabase.auth.verifyOtp({
            //     email: email,
            //     token: otpCode,
            //     type: "email",
            // });
            //
            // if (error) {
            //     if (error.message.includes("expired")) {
            //         setStatus("expired");
            //         setErrorMessage("This code has expired. Request a new one.");
            //     } else {
            //         setStatus("error");
            //         setErrorMessage("Invalid code. Please try again.");
            //     }
            //     return;
            // }

            // Simulate verification delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setStatus("success");
            setTimeout(() => {
                router.push("/account");
            }, 1500);
        } catch (error) {
            setStatus("error");
            setErrorMessage("An error occurred. Please try again.");
            console.error("Verification error:", error);
        }
    };

    // Handle resend
    const handleResend = async () => {
        if (resendTimer > 0 || !email) return;

        setIsResending(true);
        setErrorMessage("");

        try {
            // TODO: Integrate with Supabase resendEmailOtp
            // const { error } = await supabase.auth.resendEmailOtp({
            //     email: email,
            // });
            //
            // if (error) {
            //     setErrorMessage("Failed to resend code. Please try again.");
            //     return;
            // }

            setResendTimer(60);
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } catch (error) {
            setErrorMessage("Failed to resend code. Please try again.");
            console.error("Resend error:", error);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Verify your email</h1>
                    <p className="text-sm text-gray-600">
                        We sent a 6-digit code to <span className="font-medium">{email || "your email"}</span>. Enter it below to continue.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleVerify} className="space-y-6">
                    {/* OTP Input Fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Verification code
                        </label>
                        <div className="flex gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    disabled={status === "success" || status === "loading"}
                                    aria-label={`Digit ${index + 1} of verification code`}
                                    className={`w-12 h-12 text-center border rounded-lg font-semibold text-lg transition-colors ${
                                        status === "error"
                                            ? "border-red-300 bg-red-50 text-gray-900"
                                            : status === "success"
                                            ? "border-green-300 bg-green-50 text-gray-900"
                                            : "border-gray-300 bg-white text-gray-900 focus:border-gray-900 focus:ring-0"
                                    } focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Status Messages */}
                    {status === "error" && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{errorMessage}</p>
                        </div>
                    )}

                    {status === "expired" && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{errorMessage}</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700">Email verified. Redirecting…</p>
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        type="submit"
                        disabled={!isOtpComplete || status === "success" || status === "loading"}
                        className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? "Verifying…" : "Verify account"}
                    </button>
                </form>

                {/* Resend Section */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                    <button
                        onClick={handleResend}
                        disabled={resendTimer > 0 || isResending || !email}
                        className="text-gray-900 font-medium text-sm hover:underline disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend email"}
                    </button>
                </div>

                {/* Security Note */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                        This step protects your account and prescription data. Your verification code is valid for 15 minutes.
                    </p>
                </div>
            </div>
        </div>
    );
}
