import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AudioProvider } from "./src/providers/AudioProvider";
import { NetworkProvider } from "./src/providers/NetworkProvider";
import { AuthProvider } from "./src/providers/AuthProvider";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthBottomSheet from "./src/components/Auth/AuthBottomSheet";


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
  const [fontsLoaded] = useFonts({
    InclusiveSans: require("./src/assets/fonts/InclusiveSans-Regular.ttf"),
    "InclusiveSans-Regular": require("./src/assets/fonts/InclusiveSans-Regular.ttf"),
    "InclusiveSans-Medium": require("./src/assets/fonts/InclusiveSans-Medium.ttf"),
    "InclusiveSans-SemiBold": require("./src/assets/fonts/InclusiveSans-SemiBold.ttf"),
    "InclusiveSans-Bold": require("./src/assets/fonts/InclusiveSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NetworkProvider>
            <AuthProvider>
              <AudioProvider>
                <AppNavigator />
                <AuthBottomSheet />
              </AudioProvider>
            </AuthProvider>
          </NetworkProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
