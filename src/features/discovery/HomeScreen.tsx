import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Bell, ChevronDown, Compass, Home, LocateFixed, Search, SlidersHorizontal } from "lucide-react-native";

import { ProviderCard } from "@/components/provider-card";
import { ScreenContainer } from "@/components/screen-container";
import { categories, providers } from "@/src/data/providers";
import { colors, elevation, fonts, radius, spacing } from "@/src/design/tokens";
import { haptic } from "@/src/lib/haptics";

export function HomeScreen() {
  return (
    <ScreenContainer edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlatList
        data={providers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProviderCard provider={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<HomeHeader />}
      />
    </ScreenContainer>
  );
}

function HomeHeader() {
  return (
    <View style={styles.headerContent}>
      <View style={styles.topbar}>
        <View style={styles.brand}>
          <View style={styles.brandMark}><Home size={18} strokeWidth={2.4} color={colors.surface} /></View>
          <Text style={styles.brandText}>vizinho<Text style={styles.brandAccent}>indica</Text></Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Notificações" hitSlop={8} style={({ pressed }) => [styles.iconButton, pressed && styles.iconPressed]}>
          <Bell size={21} strokeWidth={2} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.location}>
        <LocateFixed size={17} strokeWidth={2.2} color={colors.primary} />
        <Text style={styles.locationText}>Vila Mariana, São Paulo</Text>
        <ChevronDown size={16} strokeWidth={2.2} color={colors.muted} />
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>DESCUBRA COM CALMA</Text>
        <Text style={styles.heroTitle}>Encontre seu próximo achado local.</Text>
        <Text style={styles.heroSubtitle}>O que funciona por perto, recomendado por quem vive no seu bairro.</Text>
        <View style={styles.heroSymbol}><Compass size={34} strokeWidth={2.1} color={colors.surface} /></View>
      </View>

      <Pressable accessibilityRole="search" accessibilityLabel="Buscar serviço, nome ou categoria" onPress={() => router.push("/(tabs)/explore")} style={({ pressed }) => [styles.search, pressed && styles.actionPressed]}>
        <Search size={21} strokeWidth={2.1} color={colors.muted} />
        <Text style={styles.searchText}>Buscar serviço, nome ou categoria</Text>
        <View style={styles.filterDot}><SlidersHorizontal size={18} strokeWidth={2.1} color={colors.primary} /></View>
      </Pressable>

      <View style={styles.chipRow}>
        {categories.slice(0, 5).map((category) => (
          <Pressable key={category} accessibilityRole="button" accessibilityLabel={`Explorar ${category}`} onPress={() => { haptic.select(); router.push("/(tabs)/explore"); }} style={({ pressed }) => [styles.quickChip, category === "Todas" && styles.quickChipActive, pressed && styles.actionPressed]}>
            <Text style={[styles.quickChipText, category === "Todas" && styles.quickChipTextActive]}>{category}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleBlock}>
          <Text style={styles.sectionEyebrow}>POR PERTO</Text>
          <Text style={styles.sectionTitle}>Indicações da sua vizinhança</Text>
        </View>
        <Text style={styles.count}>{providers.length} achados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.bgApp },
  list: { paddingBottom: spacing.large },
  headerContent: { width: "100%", maxWidth: 672, alignSelf: "center", paddingHorizontal: spacing.md },
  topbar: { minHeight: 64, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  brandMark: { width: 34, height: 34, borderRadius: radius.control, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary },
  brandText: { color: colors.text, fontFamily: fonts.extraBold, fontSize: 18, lineHeight: 24 },
  brandAccent: { color: colors.primary },
  iconButton: { width: 48, height: 48, borderRadius: radius.control, alignItems: "center", justifyContent: "center" },
  location: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.xs },
  locationText: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  hero: { overflow: "hidden", position: "relative", marginTop: spacing.md, padding: spacing.lg, minHeight: 220, borderRadius: radius.card, backgroundColor: colors.surface, ...elevation.level1 },
  eyebrow: { color: colors.primaryDeep, fontFamily: fonts.extraBold, fontSize: 12, lineHeight: 16, letterSpacing: 1.1 },
  heroTitle: { color: colors.text, fontFamily: fonts.extraBold, fontSize: 32, lineHeight: 40, letterSpacing: -1, marginTop: spacing.sm, maxWidth: "82%" },
  heroSubtitle: { color: colors.muted, fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, marginTop: spacing.sm, maxWidth: "76%" },
  heroSymbol: { position: "absolute", right: -16, bottom: -16, width: 104, height: 104, borderRadius: radius.card, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, transform: [{ rotate: "-8deg" }] },
  search: { minHeight: 56, flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md, paddingHorizontal: spacing.md, borderRadius: radius.control, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, ...elevation.level1 },
  searchText: { flex: 1, color: colors.muted, fontFamily: fonts.medium, fontSize: 16, lineHeight: 22 },
  filterDot: { width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: radius.control, backgroundColor: colors.surfaceSoft },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.xs, marginTop: spacing.md },
  quickChip: { minHeight: 44, justifyContent: "center", paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  quickChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  quickChipText: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  quickChipTextActive: { color: colors.surface },
  sectionHeader: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: spacing.md, marginTop: spacing.xxl, marginBottom: spacing.md },
  sectionTitleBlock: { flex: 1 },
  sectionEyebrow: { color: colors.primaryDeep, fontFamily: fonts.extraBold, fontSize: 12, lineHeight: 16, letterSpacing: 1.1 },
  sectionTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 24, lineHeight: 31, marginTop: spacing.xs },
  count: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  actionPressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  iconPressed: { opacity: 0.66 },
});
