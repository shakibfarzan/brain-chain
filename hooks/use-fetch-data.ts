import { useEffect, useState } from "react";

import { safePromise } from "@/utils";

type UseFetchData<T> = {
  isLoading: boolean;
  data: T | undefined;
  error: any;
};

type InputAction<T> = (...args: any[]) => Promise<T>;

const useFetchData = <T>(
  inputAction: InputAction<T>,
  options?: {
    args?: Parameters<InputAction<T>>;
    loadCondition?: boolean;
  },
): UseFetchData<T> => {
  const args = options?.args ?? [];
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (options?.loadCondition === false) return;
    (async () => {
      setIsLoading(true);
      const [res, err] = await safePromise(inputAction(...args));

      setData(res);
      setError(err);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.loadCondition]);

  return { data, isLoading, error };
};

export default useFetchData;
