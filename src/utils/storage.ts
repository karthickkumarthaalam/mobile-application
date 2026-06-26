import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: "ONBOARDING_COMPLETED",
};

export const setOnboardingCompleted = async () => {
  await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
};

export const isOnboardingCompleted = async () => {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);

  return value === "true";
};
