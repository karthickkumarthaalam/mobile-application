// src/types/auth.ts

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  email: string;
  phone: string;
  password: string;
  address1: string;
  address2: string;
}

export interface VerifyOTPRequest {
  email?: string;
  phone?: string;
  otp: string;
}

export interface ResendOTPRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email?: string;
  phone?: string;
}

export interface ResetPasswordRequest {
  email?: string;
  phone?: string;
  newPassword: string;
  confirmPassword: string;
}
