"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import CustomForm from "@/components/ui/form";
import { updatePasswordsAction } from "@/app/edit-profile/actions";
import { passwordsFormSchema } from "@/app/edit-profile/form-schemas";
import { PasswordInput } from "@/components/ui/form/components";

type Props = {
  actionType?: "update" | "set";
};

const PasswordsForm: React.FC<Props> = ({ actionType }) => {
  const isUpdate = actionType === "update";
  const { refresh } = useRouter();

  return (
    <CustomForm
      shouldResetAfterSuccess
      action={updatePasswordsAction}
      className="flex flex-col gap-6"
      schema={passwordsFormSchema(isUpdate)}
      onSuccess={() => {
        // need snackbar
        refresh();
      }}
    >
      {isUpdate && (
        <PasswordInput
          isRealTime
          isRequired
          fieldName="currentPassword"
          label="Current Password"
          placeholder="Enter your current password"
        />
      )}
      <PasswordInput
        isRealTime
        isRequired
        fieldName="newPassword"
        label="New Password"
        placeholder="Enter your new password"
      />
      <PasswordInput
        isRealTime
        isRequired
        fieldName="confirmPassword"
        label="Confirm Password"
        placeholder="Enter your new password again"
      />
      <div className="w-full flex justify-end">
        <Button
          className="w-min"
          color="primary"
          name="actionType"
          type="submit"
          value={actionType}
        >
          {isUpdate ? "Update Password" : "Set Password"}
        </Button>
      </div>
    </CustomForm>
  );
};

export default PasswordsForm;
