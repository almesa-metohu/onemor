import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AppHeader } from "@/components";
import config from "@/tamagui.config";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={config}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <StatusBar
              style={colorScheme === "dark" ? "light" : "dark"}
              backgroundColor={colorScheme === "dark" ? "#1E1E1E" : "#FFFFFF"}
            />
            <AppHeader />
            <Stack
              screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                contentStyle: {
                  backgroundColor:
                    colorScheme === "dark" ? "#1E1E1E" : "#FFFFFF",
                },
              }}
            >
              <Stack.Screen
                name="(homepage)"
                options={{ headerShown: false }}
              />
            </Stack>
          </NavigationThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
