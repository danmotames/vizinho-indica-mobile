import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, normalizePhone } from "../src/lib/whatsapp";
describe("WhatsApp contact", () => { it("normalizes a Brazilian number before building a URL", () => { expect(normalizePhone("+55 (11) 99999-1111")).toBe("5511999991111"); }); it("builds an encoded WhatsApp URL with contextual copy", () => { expect(buildWhatsAppUrl("+55 (11) 99999-1111", "Ana Souza")).toContain("https://wa.me/5511999991111?text="); expect(buildWhatsAppUrl("5511999991111", "Ana Souza")).toContain("Ana%20Souza"); }); });
