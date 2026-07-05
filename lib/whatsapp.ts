// Central WhatsApp config — used by all CTAs across the site.
export const WHATSAPP_NUMBER = "38763509999"; // 063 509 999

const DEFAULT_MESSAGE = "Zdravo, zanima me vaša usluga.";

/**
 * Build a wa.me deep link with an optional pre-filled message.
 * Pass a service name to make the inbound message context-aware.
 */
export function waLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function waLinkForService(service: string): string {
  return waLink(`Zdravo, zanima me usluga: ${service}.`);
}
