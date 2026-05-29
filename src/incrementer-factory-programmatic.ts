import type { Incrementer } from "./incrementer";
import { CHAR_MEMBER_SETS } from "./incrementer-constant";

/**
 * Creates incrementers for compact programmatic prompts.
 */
export class ProgrammaticIncrementerFactory {
  /**
   * Creates a repeated cycling numeric incrementer.
   * Supports patterns like `1*2~3`, which yields `1`, `1`, `2`, `2`, `3`, `3`, `1`, ...
   * Supports patterns like `[ 9]*2~10`, which yields `[ 9]`, `[ 9]`, `[10]`, `[10]`, `[ 9]`, ...
   */
  static createRepeatedCyclingNumericIncrementer(source: string): Incrementer | undefined {
    const match = /^(.*?)\*(.+?)~(.+)$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, startSource, repeatSource, endSource] = match;
    if (/[~*]/u.test(repeatSource + endSource)) {
      return undefined;
    }
    if (looksLikeDateTimeSource(startSource)) {
      return undefined;
    }

    const matchStartParts = /^(.*?)( *)(\d+)(.*)$/u.exec(startSource);
    if (!matchStartParts) {
      return undefined;
    }
    const [, prefix, padding, digits, suffix] = matchStartParts;
    if (/[~*]/u.test(prefix + suffix)) {
      return undefined;
    }

    const matchRepeatDigits = /\d+/u.exec(repeatSource);
    const repeat = matchRepeatDigits ? Number.parseInt(matchRepeatDigits[0], 10) : undefined;
    if (repeat === undefined || repeat <= 0) {
      return undefined;
    }

    const matchEndDigits = /^\d+$/u.exec(endSource);
    const end = matchEndDigits ? Number.parseInt(matchEndDigits[0], 10) : undefined;
    if (end === undefined) {
      return undefined;
    }

    const start = Number.parseInt(digits, 10);
    const plusMinus = start <= end ? 1 : -1;
    const rangeLength = Math.abs(end - start) + 1;
    const format = createNumberFormatter(prefix, padding, digits, suffix);

