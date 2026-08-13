import { PodcastQueryParams } from "../types/podcast";
import api from "./api";

export const getPodcasts = async (
  params: PodcastQueryParams = {},
): Promise<any> => {
  const { data } = await api.get("/podcasts", {
    params: {
      status: "approved",
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      search: params.search ?? "",
      not_category_id: params.not_category_id ?? 1,
    },
  });

  return data.data;
};

export const getPodcast = async (id: string | number): Promise<any> => {
  const { data } = await api.get(`/podcasts/${id}`);
  return data;
};

export const getRelatedPodcasts = async (
  search: string,
  limit = 4,
): Promise<any> => {
  const { data } = await api.get("/podcasts", {
    params: {
      status: "approved",
      search,
      limit,
    },
  });

  return data.data;
};
