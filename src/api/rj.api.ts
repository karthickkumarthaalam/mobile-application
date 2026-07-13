import api from "./api";
import { RJsResponse } from "../types/rj";

export const getRJs = async (): Promise<RJsResponse> => {
  const { data } = await api.get<RJsResponse>("/system-user/all-profile");

  return data;
};
