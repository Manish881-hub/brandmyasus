export const EUR_TO_USD = 1.08;
export type Currency = 'EUR' | 'USD';

export function fmt(eur: number, cur: Currency): string {
  if (cur === 'EUR') return `${eur.toLocaleString('en-IE').replace(/,/g, ' ')} €`;
  return `$${Math.round(eur * EUR_TO_USD).toLocaleString('en-US')}`;
}
