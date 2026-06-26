import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppNavigator from "./src/navigation/AppNavigator";
import { AudioProvider } from "./src/audio/AudioProvider";
import { NetworkProvider } from "./src/providers/NetworkProvider";


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
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NetworkProvider>
        <AudioProvider>
          <AppNavigator />
        </AudioProvider>
      </NetworkProvider>
    </QueryClientProvider>
  );
}