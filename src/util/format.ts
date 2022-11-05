/**
 * Returns a capitalized text
 */
export function titleCase(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

/**
 * Formats an integer number of cents to a string.
 */
export function formatMoney(cents: number | null | undefined): string {
  if (cents === 0) return '0.00';
  if (!cents) return '';
  if (Math.abs(cents) === Infinity) return '∞';
  return (Math.trunc(cents) / 100).toFixed(2);
}

/**
 * Formats a tabId.
 */
export function formatTabId(tabId: string | null | undefined): string {
  if (!tabId) return '';
  if (tabId.length < 8) return '';
  return `HH${tabId.substring(tabId.length - 8).toUpperCase()}`;
}

export function padZero(n: number, size: number): string {
  const padded = `00000${n}`;
  return padded.slice(padded.length - size);
}
