import { useQuery, useQueryClient, type QueryKey, type UseQueryOptions } from "@tanstack/react-query";
import getPhotoId from "../../Service/ReactQuery/Query/getPhotoId";
import type { Photo } from "../interface/interface";

const useGetPhotoId = (
  id: string,
  options?: Omit<
    UseQueryOptions<Photo | undefined, Error, Photo | undefined, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<Photo>(["chashPhoto", id]); 

  return useQuery<Photo | undefined, Error>({
    queryKey: ["chashPhoto", id],
    queryFn: () => getPhotoId(id),
    enabled: !!id && !cachedData, 
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
};

export default useGetPhotoId;
