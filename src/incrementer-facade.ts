import type { Incrementer } from "./incrementer";

import IncrementerFactory from "./incrementer-factory";
import DatetimeIncrementerFactory from "./incrementer-factory-datetime";
import DatetimeNamedIncrementerFactory from "./incrementer-factory-datetime-named";
import { ProgrammaticIncrementerFactory } from "./incrementer-factory-programmatic";

/**
 * Detects an incrementer from the source text.
 */
export function detectIncrementer(source: string): Incrementer | undefined {
  return (
    // Formats with "*" or "~".
    ProgrammaticIncrementerFactory.createRepeatedCyclingNumericIncrementer(source) ??
    ProgrammaticIncrementerFactory.createRepeatedCyclingCharacterIncrementer(source) ??
    ProgrammaticIncrementerFactory.createCyclingNumericIncrementer(source) ??
    ProgrammaticIncrementerFactory.createCyclingCharacterIncrementer(source) ??
    ProgrammaticIncrementerFactory.createRepeatedNumericIncrementer(source) ??
    ProgrammaticIncrementerFactory.createRepeatedCharacterIncrementer(source) ??
    ProgrammaticIncrementerFactory.createInvalidProgrammaticRepeatFormatter(source) ??
    // Like "2026/4/29" or "12/31 23:58".
    DatetimeIncrementerFactory.createYmdTimeIncrementer(source) ??
    DatetimeIncrementerFactory.createMdTimeIncrementer(source) ??
    DatetimeIncrementerFactory.createYmdIncrementer(source) ??
    DatetimeIncrementerFactory.createMdydIncrementer(source) ??
    DatetimeIncrementerFactory.createMdIncrementer(source) ??
    DatetimeIncrementerFactory.createYmIncrementer(source) ??
    DatetimeIncrementerFactory.createMyIncrementer(source) ??
    DatetimeIncrementerFactory.createTimeWithSecondIncrementer(source) ??
    DatetimeIncrementerFactory.createTimeWithoutSecondIncrementer(source) ??
    // Like "Dec 30".
    DatetimeNamedIncrementerFactory.createNamedMonthDateIncrementer(source) ??
    DatetimeNamedIncrementerFactory.createNamedMonthDayIncrementer(source) ??
    DatetimeNamedIncrementerFactory.createNamedMonthYearIncrementer(source) ??
    DatetimeNamedIncrementerFactory.createNamedMonthIncrementer(source) ??
    // Like "2026/99/99". => fallback (only repeat)
    DatetimeIncrementerFactory.createInvalidDateTimeRepeatFormatter(source) ??
    // Like "0x0e".
    IncrementerFactory.createPrefixedRadixIncrementer(source) ??
    // Like " 1".
    IncrementerFactory.createSpacePaddedNumericIncrementer(source) ??
    // Normal increment.
    IncrementerFactory.createNumericIncrementer(source) ??
    // Others.
    IncrementerFactory.createNonAsciiDecimalIncrementer(source) ??
    IncrementerFactory.createChineseNumericIncrementer(source) ??
    IncrementerFactory.createCharacterIncrementer(source) ??
    // No target. => fallback (only repeat)
    IncrementerFactory.createOnlyRepeatFormatter(source)
  );
}
