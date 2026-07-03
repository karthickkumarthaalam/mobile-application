import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResendOTPRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
  UpdateProfileRequest,
} from "../types/auth";
import api from "./api";

export const register = async (payload: RegisterRequest): Promise<any> => {
  const { data } = await api.post("/members/signup", payload);
  return data;
};

export const login = async (payload: LoginRequest): Promise<any> => {
  const { data } = await api.post("/members/login", payload);
  return data;
};

export const resentOTP = async (payload: ResendOTPRequest): Promise<any> => {
  const { data } = await api.post("/members/reset-otp", payload);
  return data;
};

export const verifyOTP = async (payload: VerifyOTPRequest): Promise<any> => {
  const { data } = await api.post("/members/verify-otp", payload);
  return data;
};

export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<any> => {
  const { data } = await api.post("/members/forgot-password", payload);
  return data;
};

export const resetPassword = async (
  payload: ResetPasswordRequest,
): Promise<any> => {
  const { data } = await api.post("/members/reset-password", payload);
  return data;
};

export const updateProfile = async (
  memberId: string,
  payload: UpdateProfileRequest,
): Promise<any> => {
  const { data } = await api.put(`/members/${memberId}`, payload);
  return data;
};
