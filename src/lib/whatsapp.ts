export function normalizePhone(phone: string) { return phone.replace(/\D/g, ""); }
export function buildWhatsAppUrl(phone: string, providerName: string) { const normalizedPhone = normalizePhone(phone); const message = encodeURIComponent(`Olá, ${providerName}! Vi sua indicação no Vizinho Indica e gostaria de saber mais.`); return `https://wa.me/${normalizedPhone}?text=${message}`; }
