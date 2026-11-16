import React from "react";

import LiveProgramCard from "./LiveProgramCard";
import { GRADIENTS } from "../../../constants/colors";
import { CurrentSpecialShow } from "../../../types/radio";

interface SpecialShowCardProps {
  show: CurrentSpecialShow;
  banner?: string;
  fallbackStartTime: string;
  fallbackEndTime: string;
  isPlaying: boolean;
  isLoading: boolean;
  canListen: boolean;
  selectedRadio: "live" | "classic";
  onListen: () => void;
  onSelectLive: () => void;
  onSelectClassic: () => void;
  onShare: () => void;
  onBack: () => void;
}

const getScheduleTime = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;
  if (/^\d{1,2}:\d{2}/.test(value)) {
    const [hours, minutes] = value.split(":");
    return `${hours.padStart(2, "0")}:${minutes}`;
  }

  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return fallback;

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(timestamp);
};

const SpecialShowCard = ({
  show,
  banner,
  fallbackStartTime,
  fallbackEndTime,
  isPlaying,
  isLoading,
  canListen,
  selectedRadio,
  onListen,
  onSelectLive,
  onSelectClassic,
  onShare,
  onBack,
}: SpecialShowCardProps) => {
  return (
    <LiveProgramCard
      banner={show.image || banner}
      programName={show.title}
      programLabel="SPECIAL SHOW"
      screenGradient={GRADIENTS.screen}
      isSpecialShow
      hostName={show.system_users?.name}
      programDescription={show.description}
      startTime={getScheduleTime(show.starts_at, fallbackStartTime)}
      endTime={getScheduleTime(show.ends_at, fallbackEndTime)}
      isPlaying={isPlaying}
      isLoading={isLoading}
      canListen={canListen}
      selectedRadio={selectedRadio}
      onListen={onListen}
      onSelectLive={onSelectLive}
      onSelectClassic={onSelectClassic}
      onShare={onShare}
      onBack={onBack}
    />
  );
};

export default SpecialShowCard;
