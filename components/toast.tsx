import { StyleSheet, Text, View } from "react-native";
import { CircleAlert, CircleCheck } from "lucide-react-native";

import { colors, elevation, fonts, radius, spacing } from "@/src/design/tokens";

export function Toast({ feedback }: { feedback: { tone: "success" | "error"; message: string } | null }) {
  if (!feedback) return null;
  const isSuccess = feedback.tone === "success";

  return (
    <View accessibilityRole="alert" style={[styles.toast, isSuccess ? styles.success : styles.error]}>
      {isSuccess ? <CircleCheck size={18} strokeWidth={2.2} color={colors.surface} /> : <CircleAlert size={18} strokeWidth={2.2} color={colors.surface} />}
      <Text style={styles.text}>{feedback.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: { flexDirection: "row", alignItems: "center", gap: spacing.xs, borderRadius: radius.control, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, margin: spacing.lg, marginTop: 0, ...elevation.level2 },
  success: { backgroundColor: colors.success },
  error: { backgroundColor: colors.error },
  text: { color: colors.surface, fontFamily: fonts.semibold, fontSize: 13, lineHeight: 16, flex: 1 },
});
