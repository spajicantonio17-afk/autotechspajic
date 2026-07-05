// Shared types for the quick sales log (prodaje) — safe for client & server.
import { SERVICES } from "@/lib/termin";

export type ProdajaInput = {
  usluga: (typeof SERVICES)[number];
  stavka?: string;
  vozilo?: string;
  napomena?: string;
};

export type ProdajaRow = ProdajaInput & {
  id: number;
  created_at: string;
};
