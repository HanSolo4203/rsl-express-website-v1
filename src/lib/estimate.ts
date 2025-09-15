import { PRICE_INDEX, PER_KG, ItemCode, PRICE_VERSION } from "@/config/prices";

export type WeeklyItems = Record<ItemCode, number>; // counts per item

export type BulkByKg = { wdifKg?: number; wdfKg?: number; colorSeparated?: boolean };

export type EstimateInput = {
  weeklyItems: Partial<WeeklyItems>;
  bulkByKg?: BulkByKg;
  mode: "per-item" | "per-kg" | "mixed";
};

export type Line = { code: string; name: string; qty: number; unitPrice: number; subtotal: number; unit: "each" | "kg" };

export type EstimateResult = {
  lines: Line[];
  total: number;
  pricingVersion: string;
};

export function computeEstimate(input: EstimateInput): EstimateResult {
  const lines: Line[] = [];

  // Per-item lines
  for (const [code, qty] of Object.entries(input.weeklyItems || {})) {
    const n = Number(qty ?? 0);
    if (!n) continue;
    const item = PRICE_INDEX[code as ItemCode];
    if (!item) continue;
    lines.push({
      code,
      name: item.name,
      qty: n,
      unitPrice: item.price,
      subtotal: +(n * item.price).toFixed(2),
      unit: "each",
    });
  }

  // Per-kg lines
  const kg = input.bulkByKg;
  if (kg && ((kg.wdifKg ?? 0) > 0 || (kg.wdfKg ?? 0) > 0)) {
    if ((kg.wdifKg ?? 0) > 0) {
      const rate = kg.colorSeparated ? PER_KG.wdifColor : PER_KG.wdif;
      const qty = kg.wdifKg ?? 0;
      lines.push({
        code: rate.code,
        name: rate.name + (kg.colorSeparated ? " (Color Separated)" : ""),
        qty,
        unitPrice: rate.price,
        subtotal: +(qty * rate.price).toFixed(2),
        unit: "kg",
      });
    }
    if ((kg.wdfKg ?? 0) > 0) {
      const rate = kg.colorSeparated ? PER_KG.wdfColor : PER_KG.wdf;
      const qty = kg.wdfKg ?? 0;
      lines.push({
        code: rate.code,
        name: rate.name + (kg.colorSeparated ? " (Color Separated)" : ""),
        qty,
        unitPrice: rate.price,
        subtotal: +(qty * rate.price).toFixed(2),
        unit: "kg",
      });
    }
  }

  const total = +lines.reduce((s, l) => s + l.subtotal, 0).toFixed(2);
  return { lines, total, pricingVersion: PRICE_VERSION };
}
