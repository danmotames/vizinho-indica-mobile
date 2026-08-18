import { Platform, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CirclePlus, Compass, Home, UserRound } from "lucide-react-native";

import { colors, fonts, radius, spacing } from "@/src/design/tokens";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottom = Platform.OS === "web" ? spacing.sm : Math.max(insets.bottom, spacing.xs);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: styles.label,
        tabBarStyle: [styles.bar, { height: 64 + bottom, paddingBottom: bottom }],
        tabBarItemStyle: styles.item,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Início", tabBarIcon: ({ color }) => <Home size={21} strokeWidth={2.2} color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: "Explorar", tabBarIcon: ({ color }) => <Compass size={21} strokeWidth={2.2} color={color} /> }} />
      <Tabs.Screen name="recommend" options={{ title: "Recomendar", tabBarIcon: ({ color }) => <CirclePlus size={22} strokeWidth={2.2} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil", tabBarIcon: ({ color }) => <UserRound size={21} strokeWidth={2.2} color={color} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, paddingTop: spacing.xs, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet },
  label: { fontFamily: fonts.semibold, fontSize: 10 },
  item: { minHeight: 48, paddingTop: spacing.xxs },
});
