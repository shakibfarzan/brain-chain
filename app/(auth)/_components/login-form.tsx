"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { z } from "zod";

import { FormInput } from "@/components/ui/form/elements";
import { PasswordInput } from "@/components/ui/form/components";
import SocialButtons from "@/app/(auth)/_components/social-buttons";
import CustomForm from "@/components/ui/form";
import { loginFormAction } from "@/app/(auth)/actions";
import { emailSchema, requiredString } from "@/utils";

const LoginForm: React.FC = () => {
  return (
    <CustomForm
      action={loginFormAction}
      className="flex flex-col gap-6"
      schema={loginFormSchema}
    >
      <FormInput
        isClearable
        isRealTime
        isRequired
        fieldName="email"
        label="Email"
        placeholder="Enter your email"
      />
      <PasswordInput isRealTime isRequired placeholder="Enter your password" />
      <Button color="primary" name="action" type="submit" value="credentials">
        Login
      </Button>
      <SocialButtons />
    </CustomForm>
  );
};

export default LoginForm;

export const loginFormSchema = z.object({
  email: emailSchema,
  password: requiredString,
});
