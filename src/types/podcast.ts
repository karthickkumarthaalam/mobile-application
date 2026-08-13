export interface PodcastCategory {
  id: number;
  name: string;
  slug?: string;
}

export interface Podcast {
  id: number;
  slug: string;

  title: string;
  description?: string;

  image_url?: string;

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

export interface PodcastPagination {
  currentPage: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface PodcastListResponse {
  data: Podcast[];
  pagination: PodcastPagination;
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
