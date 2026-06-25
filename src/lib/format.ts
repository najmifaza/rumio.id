/**
 * Format angka ke format Rupiah singkat
 * e.g. 875000000 → "Rp 875 Juta"
 * e.g. 2150000000 → "Rp 2,15 Miliar"
 */
export function formatPriceShort(value: number): string {
  if (value >= 1_000_000_000) {
    const miliar = value / 1_000_000_000;
    return `Rp ${miliar % 1 === 0 ? miliar : miliar.toFixed(2).replace(".", ",")} Miliar`;
  }
  if (value >= 1_000_000) {
    const juta = value / 1_000_000;
    return `Rp ${juta % 1 === 0 ? juta : juta.toFixed(1).replace(".", ",")} Juta`;
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
}

/**
 * Format angka ke format Rupiah lengkap
 * e.g. 875000000 → "Rp 875.000.000"
 */
export function formatPriceFull(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

/**
 * Hitung estimasi cicilan KPR bulanan berdasarkan harga properti.
 * Asumsi: DP 10%, suku bunga 7%/tahun, tenor 20 tahun.
 */
export function formatKPREstimate(price: number): string {
  const loanAmount = price * 0.9;
  const monthlyRate = 0.07 / 12;
  const termMonths = 20 * 12;
  const monthly =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  return formatPriceShort(Math.round(monthly));
}
