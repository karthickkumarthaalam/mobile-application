export interface LiveProgramResponse {
  current: CurrentProgram;
  next: NextProgram;
  flash_news: any[];
  minutesLeft: number;
}

export interface CurrentProgram {
  id: number;
  program_category_id: number;
  rj_id: number;
  country: string;
  radio_station_id: number;
  broadcast_days: string;
  status: string;

  show_host_name: boolean;
  show_program_name: boolean;
  show_timing: boolean;
  show_host_profile: boolean;

  program_category: ProgramCategory;
  system_users: SystemUser;
  radio_station: RadioStation;
}

export interface NextProgram {
  id: number;
  program_category: ProgramCategory;
}

export interface ProgramCategory {
  id: number | string;
  category: string;
  start_time: string;
  end_time: string;
  country: string;
  status: string;
  image_url: string;
  mobile_image_url: string;
  background_color?: string;
}

export interface ScheduledProgram {
  id: number | string;
  radioProgramId: number | string;
  category: string;
  start_time: string;
  end_time: string;
  image_url: string;
}

export interface CurrentSpecialShow {
  id?: number | string;
  title: string;
  description?: string;
  image?: string;
  starts_at?: string;
  ends_at?: string;
  system_users?: { name?: string } | null;
}

export interface SystemUser {
  id: number;
  name: string;
  image_url: string;
}

export interface RadioStation {
  id: number;
  station_name: string;
  radio_stream_url: string;
  logo: string;
  play_type: string;
  redirect_url: string;
  maintenance?: boolean | string;
}
