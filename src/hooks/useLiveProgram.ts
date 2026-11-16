import { useQuery } from "@tanstack/react-query";
import { getLiveProgram, isNoLiveProgramError } from "../api/radio.api";
import { LiveProgramResponse } from "../types/radio";

export const useLiveProgram = () => {
  return useQuery<LiveProgramResponse | null>({
    queryKey: ["live-program"],
    queryFn: async ({ signal }) => {
      try {
        return await getLiveProgram(signal);
      } catch (error) {
        if (isNoLiveProgramError(error)) return null;
        throw error;
      }
    },
    refetchInterval: 60 * 1000,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};