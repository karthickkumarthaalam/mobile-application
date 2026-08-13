import { useQuery } from "@tanstack/react-query";

import { getPodcast } from "../api/podcast.api";
import { PodcastDetailsResponse } from "../types/podcast";

export const usePodcast = (id: string | number) => {
  return useQuery<PodcastDetailsResponse>({
    queryKey: ["podcast", id],
    queryFn: () => getPodcast(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};
