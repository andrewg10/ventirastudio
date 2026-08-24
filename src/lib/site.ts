// Locked business data — mirrors index.html prototype

export const WHATSAPP_NUMBER = "40769292363";
export const WHATSAPP_DISPLAY = "+40 769 292 363";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Pre-filled messages differ per section (copied from index.html)
export const WA_GENERAL = waLink("Salut, vreau să automatizăm ceva în firma mea.");
export const WA_DEMO = waLink("Vreau un agent ca ăsta pentru firma mea.");
export const WA_CONTACT = waLink("Salut, am o problemă care îmi mănâncă timp: ");

export const EMAIL = "contact@ventirastudio.ro";
export const LEGAL_NAME = "Speranța Expert SRL";
export const CUI = "48785293";
