import { Pressable, StyleSheet, Text } from "react-native";
import type { Category } from "@/src/data/providers";
import { colors, fonts, radius, spacing } from "@/src/design/tokens";
import { haptic } from "@/src/lib/haptics";
export function CategoryChip({ label, selected, onPress }: { label: Category; selected: boolean; onPress: () => void }) { return <Pressable accessibilityRole="button" accessibilityState={{ selected }} accessibilityLabel={`Categoria ${label}`} onPress={() => { haptic.select(); onPress(); }} style={({ pressed }) => [styles.base, selected && styles.selected, pressed && styles.pressed]}><Text style={[styles.text, selected && styles.selectedText]}>{label}</Text></Pressable>; }
const styles = StyleSheet.create({ base: { minHeight: 44, paddingHorizontal: spacing.md, justifyContent: "center", borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, selected: { backgroundColor: colors.primary, borderColor: colors.primary }, text: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 }, selectedText: { color: colors.surface }, pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] } });
