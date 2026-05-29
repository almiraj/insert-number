import type { Incrementer } from "./incrementer";

/**
 * Creates date and time incrementers.
 */
export default class DatetimeIncrementerFactory {
  /**
   * Creates a date-time incrementer.
   * Supports patterns like `2026/12/31 23:58`, `2026/12/31 23:59:58`, `2026-12-31 23:58`, and `2026-12-31 23:59:58`.
   */
  static createFullDateTimeIncrementer(source: string): Incrementer | undefined {
    const match = /^(\d{4})([\/-])(\d{1,2})\2(\d{1,2})(\s+)(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, yearText, separatorText, monthText, dayText, spacer, hourText, minuteText, secondText] = match;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const hour = Number(hourText);
    const minute = Number(minuteText);
    const second = Number(secondText ?? "0");

    if (!isValidDate(year, month, day) || !isValidDateTimeTime(hour, minute, second)) {
      return undefined;
    }

    const start = Date.UTC(year, month - 1, day, hour, minute, second);
    return (index: number) => {
      const incrementedDate = new Date(start + index * (secondText ? 1000 : 60 * 1000));
      const dateText = [
        String(incrementedDate.getUTCFullYear()).padStart(yearText.length, "0"),
        String(incrementedDate.getUTCMonth() + 1).padStart(monthText.length, "0"),
        String(incrementedDate.getUTCDate()).padStart(dayText.length, "0")
      ].join(separatorText);
      const timeText = [
        String(incrementedDate.getUTCHours()).padStart(hourText.length, "0"),
        String(incrementedDate.getUTCMinutes()).padStart(minuteText.length, "0")
      ].join(":");
      const fullTimeText = timeText
        + (secondText ? `:${String(incrementedDate.getUTCSeconds()).padStart(secondText.length, "0")}` : "");
      return dateText + spacer + fullTimeText;
    };
  }

  /**
   * Creates a year-month-day incrementer.
   * Supports patterns like `20260429`, `2026/04/29`, `2026-04-29`, `2026/4/29` and `2026-4-29`.
   * Exceptionally allows one trailing space for inputs in the middle of becoming a full date-time.
   */
  static createYmdIncrementer(source: string): Incrementer | undefined {
    const match = /^(\d{4})(([\/-])?)(\d{1,2})\2(\d{1,2})( ?)$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, yearText, separatorText, , monthText, dayText, trailingSpace] = match;
    if (separatorText === "" && source.length !== 8) {
      // Treat "202611" as "2026/11", not as "2026/1/1".
      return undefined;
    }

    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    if (!isValidDate(year, month, day)) {
      return undefined;
    }

