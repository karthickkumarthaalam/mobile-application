import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSession, Member } from "../providers/AuthProvider";

export const STORAGE_KEYS = {
  // Onboarding
  ONBOARDING_COMPLETED: "ONBOARDING_COMPLETED",

  // Authentication
  AUTH_SESSION: "AUTH_SESSION",

  // OTP
  OTP_CONTEXT: "OTP_CONTEXT",
};

export type OTPFlow = "REGISTER" | "RESET_PASSWORD";

export interface OTPContext {
  email: string;
  flow: OTPFlow;
}

/**
 * Onboarding
 */
export const setOnboardingCompleted = async () => {
  await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
};

export const isOnboardingCompleted = async () => {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);

  return value === "true";
};

/**
 * Authentication
 */
export const saveAuthSession = async (token: string, member: Member) => {
  const session: AuthSession = {
    token,
    member,
  };

  await AsyncStorage.setItem(
    STORAGE_KEYS.AUTH_SESSION,
    JSON.stringify(session),
  );
};

export const getAuthSession = async (): Promise<AuthSession> => {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_SESSION);

  if (!value) {
    return {
      token: null,
      member: null,
    };
  }

  try {
    return JSON.parse(value);
  } catch {
    return {
      token: null,
      member: null,
    };
  }
};

export const clearAuthSession = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
};

export const isLoggedIn = async () => {
  const session = await getAuthSession();

  return !!session.token;
};

/**
 * OTP Context
 */
export const saveOTPContext = async (context: OTPContext) => {
  await AsyncStorage.setItem(STORAGE_KEYS.OTP_CONTEXT, JSON.stringify(context));
};

export const getOTPContext = async (): Promise<OTPContext | null> => {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.OTP_CONTEXT);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const clearOTPContext = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.OTP_CONTEXT);
};
