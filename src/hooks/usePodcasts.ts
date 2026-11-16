import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPodcastBrowseFeed, getPodcasts } from "../api/podcast.api";
import {
  PodcastBrowseResponse,
  PodcastListResponse,
  PodcastQueryParams,
} from "../types/podcast";

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
  enabled = true,
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
    enabled,
  });
};

export const useInfinitePodcastBrowseFeed = (enabled = true) => {
  return useInfiniteQuery<PodcastBrowseResponse>({
    queryKey: ["podcasts", "browse"],
    queryFn: ({ pageParam }) =>
      getPodcastBrowseFeed({
        categoryPage: pageParam as number,
        categoryLimit: 8,
        podcastLimit: 5,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages, hasNextPage } =
        lastPage.pagination.categories;
      if (typeof hasNextPage === "boolean") {
        return hasNextPage ? currentPage + 1 : undefined;
      }
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    enabled,
  });
};
