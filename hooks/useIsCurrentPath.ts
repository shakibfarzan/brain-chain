import { usePathname } from "next/navigation";

type Result = (path: string) => boolean;

const useIsCurrentPath = (): Result => {
  const pathname = usePathname();

  return (path: string): boolean => path === pathname;
};

export default useIsCurrentPath;
