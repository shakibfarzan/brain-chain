"use client";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormStatus } from "react-dom";

type Props = {
  label?: string;
  placeholder?: string;
  className?: string;
  name?: string;
};

const PasswordInput: React.FC<Props> = ({
  label = "Password",
  className,
  placeholder,
  name = "password",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const formStatus = useFormStatus();

  console.log(formStatus.data);

  return (
    <Input
      className={className}
      endContent={
        <FontAwesomeIcon
          className="cursor-pointer text-sm text-gray-400"
          icon={isVisible ? faEyeSlash : faEye}
          onClick={() => setIsVisible(!isVisible)}
        />
      }
      label={label}
      labelPlacement="outside"
      name="password"
      placeholder={placeholder}
      type={isVisible ? "text" : "password"}
    />
  );
};

export default PasswordInput;
