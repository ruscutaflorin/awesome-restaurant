"use client";
import LoginForm from "../ui/loginPage/login-form";

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-accent bg-opacity-40">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36">
          <div className="w-32 text-white md:w-36"></div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
