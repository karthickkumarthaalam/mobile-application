import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  // Onboarding
  ONBOARDING_COMPLETED: "ONBOARDING_COMPLETED",

  // Authentication
  ACCESS_TOKEN: "ACCESS_TOKEN",
  USERNAME: "USERNAME",
  MEMBER_ID: "MEMBER_ID",
};

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
export const saveAuthSession = async (
  token: string,
  username: string,
  memberId: string,
) => {
  await AsyncStorage.multiSet([
    [STORAGE_KEYS.ACCESS_TOKEN, token],
    [STORAGE_KEYS.USERNAME, username],
    [STORAGE_KEYS.MEMBER_ID, memberId],
  ]);
};

export const getAuthSession = async () => {
  const values = await AsyncStorage.multiGet([
    STORAGE_KEYS.ACCESS_TOKEN,
    STORAGE_KEYS.USERNAME,
    STORAGE_KEYS.MEMBER_ID,
  ]);

  return {
    token: values[0][1],
    username: values[1][1],
    memberId: values[2][1],
  };
};

export const clearAuthSession = async () => {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.ACCESS_TOKEN,
    STORAGE_KEYS.USERNAME,
    STORAGE_KEYS.MEMBER_ID,
  ]);
};

export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  return !!token;
};
