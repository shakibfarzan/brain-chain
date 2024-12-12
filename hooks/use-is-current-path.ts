import { usePathname } from "next/navigation";

type Result = (path: string) => boolean;

const useIsCurrentPath = (): Result => {
  const pathname = usePathname();

  return (path: string): boolean => {
    if (path === "/") return pathname === "/";
    else return pathname.startsWith(path);
  };
};

export default useIsCurrentPath;
