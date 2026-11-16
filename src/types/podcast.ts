export interface PodcastCategory {
  id: number;
  name: string;
  slug?: string;
  image_url?: string | null;
  description?: string | null;
}

export interface Podcast {
  id: number;
  slug: string;

  title: string;
  description?: string;

  image_url?: string | null;

  duration: string | number;

  date?: string;

  status?: string;

  category?: PodcastCategory;

  rjname?: string;

  content?: string;

  audio_drive_file_link?: string;

  video_link?: string;

  language?: string[];

  tags?: string[];
}

export interface PodcastReaction {
  like: number;
  view?: number;
  share?: number;
  comment?: number;
}

export interface PodcastComment {
  id?: number | string;
  comment_id?: number | string;
  Member?: {
    name?: string | null;
  } | null;
  guest_name?: string | null;
  comment?: string | null;
  text?: string | null;
  created_at?: string | null;
  createdAt?: string | null;
  date?: string | null;
}

export interface PodcastCommentsResponse {
  comments: PodcastComment[];
  total: number;
}

export interface PostPodcastCommentParams {
  podcastId: number;
  memberId: string;
  comment: string;
}

export interface PodcastPagination {
  currentPage: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage?: boolean;
}

export interface PodcastListResponse {
  data: Podcast[];
  pagination: PodcastPagination;
}

export interface PodcastCategoryBrowse extends PodcastCategory {
  podcasts: Podcast[];
  pagination: PodcastPagination;
}

export interface PodcastBrowseResponse {
  latestPodcasts: Podcast[];
  categories: PodcastCategoryBrowse[];
  pagination: {
    categories: PodcastPagination;
  };
}

export interface PodcastCategoryEpisodesResponse {
  category: PodcastCategory;
  podcasts: Podcast[];
  pagination: PodcastPagination;
}

export interface PodcastBrowseQueryParams {
  categoryPage?: number;
  categoryLimit?: number;
  podcastLimit?: number;
}

export interface PodcastCategoryEpisodesQueryParams {
  categoryId: number;
  page?: number;
  limit?: number;
}

export interface PodcastDetailsResponse {
  podcast: Podcast;

  prevPodcast?: Podcast | null;

  nextPodcast?: Podcast | null;

  reaction?: PodcastReaction;
}

export interface PodcastQueryParams {
  page?: number;

  limit?: number;

  search?: string;

  status?: string;

  not_category_id?: number;
}
