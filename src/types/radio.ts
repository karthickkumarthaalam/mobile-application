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
  id: number;
  category: string;
  start_time: string;
  end_time: string;
  country: string;
  status: string;
  image_url: string;
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
}
