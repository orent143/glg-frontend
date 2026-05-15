import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

export default function EmailVerificationPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen bg-white px-4">
                    <div className="w-full max-w-md">
                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Verify your email</h1>
                            <p className="text-sm text-gray-600">Loading verification details...</p>
                        </div>
                    </div>
                </div>
            }
        >
            <VerifyClient />
        </Suspense>
    );
}
