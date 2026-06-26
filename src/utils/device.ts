import { useWindowDimensions } from "react-native";

export const useDevice = () => {
  const { width } = useWindowDimensions();

  return {
    isTablet: width >= 768,
    isLargeTablet: width >= 1024,
  };
};
