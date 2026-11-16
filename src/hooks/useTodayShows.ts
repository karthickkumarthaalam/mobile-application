import { useQuery } from "@tanstack/react-query";
import { getTodayShows } from "../api/radio.api";
import { ScheduledProgram } from "../types/radio";

export const useTodayShows = () => {
  return useQuery<ScheduledProgram[]>({
    queryKey: ["radio-today-shows"],
    queryFn: ({ signal }) => getTodayShows(signal),
    refetchInterval: 60 * 1000,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};
