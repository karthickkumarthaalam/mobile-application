import api from "./api";

export const getLiveProgram = async () => {
  const { data } = await api.get("/radio-program/live-program");
  return data;
};
