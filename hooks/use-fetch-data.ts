import { useEffect, useMemo, useState } from "react";

import { safePromise } from "@/utils";

type UseFetchData<T> = {
  isLoading: boolean;
  data: T | undefined;
  error: any;
  reload: () => Promise<void>;
};

type InputAction<T> = (...args: any[]) => Promise<T>;

const useFetchData = <T>(
  inputAction: InputAction<T>,
  options?: {
    args?: Parameters<InputAction<T>>;
    loadCondition?: boolean;
  },
): UseFetchData<T> => {
  const args = useMemo(() => options?.args ?? [], [options?.args]);
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const reload = async () => {
    setIsLoading(true);
    const [res, err] = await safePromise(inputAction(...args));

    setData(res);
    setError(err);
    setIsLoading(false);
  };

  useEffect(() => {
    if (options?.loadCondition === false) return;
    (async () => {
      await reload();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.loadCondition, args]);

  return { data, isLoading, error, reload };
};

export default useFetchData;
