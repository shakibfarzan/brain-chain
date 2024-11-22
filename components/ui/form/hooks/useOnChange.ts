import { useEffect, useMemo } from "react";

import { useCustomForm } from "@/components/ui/form/custom-form-provider";

type OnChange<T> = {
  value: string | number | boolean | null | undefined;
  onChange: React.ChangeEventHandler<T> | undefined;
  onClear: (() => void) | undefined;
};

const useOnChange = <T = any>(
  isRealTime: boolean,
  fieldName: string,
  isClearable = false,
): OnChange<T> => {
  const { realTimeData, setRealTimeData, schema, setErrors } = useCustomForm();

  const onChange: OnChange<T>["onChange"] = isRealTime
    ? (e) => {
        const currentValue = (e.target as any).value;

        if (currentValue !== undefined)
          setRealTimeData({ ...realTimeData, [fieldName]: currentValue });
      }
    : undefined;

  const value: OnChange<T>["value"] = useMemo(
    () => (isRealTime ? realTimeData[fieldName] : undefined),
    [realTimeData[fieldName]],
  );

  const onClear =
    isClearable && isRealTime
      ? () => setRealTimeData((prev) => ({ ...prev, [fieldName]: "" }))
      : undefined;

  useEffect(
    function effectOnRealTimeData() {
      const result = schema
        ?.pick({ [fieldName]: true })
        ?.safeParse(realTimeData);

      if (!result?.success) {
        setErrors((prev) => ({
          ...prev,
          ...(result?.error.flatten().fieldErrors ?? {}),
        }));
      } else setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    },
    [realTimeData[fieldName]],
  );

  return { value, onChange, onClear };
};

export default useOnChange;
