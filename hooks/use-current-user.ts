import { useFetchData } from "@/hooks/index";
import { currentUserAction, getImageUrl } from "@/app/actions";

const useCurrentUser = () => {
  const {
    data: userResponse,
    isLoading,
    reload,
  } = useFetchData(currentUserAction);
  const { data: imageUrl } = useFetchData(getImageUrl, {
    args: [userResponse?.data?.image ?? ""],
    loadCondition: !!userResponse?.data?.image,
  });

  return {
    data: { ...userResponse?.data, image: imageUrl },
    isLoading,
    reload,
  };
};

export default useCurrentUser;
