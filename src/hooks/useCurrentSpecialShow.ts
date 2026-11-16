import { useQuery } from "@tanstack/react-query";
import { getCurrentSpecialShow } from "../api/radio.api";
import { CurrentSpecialShow } from "../types/radio";

export const useCurrentSpecialShow = () => {
  return useQuery<CurrentSpecialShow | null>({
    queryKey: ["radio-current-special-show"],
    queryFn: ({ signal }) => getCurrentSpecialShow(signal),
    refetchInterval: 60 * 1000,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};
