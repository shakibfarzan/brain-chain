import { SIGNS } from "@/config/constants";
import { useAppParams } from "@/hooks/index";

/**
 * Result object containing functions for manual and auto parameter replacement in routes.
 */
type Result = {
  /**
   * Function to manually replace placeholders in a route with provided parameters.
   * @param route - The route string with placeholders.
   * @param params - The parameters to replace the placeholders in the route.
   * @returns The modified route with placeholders replaced by the corresponding parameters.
   * @example
   * ```typescript
   * const updatedRoute = manual('/users/[contact]/posts/[id]', 'john', '123');
   * // Result: '/users/john/posts/123'
   * ```
   */
  manual: (route: string, ...params: string[]) => string;

  /**
   * Function to automatically replace placeholders in a route with stored application parameters.
   * @param route - The route string with placeholders.
   * @returns The modified route with placeholders replaced by the corresponding stored parameters.
   */
  auto: (route: string) => string;
};

const useReplaceParams = (): Result => {
  const appParams = useAppParams();
  /**
   * Replaces placeholders in a route with provided parameters.
   *
   * @param route - The route string with placeholders.
   * @param params - The parameters to replace the placeholders in the route.
   * @returns The modified route with placeholders replaced by the corresponding parameters.
   *
   * @example
   * ```typescript
   * const updatedRoute = manual('/users/[contact]/posts/[id]', 'john', '123');
   * // Result: '/users/john/posts/123'
   * ```
   */
  const manual = (route: string, ...params: string[]) => {
    let paramCounter = 0;

    return route
      .split("/")
      .map((seg) => {
        if (
          seg.startsWith(SIGNS.PARAMS_START) &&
          seg.endsWith(SIGNS.PARAMS_END)
        ) {
          return params[paramCounter++];
        }

        return seg;
      })
      .join(SIGNS.SEGMENT_SEPARATOR);
  };

  /**
   * Automatically replaces placeholders in a route with stored application parameters.
   * @param route - The route string with placeholders.
   * @returns The modified route with placeholders replaced by the corresponding stored parameters.
   */
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
