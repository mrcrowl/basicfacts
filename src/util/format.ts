import { TimestampSeconds } from '@hungryhungry/tabs-schema';

/**
 * Returns a capitalized text
 */
export function titleCase(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

/**
 * Returns a date in `d MMM yyyy` format.
 */
export function shortDate(date: Date, language = 'en' as const): string {
  const day = date.getDate();
  const monthName = getMonthName(date, { language, short: true });
  const year = date.getFullYear();
  return `${day} ${monthName} ${year}`;
}

const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Returns a month name in either long or short form.
 */
function getMonthName(date: Date, options?: { language: 'en'; short: boolean }) {
  const monthName = MONTH_NAMES_EN[date.getMonth()];
  return options?.short ? monthName.slice(0, 3) : monthName;
}

/**
 * Returns the hours and minutes until `date`, in `13h 45m` format, or "" if date has already passed.
 */
export function until(
  date: Date | TimestampSeconds | undefined,
  now: Date | TimestampSeconds | undefined = new Date()
) {
  // Guard and noramlise dates.
  if (!date) return '';
  if (typeof date === 'number') date = new Date(date * 1000);
  if (typeof now === 'number') now = new Date(now * 1000);

  const millisBetween = date.valueOf() - now.valueOf();

  // In the past?
  if (millisBetween < 0) {
    return '';
  }

  const parts: string[] = [];
  const totalMinsBetween = millisBetween / 1000 / 60;

  const wholeHoursBetween = Math.trunc(Math.trunc(totalMinsBetween / 60));
  if (wholeHoursBetween > 0) parts.push(`${wholeHoursBetween}h`);

  const remainingMins = Math.trunc(totalMinsBetween - wholeHoursBetween * 60);
  if (remainingMins > 0) parts.push(`${remainingMins}m`);

  return parts.join(' ');
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
