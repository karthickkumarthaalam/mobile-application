import { AdvertiseRequest, EnquiryRequest } from "../types/contact";
import api from "./api";

export const enquiry = async (payload: EnquiryRequest): Promise<any> => {
  const { data } = await api.post("/enquiry", payload);
  return data;
};

export const advertise = async (payload: AdvertiseRequest): Promise<any> => {
  const { data } = await api.post("/advertisement", payload);
  return data;
};
