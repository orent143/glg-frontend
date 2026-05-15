"use client";

import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router =useRouter();
  
  const signUp = () => {
    router.push("auth/signup");
  };

  return (
    <main className="page-shell py-12">
      <h1 className="text-3xl font-semibold text-slate-900">My Account</h1>
      <p className="mt-3 max-w-2xl text-slate-700">
        Sign in to manage profile details, delivery addresses, and prescription orders.
      </p>
      <button onClick={signUp} className="bg-red p-10">Signup</button>
    </main>
  );
}