    return (index: number) => {
      return format(start + (Math.floor(index / repeat) % rangeLength) * plusMinus);
    };
  }

  /**
   * Creates a cycling numeric incrementer.
   * Supports patterns like `1~3`, which yields `1`, `2`, `3`, `1`, ...
   * Supports patterns like `[ 8]~10`, which yields `[ 8]`, `[ 9]`, `[10]`, `[ 8]`, ...
   * Supports descending ranges like `3~1`, which yields `3`, `2`, `1`, `3`, ...
   */
  static createCyclingNumericIncrementer(source: string): Incrementer | undefined {
    const match = /^(.*?)~(.+)$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, startSource, endSource] = match;
    if (/[~*]/u.test(endSource)) {
      return undefined;
    }
    if (looksLikeDateTimeSource(startSource)) {
      return undefined;
    }

    const matchStartParts = /^(.*?)( *)(\d+)(.*)$/u.exec(startSource);
    if (!matchStartParts) {
      return undefined;
    }
    const [, prefix, padding, digits, suffix] = matchStartParts;
    if (/[~*]/u.test(prefix + suffix)) {
      return undefined;
    }

    const matchEndDigits = /^\d+$/u.exec(endSource);
    const end = matchEndDigits ? Number.parseInt(matchEndDigits[0], 10) : undefined;
    if (end === undefined) {
      return undefined;
    }

    const start = Number.parseInt(digits, 10);
    const plusMinus = start <= end ? 1 : -1;
    const rangeLength = Math.abs(end - start) + 1;
    const format = createNumberFormatter(prefix, padding, digits, suffix);

    return (index: number) => {
      return format(start + (index % rangeLength) * plusMinus);
    };
  }

  /**
   * Creates a repeated numeric incrementer.
   * Supports patterns like `1*3`, which yields `1`, `1`, `1`, `2`, ...
   * Supports patterns like `[ 9]*2`, which yields `[ 9]`, `[ 9]`, `[10]`, `[10]`, `[11]`, `[11]`, ...
   */
  static createRepeatedNumericIncrementer(source: string): Incrementer | undefined {
    const match = /^(.*?)\*(.+)$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, startSource, repeatSource] = match;
    if (/[~*]/u.test(repeatSource)) {
      return undefined;
    }
    if (looksLikeDateTimeSource(startSource)) {
      return undefined;
    }

    const matchStartParts = /^(.*?)( *)(\d+)(.*)$/u.exec(startSource);
    if (!matchStartParts) {
      return undefined;
    }
    const [, prefix, padding, digits, suffix] = matchStartParts;
    if (/[~*]/u.test(prefix + suffix)) {
      return undefined;
    }
    const matchRepeatDigits = /\d+/u.exec(repeatSource);
    const repeat = matchRepeatDigits ? Number.parseInt(matchRepeatDigits[0], 10) : undefined;
    if (repeat === undefined || repeat <= 0) {
      return undefined;
    }

    const start = Number.parseInt(digits, 10);
    const format = createNumberFormatter(prefix, padding, digits, suffix);

    return (index: number) => {
      return format(start + Math.floor(index / repeat));
    };
  }

  /**
   * Creates a repeated cycling character incrementer.
   * Supports patterns like `A*2~3`, which yields `A`, `A`, `B`, `B`, `C`, `C`, `A`, ...
   */
  static createRepeatedCyclingCharacterIncrementer(source: string): Incrementer | undefined {
    const match = /^(.?)\*(.+?)~(.+)$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, startSource, repeatSource, cycleLengthSource] = match;
    if (/[~*]/u.test(repeatSource + cycleLengthSource)) {
      return undefined;
    }

    const repeat = /^\d+$/u.test(repeatSource) ? Number.parseInt(repeatSource, 10) : undefined;
    const cycleLength = /^\d+$/u.test(cycleLengthSource) ? Number.parseInt(cycleLengthSource, 10) : undefined;
    if (repeat === undefined || cycleLength === undefined || repeat <= 0 || cycleLength <= 0) {
      return undefined;
    }

    return createCharacterFormatter(startSource, repeat, cycleLength);
  }

  /**
   * Creates a cycling character incrementer.
   * Supports patterns like `A~3`, which yields `A`, `B`, `C`, `A`, ...
   */
  static createCyclingCharacterIncrementer(source: string): Incrementer | undefined {
    const match = /^(.?)~(.+)$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, startSource, cycleLengthSource] = match;
    if (/[~*]/u.test(cycleLengthSource)) {
      return undefined;
    }

    const cycleLength = /^\d+$/u.test(cycleLengthSource) ? Number.parseInt(cycleLengthSource, 10) : undefined;
    if (cycleLength === undefined || cycleLength <= 0) {
      return undefined;
    }

    return createCharacterFormatter(startSource, 1, cycleLength);
  }

  /**
   * Creates a repeated character incrementer.
   * Supports patterns like `A*3`, which yields `A`, `A`, `A`, `B`, ...
   */
  static createRepeatedCharacterIncrementer(source: string): Incrementer | undefined {
    const match = /^(.?)\*(.+)$/u.exec(source);
    if (!match) {
      return undefined;
    }

    const [, startSource, repeatSource] = match;
    if (/[~*]/u.test(repeatSource)) {
      return undefined;
    }

    const repeat = /^\d+$/u.test(repeatSource) ? Number.parseInt(repeatSource, 10) : undefined;
    if (repeat === undefined || repeat <= 0) {
      return undefined;
    }

    return createCharacterFormatter(startSource, repeat);
  }

  /**
   * Repeats invalid programmatic-looking inputs.
   */
  static createInvalidProgrammaticRepeatFormatter(source: string): Incrementer | undefined {
    if (!/[~*]/u.test(source)) {
      return undefined;
    }

    return (_index: number) => source;
  }
}

function createCharacterFormatter(source: string, repeat: number, cycleLength?: number): Incrementer | undefined {
  if ([...source].length !== 1) {
    return undefined;
  }

  for (const charMemberSet of CHAR_MEMBER_SETS) {
    const members = [...charMemberSet];
    const startIndex = members.indexOf(source);
    if (startIndex < 0) {
      continue;
    }

    return (index: number) => {
      // Repeat stretches each value; cycle folds the stretched index back to a fixed period.
      const repeatedIndex = Math.floor(index / repeat);
      const offset = cycleLength === undefined ? repeatedIndex : repeatedIndex % cycleLength;
      return members[(startIndex + offset) % members.length];
    };
  }

  return undefined;
}

function createNumberFormatter(prefix: string, padding: string, digits: string, suffix: string): (value: number) => string {
  const zeroPadded = digits.startsWith("0") && digits.length > 1;
  const width = zeroPadded ? digits.length : padding.length + digits.length;
  const padChar = zeroPadded ? "0" : " ";

  return (value: number) => {
    const formatted = String(value).padStart(width, padChar);
    return `${prefix}${formatted}${suffix}`;
  };
}

/**
 * Programmatic formats do not support date/time-like inputs.
 */
function looksLikeDateTimeSource(source: string): boolean {
  return /\d[\/:-]\d/u.test(source);
}