    const start = new Date(Date.UTC(year, month - 1, day));
    const monthPaddingWidth = getDatePartPaddingWidth(monthText);
    const dayPaddingWidth = getDatePartPaddingWidth(dayText, monthText);
    return (index: number) => {
      const incrementedDate = addDays(start, index);
      return [
        String(incrementedDate.getUTCFullYear()).padStart(yearText.length, "0"),
        String(incrementedDate.getUTCMonth() + 1).padStart(monthPaddingWidth, "0"),
        String(incrementedDate.getUTCDate()).padStart(dayPaddingWidth, "0")
      ].join(separatorText) + trailingSpace;
    };
  }

  /**
   * Creates a month-day-year incrementer.
   * Supports patterns like `04/29/2026`, `04-29-2026`, `4/29/2026` and `4-29-2026`.
   */
  static createMdydIncrementer(source: string): Incrementer | undefined {
    const match = /^(\d{1,2})([\/-])(\d{1,2})\2(\d{4})$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, monthText, separatorText, dayText, yearText] = match;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    if (!isValidDate(year, month, day)) {
      return undefined;
    }

    const start = new Date(Date.UTC(year, month - 1, day));
    const monthPaddingWidth = getDatePartPaddingWidth(monthText);
    const dayPaddingWidth = getDatePartPaddingWidth(dayText, monthText);
    return (index: number) => {
      const incrementedDate = addDays(start, index);
      return [
        String(incrementedDate.getUTCMonth() + 1).padStart(monthPaddingWidth, "0"),
        String(incrementedDate.getUTCDate()).padStart(dayPaddingWidth, "0"),
        String(incrementedDate.getUTCFullYear()).padStart(yearText.length, "0")
      ].join(separatorText);
    };
  }

  /**
   * Creates a month-day incrementer.
   * Supports patterns like `04/29` and `4/29`.
   */
  static createMdIncrementer(source: string): Incrementer | undefined {
    const match = /^(\d{1,2})([\/-])(\d{1,2})$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, monthText, separatorText, dayText] = match;
    const month = Number(monthText);
    const day = Number(dayText);
    if (!isValidMonthDay(month, day)) {
      return undefined;
    }

    const start = new Date(Date.UTC(1970, month - 1, day));
    const monthPaddingWidth = getDatePartPaddingWidth(monthText);
    const dayPaddingWidth = getDatePartPaddingWidth(dayText, monthText);
    return (index: number) => {
      const incrementedDate = addDays(start, index);
      return [
        String(incrementedDate.getUTCMonth() + 1).padStart(monthPaddingWidth, "0"),
        String(incrementedDate.getUTCDate()).padStart(dayPaddingWidth, "0")
      ].join(separatorText);
    };
  }

  /**
   * Creates a year-month incrementer.
   * Supports patterns like `202604`, `2026/04`, `2026-04`, `2026/4` and `2026-4`.
   */
  static createYmIncrementer(source: string): Incrementer | undefined {
    const match = /^(\d{4})(([\/-])?)(\d{1,2})$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, yearText, separatorText, , monthText] = match;
    if (separatorText === "" && source.length !== 6) {
      // Do not treat "20261" as "2026/1".
      return undefined;
    }

    const year = Number(yearText);
    const month = Number(monthText);
    if (year < 1970 || month < 1 || month > 12) {
      return undefined;
    }

    const start = new Date(Date.UTC(year, month - 1, 1));
    const monthPaddingWidth = getDatePartPaddingWidth(monthText);
    return (index: number) => {
      const incrementedDate = addMonths(start, index);
      return [
        String(incrementedDate.getUTCFullYear()).padStart(yearText.length, "0"),
        String(incrementedDate.getUTCMonth() + 1).padStart(monthPaddingWidth, "0")
      ].join(separatorText);
    };
  }

  /**
   * Creates a month-year incrementer.
   * Supports patterns like `04/2026`, `04-2026`, `4/2026` and `4-2026`.
   */
  static createMyIncrementer(source: string): Incrementer | undefined {
    const match = /^(\d{1,2})([\/-])(\d{4})$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, monthText, separatorText, yearText] = match;
    const year = Number(yearText);
    const month = Number(monthText);
    if (year < 1970 || month < 1 || month > 12) {
      return undefined;
    }

    const start = new Date(Date.UTC(year, month - 1, 1));
    const monthPaddingWidth = getDatePartPaddingWidth(monthText);
    return (index: number) => {
      const incrementedDate = addMonths(start, index);
      return [
        String(incrementedDate.getUTCMonth() + 1).padStart(monthPaddingWidth, "0"),
        String(incrementedDate.getUTCFullYear()).padStart(yearText.length, "0")
      ].join(separatorText);
    };
  }

  /**
   * Creates a time incrementer with seconds.
   * Supports patterns like `23:59:58`.
   * Does not support patterns like `1:59:58` or `23:59:1`.
   */
  static createTimeWithSecondIncrementer(source: string): Incrementer | undefined {
    const match = /^(\d{2}):(\d{2}):(\d{2})$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, hourText, minuteText, secondText] = match;
    const hour = Number(hourText);
    const minute = Number(minuteText);
    const second = Number(secondText);
    if (!isValidTime(hour, minute, second)) {
      return undefined;
    }

    const start = new Date(Date.UTC(1970, 0, 1, hour, minute, second));
    return (index: number) => {
      const incrementedDate = addSeconds(start, index);
      return [
        String(incrementedDate.getUTCHours()).padStart(hourText.length, "0"),
        String(incrementedDate.getUTCMinutes()).padStart(minuteText.length, "0"),
        String(incrementedDate.getUTCSeconds()).padStart(secondText.length, "0")
      ].join(":");
    };
  }

  /**
   * Creates a time incrementer without seconds.
   * Supports patterns like `1:58` and `23:58`.
   * Does not support patterns like `1:1` or `23:1`.
   */
  static createTimeWithoutSecondIncrementer(source: string): Incrementer | undefined {
    const match = /^(\d{1,2}):(\d{2})$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, hourText, minuteText] = match;
    const hour = Number(hourText);
    const minute = Number(minuteText);
    if (!isValidTime(hour, minute, 0)) {
      return undefined;
    }

    const start = new Date(Date.UTC(1970, 0, 1, hour, minute, 0));
    return (index: number) => {
      const incrementedDate = addMinutes(start, index);
      return [
        String(incrementedDate.getUTCHours()).padStart(hourText.length, "0"),
        String(incrementedDate.getUTCMinutes()).padStart(minuteText.length, "0")
      ].join(":");
    };
  }

  /**
   * Repeats invalid date/time-looking inputs (fallback).
   */
  static createInvalidDateTimeRepeatFormatter(source: string): Incrementer | undefined {
    const looksLikeInvalidDateTime =
      // `2026/13` or `4/32`, `_4/31` similar to `2026/12` or `4/31`.
      /(?:^|[^\d])\d+[\/-]\d+(?:$|[^\d])/u.test(source) ||
      // `2026/13/29` or `4/32/2026`, `_4/31/2026` similar to `2026/12/29` or `4/30/2026`.
      /(?:^|[^\d])\d+[\/-]\d+[\/-]\d+ ?(?:$|[^\d])/u.test(source) ||
      // `2026/04/30 23:59:60` or `_2026/04/30 23:59:59` similar to `2026/04/30 23:59:59`.
      /(?:^|[^\d])\d+[\/-]\d+[\/-]\d+\s+\d+:\d+:\d+(?:$|[^\d])/u.test(source) ||
      // `20269` similar to `202609`.
      /^\d{5}$/u.test(source) ||
      // `202613` similar to `202612`.
      /^\d{6}$/u.test(source) ||
      // `20260229` similar to `20260228`.
      /^\d{8}$/u.test(source) ||
      // `23:60` or `23:59:60` similar to `23:59` or `23:59:59`.
      /^\d+:\d+(?::\d+)?$/u.test(source);

    if (!looksLikeInvalidDateTime) {
      return undefined;
    }

    return (_index: number) => source;
  }
}

function addDays(date: Date, amount: number): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + amount));
}

function addMonths(date: Date, amount: number): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
}

function addMinutes(date: Date, amount: number): Date {
  return new Date(date.getTime() + amount * 60 * 1000);
}

function addSeconds(date: Date, amount: number): Date {
  return new Date(date.getTime() + amount * 1000);
}

function isValidDate(year: number, month: number, day: number): boolean {
  if (year < 1970 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function isValidMonthDay(month: number, day: number): boolean {
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const date = new Date(Date.UTC(1970, month - 1, day));
  return date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function isValidTime(hour: number, minute: number, second: number): boolean {
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59;
}

function isValidDateTimeTime(hour: number, minute: number, second: number): boolean {
  return hour >= 0 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59;
}

function getDatePartPaddingWidth(part: string, relatedPart?: string): number {
  if (part.startsWith("0") || relatedPart?.startsWith("0") || (relatedPart === undefined && part.length > 1)) {
    return part.length;
  }

  if (relatedPart !== undefined && relatedPart.length > 1) {
    return part.length;
  }

  return 1;
}
