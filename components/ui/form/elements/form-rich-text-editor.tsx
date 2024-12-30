"use client";
import React from "react";

import RichTextEditor from "@/components/basic/rich-text-editor";
import { FormItemProps } from "@/components/ui/form/form.types";
import { useCustomForm } from "@/components/ui/form/custom-form-provider";
import useOnChange from "@/components/ui/form/hooks/use-on-change";

type Props = Omit<
  React.ComponentProps<typeof RichTextEditor>,
  "name" | "value" | "onChange"
> &
  Omit<FormItemProps, "isRealTime"> & { isRequired?: boolean; label: string };

const FormRichTextEditor: React.FC<Props> = ({
  fieldName,
  placeholder,
  isRequired = false,
  label,
}) => {
  const { errors, setRealTimeData } = useCustomForm();
  const errorMessage = errors[fieldName]?.[0];

  useOnChange(true, fieldName);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-small">
        {label}
        {isRequired && <span className="text-danger ml-0.5">*</span>}
      </label>
      <RichTextEditor
        placeholder={placeholder}
        onChange={(v) =>
          setRealTimeData((prev) => ({ ...prev, [fieldName]: v }))
        }
      />
      {errorMessage && (
        <p className="text-tiny text-danger -mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormRichTextEditor;
