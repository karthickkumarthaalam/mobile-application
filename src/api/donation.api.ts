import { CreateDonationRequest } from "../types/donation";
import api from "./api";

export const createDonation = async (
  payload: CreateDonationRequest,
): Promise<any> => {
  const response = await api.post("/donations", payload);
  return response.data;
};
