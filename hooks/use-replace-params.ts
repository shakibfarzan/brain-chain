import { useSearchParams } from "next/navigation";

import { SIGNS } from "@/config/constants";
import { useAppParams } from "@/hooks/index";

type Result = {
  manual: (
    route: string,
    options?: {
      params?: string[];
      searchParams?: Record<string, string>;
      approach?: "append" | "set";
    },
  ) => string;

  auto: (route: string) => string;
};

const useReplaceParams = (): Result => {
  const appParams = useAppParams();
  const searchParams = useSearchParams();
  const getCurrentSearchParams = (): Record<string, string> => {
    const currentSearchParams: Record<string, string> = {};

    searchParams.entries().forEach(([key, value]) => {
      currentSearchParams[key] = value;
    });

    return currentSearchParams;
  };

  const manual: Result["manual"] = (route, options) => {
    let paramCounter = 0;
    const approach = options?.approach ?? "append";

    return `${route
      .split("/")
      .map((seg) => {
        if (
          seg.startsWith(SIGNS.PARAMS_START) &&
          seg.endsWith(SIGNS.PARAMS_END)
        ) {
          return options?.params?.[paramCounter++];
        }

        return seg;
      })
      .join(SIGNS.SEGMENT_SEPARATOR)}${
      options?.searchParams
        ? `${SIGNS.SEARCH_PARAM_STARTER}${Object.entries(
            approach === "append"
              ? { ...getCurrentSearchParams(), ...options.searchParams }
              : options.searchParams,
          )
            .filter(([_, value]) => value.length)
            .map(
              ([key, value]) =>
                `${key}${SIGNS.SEARCH_PARAM_KEY_VALUE_SEPARATOR}${value}`,
            )
            .join(SIGNS.SEARCH_PARAM_SEPARATOR)}`
        : ""
    }`;
  };

  const auto = (route: string) =>
    route
      .split(SIGNS.SEGMENT_SEPARATOR)
      .map((seg) => {
        if (
          seg.startsWith(SIGNS.PARAMS_START) &&
          seg.endsWith(SIGNS.PARAMS_END)
        ) {
          const param = seg.slice(1, seg.length - 1);

          return appParams[param as keyof typeof appParams];
        }

        return seg;
      })
      .join(SIGNS.SEGMENT_SEPARATOR);

  return { manual, auto };
};

export default useReplaceParams;
