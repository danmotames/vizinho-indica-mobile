export const categories = ["Todas", "Casa", "Beleza", "Aulas", "Pets", "Bem-estar"] as const;
export type Category = (typeof categories)[number];
export type Provider = { id: string; initials: string; name: string; service: string; category: Exclude<Category, "Todas">; rating: string; reviews: number; recommendations: number; distance: string; quote: string; recommendedBy: string; when: string; phone: string; bio: string; tags: string[] };
export const providers: Provider[] = [
  { id: "ana-souza", initials: "AS", name: "Ana Souza", service: "Manicure e nail designer", category: "Beleza", rating: "4,9", reviews: 28, recommendations: 28, distance: "a 4 min de você", quote: "A Ana foi pontual, cuidadosa e o resultado durou muito. Já indiquei para outras vizinhas.", recommendedBy: "Marina, bloco B", when: "há 2 dias", phone: "5511999991111", bio: "Atendimento cuidadoso para manicure, nail art e esmaltação. Agenda com horário marcado na Vila Mariana.", tags: ["Atendimento em casa", "Agenda flexível", "Nail art"] },
  { id: "casa-nova-eletrica", initials: "CN", name: "Casa Nova Elétrica", service: "Elétrica e pequenos reparos", category: "Casa", rating: "4,8", reviews: 19, recommendations: 19, distance: "a 7 min de você", quote: "Resolveram o problema no mesmo dia e deixaram tudo organizado.", recommendedBy: "Rafael, torre 1", when: "há 5 dias", phone: "5511988882222", bio: "Equipe para pequenos reparos, instalação de luminárias, tomadas e manutenção elétrica residencial.", tags: ["Orçamento rápido", "Reparo residencial", "Nota fiscal"] },
  { id: "bicho-leve", initials: "BL", name: "Bicho Leve", service: "Passeio e cuidados para pets", category: "Pets", rating: "4,7", reviews: 15, recommendations: 15, distance: "a 9 min de você", quote: "Meu cachorro voltou tranquilo e feliz. O cuidado durante o passeio fez toda diferença.", recommendedBy: "Camila, bloco C", when: "há 1 semana", phone: "5511977773333", bio: "Passeios individualizados e cuidados para cães de todos os portes, com atualizações durante o atendimento.", tags: ["Passeio individual", "Atualizações", "Primeiros socorros"] },
  { id: "luiza-martins", initials: "LM", name: "Luiza Martins", service: "Reforço escolar", category: "Aulas", rating: "4,9", reviews: 11, recommendations: 11, distance: "a 12 min de você", quote: "A Luiza explica com muita clareza e meu filho recuperou a confiança.", recommendedBy: "João, torre 2", when: "há 2 semanas", phone: "5511966664444", bio: "Reforço escolar com acompanhamento próximo para ensino fundamental e anos iniciais do ensino médio.", tags: ["Fundamental", "Matemática", "Português"] },
];
export function getProvider(id: string) { return providers.find((provider) => provider.id === id); }

export const SEARCHABLE_MAP: Record<string, string> = Object.fromEntries(
  providers.map((p) => [p.id, `${p.name} ${p.service} ${p.category}`.toLocaleLowerCase("pt-BR")]),
);

export function filterProviders(search: string, category: Category) {
  const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
  return providers.filter((provider) => {
    return (category === "Todas" || provider.category === category) && (SEARCHABLE_MAP[provider.id] ?? "").includes(normalizedSearch);
  });
}
