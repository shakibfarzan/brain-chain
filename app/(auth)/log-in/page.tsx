import React from "react";
import Form from "next/form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { PasswordInput } from "../../../components/ui/form/components";

import { auth } from "@/auth";
import H1 from "@/components/primitive/h1";
import SocialButtons from "@/app/(auth)/_components/social-buttons";

const LoginPage = async () => {
  const session = await auth();

  // return (
  //   <form
  //     action={async () => {
  //       "use server";
  //       if (!session?.user) await signIn("github");
  //       else await signOut();
  //     }}
  //   >
  //     <button type="submit">Signin with GitHub</button>
  //   </form>
  // );
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col gap-6 w-1/3 border border-solid border-primary-200 rounded-xl p-8 bg-primary-50 bg-opacity-50">
        <H1 className="text-primary-700 text-center">Welcome back</H1>
        <Form
          action={async (formData) => {
            "use server";
            console.log(formData);
            if (formData.get("password") !== "12345678")
              throw new Error("Passwords don't match");
          }}
          className="flex flex-col gap-6"
        >
          <Input
            isClearable
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
          />
          <PasswordInput placeholder="Enter your password" />
          <Button
            color="primary"
            name="action"
            type="submit"
            value="credentials"
          >
            Login
          </Button>
          <SocialButtons />
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
