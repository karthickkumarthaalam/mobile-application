import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";

import { AudioProvider } from "./src/providers/AudioProvider";
import { NetworkProvider } from "./src/providers/NetworkProvider";
import { AuthProvider } from "./src/providers/AuthProvider";
import { NotificationProvider } from "./src/providers/NotificationProvider";
import { ThemeProvider } from "./src/providers/ThemeProvider";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthBottomSheet from "./src/components/Auth/AuthBottomSheet";
import NotificationContainer from "./src/components/Notification/NotificationContainer";

SplashScreen.preventAutoHideAsync();


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    InclusiveSans: require("./src/assets/fonts/InclusiveSans-Regular.ttf"),
    "InclusiveSans-Regular": require("./src/assets/fonts/InclusiveSans-Regular.ttf"),
    "InclusiveSans-Medium": require("./src/assets/fonts/InclusiveSans-Medium.ttf"),
    "InclusiveSans-SemiBold": require("./src/assets/fonts/InclusiveSans-SemiBold.ttf"),
    "InclusiveSans-Bold": require("./src/assets/fonts/InclusiveSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000000" }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000000" }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <NetworkProvider>
              <NotificationProvider>
                <AuthProvider>
                  <AudioProvider>
                    <AppNavigator />
                    <AuthBottomSheet />
                    <NotificationContainer />
                  </AudioProvider>
                </AuthProvider>
              </NotificationProvider>
            </NetworkProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
