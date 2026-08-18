import type { LucideIcon } from "lucide-react-native";
import { BriefcaseBusiness, GraduationCap, HeartPulse, PawPrint, Sparkles, Wrench } from "lucide-react-native";

import type { Category } from "@/src/data/providers";

const categoryIcons: Record<Exclude<Category, "Todas">, LucideIcon> = {
  Casa: Wrench,
  Beleza: Sparkles,
  Aulas: GraduationCap,
  Pets: PawPrint,
  "Bem-estar": HeartPulse,
};

export function getServiceIcon(category: Exclude<Category, "Todas">): LucideIcon {
  return categoryIcons[category] ?? BriefcaseBusiness;
}
