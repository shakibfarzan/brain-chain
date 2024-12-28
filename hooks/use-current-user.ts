import { useEffect, useMemo } from "react";

import { useFetchData } from "@/hooks/index";
import { currentUserAction, getImageUrl } from "@/app/actions";
import { useUserStore } from "@/stores/providers/user-store-provider";
import { OmittedUser } from "@/stores/user-store";

const useCurrentUser = () => {
  const { user, setUser } = useUserStore((store) => store);

  const {
    data: userResponse,
    isLoading,
    reload,
  } = useFetchData(currentUserAction, { loadCondition: !user });
  const { data: imageUrl } = useFetchData(getImageUrl, {
    args: useMemo(() => [user?.image ?? ""], [user?.image]),
    loadCondition: !!user?.image,
  });

  useEffect(() => {
    if (userResponse?.data) {
      setUser({ ...(userResponse?.data as OmittedUser) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userResponse?.data]);

  return {
    data: { ...user, image: imageUrl },
    isLoading,
    reload,
  };
};

export default useCurrentUser;
