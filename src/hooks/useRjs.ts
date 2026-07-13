import { useQuery } from "@tanstack/react-query";
import { getRJs } from "../api/rj.api";
import { RJsResponse } from "../types/rj";

export const useRJs = () => {
  return useQuery<RJsResponse>({
    queryKey: ["rjs"],
    queryFn: getRJs,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};
