"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { FormInput } from "@/components/ui/form/elements";

type Props = Omit<
  React.ComponentProps<typeof FormInput>,
  "endContent" | "type" | "fieldName"
> & { fieldName?: string };

const PasswordInput: React.FC<Props> = ({
  label = "Password",
  fieldName = "password",
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormInput
      {...rest}
      endContent={
        <FontAwesomeIcon
          className="cursor-pointer text-sm text-gray-400"
          icon={isVisible ? faEyeSlash : faEye}
          onClick={() => setIsVisible(!isVisible)}
        />
      }
      fieldName={fieldName}
      label={label}
      type={isVisible ? "text" : "password"}
    />
  );
};

export default PasswordInput;
