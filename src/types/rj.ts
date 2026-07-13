export interface RJShow {
  category: string;
  startTime: string;
  endTime: string;
}

export interface RJ {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
  shows: RJShow[];
}

export interface RJsResponse {
  success: boolean;
  data: RJ[];
}
