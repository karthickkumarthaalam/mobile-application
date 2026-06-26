export interface NowPlaying {
  id: number;
  url: string;

  title: string;
  subtitle?: string;
  artwork?: string;

  type: "radio" | "podcast";

  isLive?: boolean;
}
