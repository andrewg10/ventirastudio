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

// Agenți AI în producție, pe conturi WhatsApp Business dedicate — pot fi testați public
export const AGENT_TEST_MESSAGE = "Bună! Am văzut agentul pe ventirastudio.ro și vreau să-l testez.";
export const AGENTS = [
  { name: "Agent La Liman", business: "Restaurant · Tulcea", does: "Rezervări de mese, meniu, program, evenimente", number: "40745374765" },
  { name: "Dispecerat ConexTrans", business: "Autogară · Tulcea", does: "Orar și trasee pentru toți operatorii, rezervări curse", number: "40745384267" },
  { name: "Le Pelican Sportif", business: "Local · rezervări", does: "Programări, confirmări și reamintiri", number: "40754202153" },
] as const;

export function agentLink(number: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(AGENT_TEST_MESSAGE)}`;
}

export const EMAIL = "contact@ventirastudio.ro";
export const LEGAL_NAME = "Speranța Expert SRL";
export const CUI = "48785293";
