import React from "react";

import H1 from "@/components/primitive/h1";
import LoginForm from "@/app/(auth)/_components/login-form";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col gap-6 lg:w-1/3 md:w-1/2 sm:w-2/3 w-full border border-solid border-primary-200 rounded-xl p-8 bg-primary-50 bg-opacity-50">
        <H1 className="text-primary-700 text-center">Welcome back</H1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
