import { TimestampSeconds } from '@hungryhungry/tabs-schema';
import { describe, expect, it } from 'vitest';
import { formatMoney, formatTabId, shortDate, until } from '../../src/util/format';

describe('shortDate', () => {
  it('formats a short date', () => {
    const date = new Date(2022, 1, 28);
    expect(shortDate(date)).toEqual('28 Feb 2022');
  });
});

describe('formatMoney', () => {
  it('formats an amount of money', () => {
    expect(formatMoney(90000)).toEqual('900.00');
    expect(formatMoney(90405)).toEqual('904.05');
    expect(formatMoney(-55000)).toEqual('-550.00');
    expect(formatMoney(0)).toEqual('0.00');
  });

  it('deal with unusual numbers', () => {
    expect(formatMoney(undefined)).toEqual('');
    expect(formatMoney(null)).toEqual('');
    expect(formatMoney(NaN)).toEqual('');
    expect(formatMoney(Infinity)).toEqual('∞');
    expect(formatMoney(-Infinity)).toEqual('∞');
    expect(formatMoney(-55000.99)).toEqual('-550.00');
    expect(formatMoney(0.99)).toEqual('0.00');
  });
});

describe('formatTabId', () => {
  it('formats a tabId', () => {
    expect(formatTabId('cl8knr0d400000sn0di945m0a')).toEqual('HHDI945M0A');
  });

  it('deal with weird tabId', () => {
    expect(formatTabId('')).toEqual('');
    expect(formatTabId(null)).toEqual('');
    expect(formatTabId(undefined)).toEqual('');
    expect(formatTabId('cdjhfhj')).toEqual('');
  });
});

describe('until', () => {
  it.each([
    {
      date: timestampSecondsFromUTC(2022, 1, 28, 3, 33, 27),
      now: timestampSecondsFromUTC(2022, 1, 28, 0, 38, 0),
      expected: '2h 55m',
    },
    {
      date: timestampSecondsFromUTC(2022, 1, 27, 3, 38, 0),
      now: timestampSecondsFromUTC(2022, 1, 1, 0, 38, 0),
      expected: '627h',
    },
    {
      date: timestampSecondsFromUTC(2022, 1, 28, 23, 33, 27),
      now: timestampSecondsFromUTC(2022, 1, 28, 23, 18, 0),
      expected: '15m',
    },
    {
      date: 1666910800, // Friday, 28 October 2022 09:46:40 GMT+11:00 DST
      now: 1666910730, // Friday, 28 October 2022 09:45:30 GMT+11:00 DST
      expected: '1m',
    },
    {
      date: 1666910739, // Same timestamp
      now: 1666910739, // Same timestamp
      expected: '',
    },
  ])('returns the hours and minutes between $now and $date', ({ now, date, expected }) => {
    expect(until(date, now), `For ${new Date(date * 1000).toISOString()} - ${new Date(now * 1000).toISOString()}`).toBe(
      expected
    );
  });

  it('returns blank when now > date', () => {
    const date = new Date(2022, 1, 28, 23, 33, 27);
    const now = new Date(2022, 1, 29, 20, 38, 0);
    expect(until(date, now)).toBe('');
  });

  it('returns blank when date is undefined', () => {
    expect(until(undefined)).toBe('');
  });
});

function timestampSecondsFromUTC(
  year: number,
  month: number,
  day: number,
  hour: number,
  min: number,
  sec: number
): TimestampSeconds {
  return Date.UTC(year, month, day, hour, min, sec) / 1000;
}
