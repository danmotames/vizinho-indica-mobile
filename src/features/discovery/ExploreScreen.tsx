import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { CategoryChip } from "@/components/category-chip";
import { ProviderCard } from "@/components/provider-card";
import { ScreenContainer } from "@/components/screen-container";
import { categories, filterProviders, type Category } from "@/src/data/providers";
import { colors, fonts, radius, spacing } from "@/src/design/tokens";

export function ExploreScreen() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("Todas");
  const filtered = useMemo(() => filterProviders(search, category), [category, search]);
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "recomendação encontrada" : "recomendações encontradas"}`;

  return (
    <ScreenContainer edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProviderCard provider={item} />}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.eyebrow}>EXPLORAR</Text>
            <Text style={styles.title}>O que sua vizinhança recomenda.</Text>
            <View style={styles.search}>
              <MaterialIcons name="search" size={22} color={colors.muted} />
              <TextInput value={search} onChangeText={setSearch} placeholder="Buscar serviço, nome ou categoria" placeholderTextColor={colors.muted} returnKeyType="done" accessibilityLabel="Buscar serviço, nome ou categoria" style={styles.input} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
              {categories.map((item) => <CategoryChip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />)}
            </ScrollView>
            <View style={styles.resultRow}>
              <Text style={styles.resultText}>{resultLabel}</Text>
              {(search || category !== "Todas") ? <Pressable accessibilityRole="button" accessibilityLabel="Limpar busca e filtros" onPress={() => { setSearch(""); setCategory("Todas"); }}><Text style={styles.clear}>Limpar</Text></Pressable> : null}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}><MaterialIcons name="search-off" size={30} color={colors.primary} /></View>
            <Text style={styles.emptyTitle}>Nenhum achado por aqui.</Text>
            <Text style={styles.emptyText}>Tente outro serviço ou limpe os filtros para ver as indicações da vizinhança.</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.bgApp },
  list: { paddingBottom: spacing.large },
  headerContent: { width: "100%", maxWidth: 672, alignSelf: "center", paddingHorizontal: spacing.md },
  eyebrow: { color: colors.primaryDeep, fontFamily: fonts.extraBold, fontSize: 12, lineHeight: 16, letterSpacing: 1.2, marginTop: spacing.lg },
  title: { color: colors.text, fontFamily: fonts.extraBold, fontSize: 30, lineHeight: 38, letterSpacing: -0.8, marginTop: spacing.xs },
  search: { minHeight: 56, flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.lg, paddingHorizontal: spacing.md, borderRadius: radius.control, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  input: { flex: 1, minHeight: 52, color: colors.text, fontFamily: fonts.medium, fontSize: 16, lineHeight: 22 },
  chips: { gap: spacing.xs, paddingTop: spacing.md, paddingBottom: spacing.xs },
  resultRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: spacing.md },
  resultText: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  clear: { color: colors.primary, fontFamily: fonts.bold, fontSize: 14, lineHeight: 20, paddingVertical: spacing.xxs },
  empty: { width: "100%", maxWidth: 480, alignSelf: "center", alignItems: "center", paddingHorizontal: 44, paddingTop: 54 },
  emptyIcon: { alignItems: "center", justifyContent: "center", width: 68, height: 68, borderRadius: 22, backgroundColor: colors.surfaceSoft },
  emptyTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 21, lineHeight: 28, marginTop: spacing.lg },
  emptyText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, textAlign: "center", marginTop: spacing.xs },
});
