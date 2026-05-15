"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomerSignin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                let errorMessage = "Sign in failed. Please try again.";
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

            const data = await response.json();
            
            // Store authentication token if provided
            if (data?.token) {
                localStorage.setItem("authToken", data.token);
            }

            // Redirect to home or dashboard
            router.push("/");
        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : "An error occurred during sign in. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Left Panel - Information */}
            <div className="hidden md:flex flex-col w-1/2 bg-gray-50 p-12 justify-between">
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src="/Kliyente.png" alt="GLG Pharmacy" className="w-8 h-8" />
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-semibold text-[#A70000]">GLG</span>
                            <span className="text-sm text-gray-600">Pharmacy</span>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Manage your prescriptions with confidence
                        </h2>
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                            <p>✓ Quick and secure access to your account</p>
                            <p>✓ Track all your medication orders and deliveries</p>
                            <p>✓ View your complete prescription history</p>
                            <p>✓ Manage refill requests with ease</p>
                        </div>
                    </div>
                </div>

                {/* Footer trust text */}
                <p className="text-xs text-gray-500 leading-relaxed">
                    Your login is protected with encryption. We comply with healthcare data protection standards and never share your information.
                </p>
            </div>

            {/* Right Panel - Sign In Form */}
            <div className="flex flex-col w-full md:w-1/2 p-8 md:p-16 justify-center">
                <div className="w-full max-w-md mx-auto">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center gap-2 mb-12">
                        <img src="/Kliyente.png" alt="GLG Pharmacy" className="w-8 h-8" />
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-semibold text-gray-900">GLG</span>
                            <span className="text-sm text-gray-600">Pharmacy</span>
                        </div>
                    </div>

                    {/* Form Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sign in to your account</h1>
                        <p className="text-gray-600 text-sm">Access your prescriptions and orders</p>
                    </div>

                    {/* Error Alert */}
                    {submitError && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-700">{submitError}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <Link
                                href="/auth/forgot-password"
                                className="text-xs text-gray-600 hover:text-gray-900 transition"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-6 text-sm"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    {/* Security Note */}
                    <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-900 leading-relaxed">
                            Your login credentials are encrypted and never stored in plain text. We use industry-standard security protocols.
                        </p>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="text-gray-900 font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
