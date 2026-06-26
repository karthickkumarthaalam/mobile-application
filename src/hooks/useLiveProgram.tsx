import { useQuery } from "@tanstack/react-query";
import { getLiveProgram } from "../api/radio.api";
import { LiveProgramResponse } from "../types/radio";

export const useLiveProgram = () => {
    return useQuery<LiveProgramResponse>({
        queryKey: ["live-program"],
        queryFn: getLiveProgram,
        refetchInterval: 60 * 1000,
        staleTime: 30 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 2,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
};