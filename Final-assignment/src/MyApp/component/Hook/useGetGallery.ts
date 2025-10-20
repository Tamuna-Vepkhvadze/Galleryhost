import { useInfiniteQuery } from "@tanstack/react-query";
import { getgallery } from "../../Service/ReactQuery/Query/getGallery";
import type { Photo } from "../interface/interface";

const limit = 20;

const useGetGallery = () => {
  return useInfiniteQuery<Photo[]>({
    queryKey: ["cheshGallery", limit],
    queryFn: ({ pageParam = 1 }) => getgallery(limit, pageParam as number),
    getNextPageParam: (lastPage, allPages) =>
    lastPage.length < limit ? undefined : allPages.length + 1,
    initialPageParam: 1,
    staleTime: Infinity, 
    gcTime: Infinity, 
    refetchOnWindowFocus: false,
    
    
  });
  
};

export default useGetGallery;