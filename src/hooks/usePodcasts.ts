import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPodcasts } from "../api/podcast.api";

import { PodcastQueryParams, PodcastListResponse } from "../types/podcast";

export const usePodcasts = (params: PodcastQueryParams = {}) => {
  return useQuery<PodcastListResponse>({
    queryKey: ["podcasts", params],
    queryFn: () => getPodcasts(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};

export const useInfinitePodcasts = (
  params: Omit<PodcastQueryParams, "page"> = {},
) => {
  return useInfiniteQuery<PodcastListResponse>({
    queryKey: ["podcasts", "infinite", params],
    queryFn: ({ pageParam }) =>
      getPodcasts({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};
