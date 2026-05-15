"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomerSignup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError("");

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName,
                }),
            });

            if (!response.ok) {
                let errorMessage = "Signup failed. Please try again.";
                try {
                    const errorData = await response.json();
                    if (errorData?.error) {
                        errorMessage = errorData.error;
                    } else if (errorData?.message) {
                        errorMessage = errorData.message;
                    }
                } catch {
                    // Ignore JSON parsing errors and fall back to default message.
                }
                throw new Error(errorMessage);
            }

            // Redirect to verification page
            router.push("/auth/verify?email=" + encodeURIComponent(formData.email));
        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : "An error occurred during signup. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Left Panel - Information */}
            <div
                className="hidden md:flex flex-col w-1/2 p-12 justify-between relative text-white"
                style={{
                    backgroundImage: 'url(/signup.jpg)',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Red overlay */}
                <div className="absolute inset-0 bg-red-900/65" />

                {/* Content (above overlay) */}
                <div className="relative z-10">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-[35px] font-semibold text-white">GLG</span>
                            <span className="text-[25px] text-white/80">Pharmacy</span>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold text-white mb-6">
                            Secure access to your prescriptions and orders
                        </h2>

                        <div className="space-y-4 text-sm leading-relaxed text-white/80">
                            <p>✓ View and manage your prescription history</p>
                            <p>✓ Track medication deliveries in real-time</p>
                            <p>✓ Store medical records safely in one place</p>
                            <p>✓ Receive automated refill reminders</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="relative z-10 text-xs text-white/70 leading-relaxed">
                    Your data is encrypted and used only for account and prescription management. We comply with healthcare data protection standards.
                </p>
            </div>

            {/* Right Panel - Signup Form */}
            <div className="flex flex-col w-full md:w-1/2 p-8 md:p-16 justify-center">
                <div className="w-full max-w-md mx-auto">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center gap-2 mb-12">
                        <img src="/Kliyente.png" alt="GLG Pharmacy" className="w-8 h-8" />
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-semibold text-[#A70000]">GLG</span>
                            <span className="text-sm text-gray-600">Pharmacy</span>
                        </div>
                    </div>

                    {/* Form Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create your account</h1>
                        <p className="text-gray-600 text-sm">Join GLG Pharmacy to manage your prescriptions</p>
                    </div>

                    {/* Error Alert */}
                    {submitError && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-700">{submitError}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                                Full name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors ${errors.fullName
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 bg-white focus:border-gray-900 focus:ring-0"
                                    } focus:outline-none`}
                                placeholder="John Doe"
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors ${errors.email
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 bg-white focus:border-gray-900 focus:ring-0"
                                    } focus:outline-none`}
                                placeholder="name@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors ${errors.password
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 bg-white focus:border-gray-900 focus:ring-0"
                                    } focus:outline-none`}
                                placeholder="At least 8 characters"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-2">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors ${errors.confirmPassword
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 bg-white focus:border-gray-900 focus:ring-0"
                                    } focus:outline-none`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-900 hover:bg-red-800 disabled:bg-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-6 text-sm cursor-pointer"
                        >
                            {isLoading ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    {/* System Message */}
                    <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-900 leading-relaxed">
                            After creating your account, we will send a verification code to your email. Please check your inbox and spam folder.
                        </p>
                    </div>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/auth/signin" className="text-gray-900 font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}