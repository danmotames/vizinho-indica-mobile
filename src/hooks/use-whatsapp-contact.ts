import { useCallback, useState } from "react";
import * as Linking from "expo-linking";
import type { Provider } from "@/src/data/providers";
import { haptic } from "@/src/lib/haptics";
import { buildWhatsAppUrl } from "@/src/lib/whatsapp";
type ContactState = { tone: "success" | "error"; message: string } | null;
export function useWhatsAppContact() { const [feedback, setFeedback] = useState<ContactState>(null); const contact = useCallback(async (provider: Provider) => { setFeedback(null); const url = buildWhatsAppUrl(provider.phone, provider.name); try { const supported = await Linking.canOpenURL(url); if (!supported) { haptic.error(); setFeedback({ tone: "error", message: "Não foi possível abrir o WhatsApp neste dispositivo." }); return; } await Linking.openURL(url); haptic.success(); setFeedback({ tone: "success", message: `Abrindo conversa com ${provider.name}.` }); } catch { haptic.error(); setFeedback({ tone: "error", message: "Não foi possível abrir o contato agora. Tente novamente." }); } }, []); return { contact, feedback, clearFeedback: () => setFeedback(null) }; }
