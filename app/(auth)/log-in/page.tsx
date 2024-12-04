import React from "react";
import { Card } from "@nextui-org/card";

import H1 from "@/components/primitive/h1";
import LoginForm from "@/app/(auth)/_components/login-form";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col h-[70vh] justify-center items-center">
      <Card
        isBlurred
        className="flex shadow-2xl shadow-secondary-200 flex-col gap-6 lg:w-1/3 md:w-1/2 sm:w-2/3 w-full rounded-xl p-8 bg-opacity-50"
      >
        <H1 className="text-primary-700 text-center">Welcome back</H1>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
