import { useInfiniteQuery } from "@tanstack/react-query";
import type { Photo } from "../interface/interface";
import { serch } from "../../Service/ReactQuery/Query/serch";
const limit = 20;
const useSearch = (query: string) => {
  return useInfiniteQuery<Photo[]>({
    queryKey: ["searchPhotos", query],
    queryFn: ({ pageParam = 1 }) => serch(query, pageParam as  number, limit),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < limit ? undefined : allPages.length + 1,
    enabled: !!query.trim(),
    staleTime: Infinity,
    gcTime: Infinity,
    initialPageParam: 1,
  });
};
export default useSearch;