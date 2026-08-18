import { memo } from "react";
import { useWindowDimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { MessageCircle, UsersRound } from "lucide-react-native";

import { getServiceIcon } from "@/components/service-icon";
import { Toast } from "@/components/toast";
import type { Provider } from "@/src/data/providers";
import { colors, elevation, fonts, radius, spacing } from "@/src/design/tokens";
import { useWhatsAppContact } from "@/src/hooks/use-whatsapp-contact";

export const ProviderCard = memo(function ProviderCard({ provider }: { provider: Provider }) {
  const { contact, feedback } = useWhatsAppContact();
  const CategoryIcon = getServiceIcon(provider.category);
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - spacing.md * 2, 640);
  const recommendationLabel = `${provider.recommendations} ${provider.recommendations === 1 ? "recomendação" : "recomendações"}`;

  return (
    <View style={styles.cardGroup}>
      <View style={[styles.card, { width: cardWidth }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ver perfil de ${provider.name}, ${provider.category}`}
          accessibilityHint="Abre os detalhes do prestador"
          onPress={() => router.push({ pathname: "/provider/[id]", params: { id: provider.id } })}
          style={({ pressed }) => [styles.content, pressed && styles.contentPressed]}
        >
          <View style={styles.identityRow}>
            <View style={styles.iconTile} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              <CategoryIcon size={27} strokeWidth={2} color={colors.primaryDeep} />
            </View>
            <View style={styles.identityText}>
              <Text style={styles.name}>{provider.name}</Text>
              <Text style={styles.category}>{provider.category}</Text>
            </View>
          </View>

          <View style={styles.trustBlock}>
            <View style={styles.trustRow}>
              <UsersRound size={18} strokeWidth={2.2} color={colors.primaryDeep} />
              <Text style={styles.recommendations}>{recommendationLabel}</Text>
            </View>
            <Text style={styles.byline}>
              Indicado por <Text style={styles.neighbor}>{provider.recommendedBy}</Text>
            </Text>
          </View>
        </Pressable>

        <View style={styles.actionArea}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Chame no WhatsApp com ${provider.name}, ${provider.category}`}
            onPress={() => void contact(provider)}
            style={({ pressed }) => [styles.whatsappAction, pressed && styles.actionPressed]}
          >
            <MessageCircle size={20} strokeWidth={2.25} color={colors.surface} />
            <Text style={styles.whatsappText}>Chame no WhatsApp</Text>
          </Pressable>
        </View>
      </View>
      <Toast feedback={feedback} />
    </View>
  );
});

const styles = StyleSheet.create({
  cardGroup: { alignItems: "center", marginBottom: spacing.md },
  card: { backgroundColor: colors.surface, borderRadius: radius.card, overflow: "hidden", ...elevation.level2 },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  contentPressed: { opacity: 0.78 },
  identityRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  iconTile: { width: 56, height: 56, borderRadius: radius.control, alignItems: "center", justifyContent: "center", backgroundColor: colors.surfaceSoft },
  identityText: { flex: 1, gap: spacing.xxs },
  name: { color: colors.text, fontFamily: fonts.bold, fontSize: 20, lineHeight: 26 },
  category: { color: colors.primaryDeep, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  trustBlock: { marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, gap: spacing.xs },
  trustRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  recommendations: { color: colors.text, fontFamily: fonts.semibold, fontSize: 15, lineHeight: 22 },
  byline: { color: colors.muted, fontFamily: fonts.medium, fontSize: 15, lineHeight: 22 },
  neighbor: { color: colors.text, fontFamily: fonts.semibold },
  actionArea: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  whatsappAction: { minHeight: 52, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: spacing.sm, backgroundColor: colors.whatsapp, borderRadius: radius.control, paddingHorizontal: spacing.md },
  whatsappText: { color: colors.surface, fontFamily: fonts.bold, fontSize: 16, lineHeight: 22 },
  actionPressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
});
