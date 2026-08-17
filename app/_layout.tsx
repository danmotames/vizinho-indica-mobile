import "../global.css";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { ThemeProvider } from "@/lib/theme-provider";
void SplashScreen.preventAutoHideAsync();
export default function RootLayout() { const [fontsLoaded, fontError] = useFonts({ Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold }); useEffect(() => { if (fontsLoaded || fontError) void SplashScreen.hideAsync(); }, [fontsLoaded, fontError]); if (!fontsLoaded && !fontError) return null; return <GestureHandlerRootView style={{ flex: 1 }}><SafeAreaProvider><ThemeProvider><Stack screenOptions={{ headerShown: false, animation: "fade" }}><Stack.Screen name="(tabs)" /><Stack.Screen name="provider/[id]" options={{ animation: "slide_from_right" }} /></Stack></ThemeProvider></SafeAreaProvider></GestureHandlerRootView>; }
