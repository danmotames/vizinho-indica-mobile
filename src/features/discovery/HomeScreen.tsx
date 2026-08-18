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
    <View>
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
        <LocateFixed size={16} strokeWidth={2.2} color={colors.primary} />
        <Text style={styles.locationText}>Vila Mariana, São Paulo</Text>
        <ChevronDown size={16} strokeWidth={2.2} color={colors.muted} />
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>DESCUBRA COM CALMA</Text>
        <Text style={styles.heroTitle}>Encontre seu próximo achado local.</Text>
        <Text style={styles.heroSubtitle}>O que funciona por perto, recomendado por quem vive no seu bairro.</Text>
        <View style={styles.heroSymbol}><Compass size={32} strokeWidth={2.1} color={colors.surface} /></View>
      </View>

      <Pressable accessibilityRole="search" accessibilityLabel="Buscar serviço, nome ou categoria" onPress={() => router.push("/(tabs)/explore")} style={({ pressed }) => [styles.search, pressed && styles.actionPressed]}>
        <Search size={20} strokeWidth={2.1} color={colors.muted} />
        <Text style={styles.searchText}>Buscar serviço, nome ou categoria</Text>
        <View style={styles.filterDot}><SlidersHorizontal size={17} strokeWidth={2.1} color={colors.primary} /></View>
      </Pressable>

      <View style={styles.chipRow}>
        {categories.slice(0, 5).map((category) => (
          <Pressable key={category} accessibilityRole="button" accessibilityLabel={`Explorar ${category}`} onPress={() => { haptic.select(); router.push("/(tabs)/explore"); }} style={({ pressed }) => [styles.quickChip, category === "Todas" && styles.quickChipActive, pressed && styles.actionPressed]}>
            <Text style={[styles.quickChipText, category === "Todas" && styles.quickChipTextActive]}>{category}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <View>
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
  list: { paddingBottom: spacing.xl },
  topbar: { minHeight: 64, paddingHorizontal: spacing.lg, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  brandMark: { width: 32, height: 32, borderRadius: radius.control, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary },
  brandText: { color: colors.text, fontFamily: fonts.extraBold, fontSize: 17 },
  brandAccent: { color: colors.primary },
  iconButton: { width: 48, height: 48, borderRadius: radius.control, alignItems: "center", justifyContent: "center" },
  location: { flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.lg, gap: spacing.xs, marginTop: spacing.xs },
  locationText: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 12 },
  hero: { overflow: "hidden", position: "relative", margin: spacing.lg, padding: spacing.lg, minHeight: 200, borderRadius: radius.card, backgroundColor: colors.surface, ...elevation.level1 },
  eyebrow: { color: colors.primaryDeep, fontFamily: fonts.extraBold, fontSize: 10, letterSpacing: 1.2 },
  heroTitle: { color: colors.text, fontFamily: fonts.extraBold, fontSize: 29, lineHeight: 36, letterSpacing: -1, marginTop: spacing.sm, maxWidth: "80%" },
  heroSubtitle: { color: colors.muted, fontFamily: fonts.medium, fontSize: 14, lineHeight: 24, marginTop: spacing.sm, maxWidth: "76%" },
  heroSymbol: { position: "absolute", right: -16, bottom: -16, width: 96, height: 96, borderRadius: radius.card, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, transform: [{ rotate: "-8deg" }] },
  search: { minHeight: 56, flexDirection: "row", alignItems: "center", gap: spacing.sm, marginHorizontal: spacing.lg, paddingHorizontal: spacing.md, borderRadius: radius.control, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, ...elevation.level1 },
  searchText: { flex: 1, color: colors.muted, fontFamily: fonts.medium, fontSize: 14 },
  filterDot: { width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: radius.control, backgroundColor: colors.surfaceSoft },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.xs, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  quickChip: { minHeight: 40, justifyContent: "center", paddingHorizontal: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  quickChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  quickChipText: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 12 },
  quickChipTextActive: { color: colors.surface },
  sectionHeader: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: spacing.lg, marginTop: spacing.xxl, marginBottom: spacing.sm },
  sectionEyebrow: { color: colors.primaryDeep, fontFamily: fonts.extraBold, fontSize: 10, letterSpacing: 1.1 },
  sectionTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 20, lineHeight: 24, marginTop: spacing.xs },
  count: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 12 },
  actionPressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  iconPressed: { opacity: 0.66 },
});
