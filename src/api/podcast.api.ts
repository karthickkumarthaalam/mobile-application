import {
  PodcastBrowseQueryParams,
  PodcastBrowseResponse,
  PodcastCategoryEpisodesQueryParams,
  PodcastCategoryEpisodesResponse,
  PodcastCommentsResponse,
  PostPodcastCommentParams,
  PodcastQueryParams,
} from "../types/podcast";
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

export function getPodcastBrowseFeed(
  params?: PodcastBrowseQueryParams,
): Promise<PodcastBrowseResponse>;
export function getPodcastBrowseFeed(
  params: PodcastCategoryEpisodesQueryParams,
): Promise<PodcastCategoryEpisodesResponse>;
export async function getPodcastBrowseFeed(
  params:
    | PodcastBrowseQueryParams
    | PodcastCategoryEpisodesQueryParams = {},
): Promise<PodcastBrowseResponse | PodcastCategoryEpisodesResponse> {
  const queryParams = "categoryId" in params
    ? {
        category_id: params.categoryId,
        page: params.page,
        limit: params.limit,
      }
    : params;
  const { data } = await api.get("/podcasts/browse", {
    params: queryParams,
  });

  return data.data;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function optionalString(value: unknown): string | null | undefined {
  if (typeof value === "string" || value === null) return value;
  return undefined;
}

function optionalId(value: unknown): number | string | undefined {
  if (typeof value === "string" || typeof value === "number") return value;
  return undefined;
}

export const getPodcastComments = async (
  id: number | string,
  signal?: AbortSignal,
): Promise<PodcastCommentsResponse> => {
  const { data: response } = await api.get(
    `/podcasts/${encodeURIComponent(String(id))}/comments`,
    {
      params: {
        page: 1,
        limit: 100,
        status: "approved",
      },
      signal,
    },
  );

  const payload = isRecord(response)
    ? response.result ?? response.data ?? response
    : response;
  const payloadRecord = isRecord(payload) ? payload : null;
  const nestedData = payloadRecord?.data;
  const nestedDataRecord = isRecord(nestedData) ? nestedData : null;
  const comments =
    (nestedDataRecord?.data as unknown) ??
    nestedData ??
    payloadRecord?.comments ??
    payload;

  if (!Array.isArray(comments)) {
    throw new Error("The comments response was not in the expected format.");
  }
  const parsedComments = comments.map((comment) => {
    if (!isRecord(comment)) {
      throw new Error("The comments response was not in the expected format.");
    }

    const member = isRecord(comment.Member) ? comment.Member : null;
    return {
      id: optionalId(comment.id),
      comment_id: optionalId(comment.comment_id),
      Member: member
        ? { name: optionalString(member.name) }
        : null,
      guest_name: optionalString(comment.guest_name),
      comment: optionalString(comment.comment),
      text: optionalString(comment.text),
      created_at: optionalString(comment.created_at),
      createdAt: optionalString(comment.createdAt),
      date: optionalString(comment.date),
    };
  });

  const pagination = payloadRecord?.pagination;
  const nestedPagination = nestedDataRecord?.pagination;
  const paginationTotal = isRecord(pagination)
    ? Number(pagination.totalRecords)
    : 0;
  const nestedPaginationTotal = isRecord(nestedPagination)
    ? Number(nestedPagination.totalRecords)
    : 0;

  return {
    comments: parsedComments,
    total: paginationTotal || nestedPaginationTotal || parsedComments.length,
  };
};

export const postPodcastComment = async ({
  podcastId,
  memberId,
  comment,
}: PostPodcastCommentParams): Promise<void> => {
  const { data: response } = await api.post("/podcasts/comments", {
    podcast_id: podcastId,
    member_id: memberId,
    guest_id: null,
    guest_name: null,
    guest_email: null,
    comment,
  });

  if (!isRecord(response) || response.status !== "success") {
    const message = isRecord(response) && typeof response.message === "string"
      ? response.message
      : "Unable to post your comment.";
    throw new Error(message);
  }
};
