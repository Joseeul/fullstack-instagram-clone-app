import { useFonts } from "expo-font";
import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Ig-Light": require("../assets/fonts/InstagramSans-Light.ttf"),
    "Ig-Regular": require("../assets/fonts/InstagramSans-Regular.ttf"),
    "Ig-Medium": require("../assets/fonts/InstagramSans-Medium.ttf"),
    "Ig-Bold": require("../assets/fonts/InstagramSans-Bold.ttf"),
    "Lobster": require("../assets/fonts/Lobster-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      // SplashScreen.hide();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
