"use client";
import React from "react";
import { Button } from "@nextui-org/button";

import CustomForm from "@/components/ui/form";
import { updateProfileInformationAction } from "@/app/edit-profile/actions";
import { profileInformationSchema } from "@/app/edit-profile/form-schemas";
import { FormInput } from "@/components/ui/form/elements";
import FormTextarea from "@/components/ui/form/elements/form-textarea";
import useCurrentUser from "@/hooks/use-current-user";
import { FormFunctionalChildren } from "@/components/ui/form/form.types";

const InformationForm = () => {
  const { data: user, reload } = useCurrentUser();

  return (
    <CustomForm
      action={updateProfileInformationAction}
      className="flex flex-col gap-6"
      defaultFormValues={{ name: user?.name, bio: user?.bio }}
      schema={profileInformationSchema}
      onSuccess={async () => {
        // need snackbar
        await reload();
      }}
    >
      {
        (({ pending }) => (
          <>
            <FormInput
              isClearable
              isRealTime
              isRequired
              fieldName="name"
              label="Name"
              placeholder="Enter your name"
            />
            <FormTextarea
              isRealTime
              fieldName="bio"
              label="Bio"
              minRows={4}
              placeholder="Tell us about yourself"
            />
            <div className="w-full justify-end flex">
              <Button
                className="w-min"
                color="primary"
                isLoading={pending}
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </>
        )) as FormFunctionalChildren
      }
    </CustomForm>
  );
};

export default InformationForm;
