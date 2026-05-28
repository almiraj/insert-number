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
    ProgrammaticIncrementerFactory.createRepeatedCyclingNumericIncrementer(source) ??
    ProgrammaticIncrementerFactory.createRepeatedCyclingCharacterIncrementer(source) ??
    ProgrammaticIncrementerFactory.createCyclingNumericIncrementer(source) ??
    ProgrammaticIncrementerFactory.createCyclingCharacterIncrementer(source) ??
    ProgrammaticIncrementerFactory.createRepeatedNumericIncrementer(source) ??
    ProgrammaticIncrementerFactory.createRepeatedCharacterIncrementer(source) ??
    DatetimeIncrementerFactory.createFullDateTimeIncrementer(source) ??
    DatetimeIncrementerFactory.createYmdIncrementer(source) ??
    DatetimeIncrementerFactory.createMdydIncrementer(source) ??
    DatetimeIncrementerFactory.createMdIncrementer(source) ??
    DatetimeIncrementerFactory.createYmIncrementer(source) ??
    DatetimeIncrementerFactory.createMyIncrementer(source) ??
    DatetimeIncrementerFactory.createTimeWithSecondIncrementer(source) ??
    DatetimeIncrementerFactory.createTimeWithoutSecondIncrementer(source) ??
    DatetimeNamedIncrementerFactory.createNamedMonthDateIncrementer(source) ??
    DatetimeNamedIncrementerFactory.createNamedMonthDayIncrementer(source) ??
    DatetimeNamedIncrementerFactory.createNamedMonthYearIncrementer(source) ??
    DatetimeNamedIncrementerFactory.createNamedMonthIncrementer(source) ??
    DatetimeIncrementerFactory.createInvalidDateTimeRepeatFormatter(source) ??
    IncrementerFactory.createPrefixedRadixIncrementer(source) ??
    IncrementerFactory.createSpacePaddedNumericIncrementer(source) ??
    IncrementerFactory.createNumericIncrementer(source) ??
    IncrementerFactory.createNonAsciiDecimalIncrementer(source) ??
    IncrementerFactory.createChineseNumericIncrementer(source) ??
    IncrementerFactory.createCharacterIncrementer(source) ??
    IncrementerFactory.createOnlyRepeatFormatter(source)
  );
}
