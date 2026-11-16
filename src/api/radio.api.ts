import { isAxiosError } from "axios";
import api from "./api";
import {
  CurrentSpecialShow,
  ScheduledProgram,
} from "../types/radio";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const optionalString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

const optionalId = (value: unknown): number | string | undefined =>
  typeof value === "number" || typeof value === "string" ? value : undefined;

export const getLiveProgram = async (signal?: AbortSignal) => {
  const { data } = await api.get("/radio-program/live-program", { signal });
  return data;
};

export const isNoLiveProgramError = (error: unknown): boolean => {
  if (!isAxiosError(error) || error.response?.status !== 404) return false;
  const response = error.response.data;
  return isRecord(response) && response.message === "No program currently running";
};

export const getCurrentSpecialShow = async (
  signal?: AbortSignal,
): Promise<CurrentSpecialShow | null> => {
  const { data: response } = await api.get("/special-shows/current", { signal });
  const show = response?.data;
  if (show == null) return null;
  if (!isRecord(show) || typeof show.title !== "string") {
    throw new Error("The special show response was not in the expected format.");
  }

  const systemUsers = isRecord(show.system_users) ? show.system_users : null;
  return {
    id: optionalId(show.id),
    title: show.title,
    description: optionalString(show.description),
    image: optionalString(show.image),
    starts_at: optionalString(show.starts_at),
    ends_at: optionalString(show.ends_at),
    system_users: systemUsers
      ? { name: optionalString(systemUsers.name) }
      : null,
  };
};

export const getTodayShows = async (
  signal?: AbortSignal,
): Promise<ScheduledProgram[]> => {
  const { data: response } = await api.get("/radio-program/today-programs", {
    signal,
  });
  if (!Array.isArray(response?.programs)) {
    throw new Error("Today's programs are unavailable.");
  }

  return response.programs.map((program: unknown) => {
    if (!isRecord(program)) {
      throw new Error("Today's programs are unavailable.");
    }

    const category = isRecord(program.program_category)
      ? program.program_category
      : {};
    const id =
      optionalId(category.id) ??
      optionalId(program.program_category_id) ??
      optionalId(program.id);
    if (id === undefined) {
      throw new Error("Today's programs are unavailable.");
    }

    return {
      id,
      radioProgramId: optionalId(program.id) ?? id,
      category: optionalString(category.category) ?? "Radio program",
      start_time: optionalString(category.start_time) ?? "",
      end_time: optionalString(category.end_time) ?? "",
      image_url:
        optionalString(category.image_url) ||
        optionalString(category.mobile_image_url) ||
        "",
    };
  });
};
