import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { BadgeCheck, ChevronRight, Heart, MessageCircle, Star } from "lucide-react-native";

import { getServiceIcon } from "@/components/service-icon";
import { Toast } from "@/components/toast";
import type { Provider } from "@/src/data/providers";
import { colors, elevation, fonts, radius, spacing } from "@/src/design/tokens";
import { useWhatsAppContact } from "@/src/hooks/use-whatsapp-contact";

export function ProviderCard({ provider }: { provider: Provider }) {
  const { contact, feedback } = useWhatsAppContact();
  const CategoryIcon = getServiceIcon(provider.category);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver perfil de ${provider.name}`}
        onPress={() => router.push({ pathname: "/provider/[id]", params: { id: provider.id } })}
        style={({ pressed }) => [styles.content, pressed && styles.contentPressed]}
      >
        <View style={styles.headerRow}>
          <View style={styles.iconTile}>
            <CategoryIcon size={24} strokeWidth={2} color={colors.primaryDeep} />
          </View>
          <View style={styles.titleBlock}>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryText}>{provider.category}</Text>
              <View style={styles.verifiedBadge}>
                <BadgeCheck size={14} strokeWidth={2.4} color={colors.success} />
                <Text style={styles.verifiedText}>Recomendado</Text>
              </View>
            </View>
            <Text style={styles.name}>{provider.name}</Text>
            <Text style={styles.service}>{provider.service}</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={`Salvar ${provider.name}`} hitSlop={8} style={({ pressed }) => [styles.favoriteButton, pressed && styles.iconPressed]}>
            <Heart size={20} strokeWidth={2} color={colors.muted} />
          </Pressable>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.ratingGroup}>
            <Star size={16} fill="#E5A131" color="#E5A131" strokeWidth={1.8} />
            <Text style={styles.rating}>{provider.rating}</Text>
            <Text style={styles.reviews}>({provider.reviews})</Text>
          </View>
          <View style={styles.dot} />
          <Text style={styles.distance}>{provider.distance}</Text>
        </View>

        <Text numberOfLines={3} style={styles.quote}>“{provider.quote}”</Text>
        <View style={styles.byline}>
          <View style={styles.miniAvatar}><Text style={styles.miniAvatarText}>{provider.recommendedBy.charAt(0)}</Text></View>
          <Text style={styles.bylineText}>Indicado por <Text style={styles.bylineStrong}>{provider.recommendedBy}</Text></Text>
          <Text style={styles.when}>{provider.when}</Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable accessibilityRole="button" accessibilityLabel={`Ver perfil de ${provider.name}`} onPress={() => router.push({ pathname: "/provider/[id]", params: { id: provider.id } })} style={({ pressed }) => [styles.profileAction, pressed && styles.iconPressed]}>
          <Text style={styles.profileText}>Ver perfil</Text>
          <ChevronRight size={18} strokeWidth={2.2} color={colors.primary} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`Chame no WhatsApp com ${provider.name}`} onPress={() => void contact(provider)} style={({ pressed }) => [styles.whatsappAction, pressed && styles.actionPressed]}>
          <MessageCircle size={18} strokeWidth={2.2} color={colors.surface} />
          <Text style={styles.whatsappText}>Chame no WhatsApp</Text>
        </Pressable>
      </View>
      <Toast feedback={feedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: spacing.lg, marginBottom: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.card, ...elevation.level1, overflow: "hidden" },
  content: { padding: spacing.lg },
  contentPressed: { opacity: 0.82 },
  headerRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm },
  iconTile: { width: 48, height: 48, borderRadius: radius.control, alignItems: "center", justifyContent: "center", backgroundColor: colors.surfaceSoft },
  titleBlock: { flex: 1, gap: spacing.xxs },
  categoryRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: spacing.xs },
  categoryText: { color: colors.primaryDeep, fontFamily: fonts.extraBold, fontSize: 11, letterSpacing: 0.7, textTransform: "uppercase" },
  verifiedBadge: { minHeight: 24, flexDirection: "row", alignItems: "center", gap: spacing.xxs, paddingHorizontal: spacing.xs, borderRadius: radius.pill, backgroundColor: "#EAF8F1" },
  verifiedText: { color: colors.success, fontFamily: fonts.bold, fontSize: 10 },
  name: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, lineHeight: 24 },
  service: { color: colors.muted, fontFamily: fonts.medium, fontSize: 13, lineHeight: 16 },
  favoriteButton: { width: 48, height: 48, borderRadius: radius.control, alignItems: "center", justifyContent: "center" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.sm },
  ratingGroup: { flexDirection: "row", alignItems: "center", gap: spacing.xxs },
  rating: { color: colors.text, fontFamily: fonts.bold, fontSize: 13 },
  reviews: { color: colors.muted, fontFamily: fonts.medium, fontSize: 12 },
  dot: { width: 8, height: 8, borderRadius: radius.pill, backgroundColor: colors.border },
  distance: { color: colors.muted, fontFamily: fonts.medium, fontSize: 12 },
  quote: { color: colors.text, fontFamily: fonts.medium, fontSize: 14, lineHeight: 24, marginTop: spacing.sm },
  byline: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.sm },
  miniAvatar: { width: 24, height: 24, borderRadius: radius.pill, backgroundColor: "#F0EAFE", alignItems: "center", justifyContent: "center" },
  miniAvatarText: { color: colors.primaryDeep, fontFamily: fonts.bold, fontSize: 10 },
  bylineText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 11, flex: 1 },
  bylineStrong: { color: colors.text, fontFamily: fonts.semibold },
  when: { color: colors.muted, fontFamily: fonts.medium, fontSize: 11 },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  profileAction: { minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.xxs, paddingHorizontal: spacing.xs },
  profileText: { color: colors.primary, fontFamily: fonts.bold, fontSize: 13 },
  whatsappAction: { flex: 1, minHeight: 48, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: spacing.xs, backgroundColor: colors.whatsapp, borderRadius: radius.control },
  whatsappText: { color: colors.surface, fontFamily: fonts.bold, fontSize: 13 },
  actionPressed: { opacity: 0.86, transform: [{ scale: 0.98 }] },
  iconPressed: { opacity: 0.68 },
});
