const safePromise = async <T = any, E = any>(
  promise: Promise<T>,
): Promise<[T | undefined, E | null]> => {
  try {
    const res = await promise;

    return [res, null];
  } catch (e: any) {
    return [undefined, e];
  }
};

export default safePromise;
