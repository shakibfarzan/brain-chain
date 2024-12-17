import React from "react";

type Options = {
  delay?: number;
  triggerCondition?: boolean;
};

const useDelayedValue = <T>(value: T, options?: Options): T | undefined => {
  const [valueState, setValueState] = React.useState<T>();

  React.useEffect(() => {
    if (options?.triggerCondition === false) setValueState(undefined);
    const timeoutId = setTimeout(
      () => setValueState(value),
      options?.delay ?? 300,
    );

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options?.triggerCondition]);

  return valueState;
};

export default useDelayedValue;
