const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

const { detectIncrementer } = require("../dist/incrementer-facade.js");

function incrementFor(source, count) {
  const incrementer = detectIncrementer(source);
  assert.ok(incrementer, `Expected "${source}" to be supported`);
  const values = [];
  for (let index = 0; index < count; index += 1) {
    values.push(incrementer(index));
  }
  return values;
}

describe("README examples", () => {
  const examples = [
    ["0", ["0", "1", "2", "3"]],
    ["1", ["1", "2", "3", "4"]],
    ["01", ["01", "02", "03", "04"]],
    [" 8", [" 8", " 9", "10", "11"]],
    ["[ 8]", ["[ 8]", "[ 9]", "[10]", "[11]"]],
    ["1.", ["1.", "2.", "3.", "4."]],
    ["1_", ["1_", "2_", "3_", "4_"]],
    ["(1)", ["(1)", "(2)", "(3)", "(4)"]],
    ["0b01", ["0b01", "0b10", "0b11", "0b100"]],
    ["0o06", ["0o06", "0o07", "0o10", "0o11"]],
    ["0x0e", ["0x0e", "0x0f", "0x10", "0x11"]],
    ["0X08", ["0X08", "0X09", "0X0A", "0X0B"]],
    ["１", ["１", "２", "３", "４"]],
    ["٠", ["٠", "١", "٢", "٣"]],
    ["०", ["०", "१", "२", "३"]],
    ["一", ["一", "二", "三", "四"]],
    ["①", ["①", "②", "③", "④"]],
    ["Ⅰ", ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"]],
    ["a", ["a", "b", "c", "d"]],
    ["A", ["A", "B", "C", "D"]],
    ["α", ["α", "β", "γ", "δ"]],
    ["а", ["а", "б", "в", "г"]],
    ["å", ["å", "ä", "ö", "a"]],
    ["あ", ["あ", "い", "う", "え"]],
    ["ア", ["ア", "イ", "ウ", "エ"]],
    ["ｱ", ["ｱ", "ｲ", "ｳ", "ｴ"]],
    ["子", ["子", "丑", "寅", "卯"]],
    ["가", ["가", "나", "다", "라"]],
    ["04/29", ["04/29", "04/30", "05/01", "05/02"]],
    ["4/29", ["4/29", "4/30", "5/1", "5/2"]],
    ["2026/11", ["2026/11", "2026/12", "2027/01", "2027/02"]],
    ["2026/8", ["2026/8", "2026/9", "2026/10", "2026/11"]],
    ["202611", ["202611", "202612", "202701", "202702"]],
    ["2026/12/30", ["2026/12/30", "2026/12/31", "2027/01/01", "2027/01/02"]],
    ["2026/4/29", ["2026/4/29", "2026/4/30", "2026/5/1", "2026/5/2"]],
    ["20261230", ["20261230", "20261231", "20270101", "20270102"]],
    ["12/30", ["12/30", "12/31", "01/01", "01/02"]],
    ["04/29/2026", ["04/29/2026", "04/30/2026", "05/01/2026", "05/02/2026"]],
    ["4/29/2026", ["4/29/2026", "4/30/2026", "5/1/2026", "5/2/2026"]],
    ["12/30/2026", ["12/30/2026", "12/31/2026", "01/01/2027", "01/02/2027"]],
    ["11/2026", ["11/2026", "12/2026", "01/2027", "02/2027"]],
    ["8/2026", ["8/2026", "9/2026", "10/2026", "11/2026"]],
    ["Nov", ["Nov", "Dec", "Jan", "Feb"]],
    ["NOV", ["NOV", "DEC", "JAN", "FEB"]],
    ["November", ["November", "December", "January", "February"]],
    ["Sep", ["Sep", "Oct", "Nov", "Dec"]],
    ["Sept", ["Sept", "Oct", "Nov", "Dec"]],
    ["Nov/2026", ["Nov/2026", "Dec/2026", "Jan/2027", "Feb/2027"]],
    ["Nov 2026", ["Nov 2026", "Dec 2026", "Jan 2027", "Feb 2027"]],
    ["Dec 30", ["Dec 30", "Dec 31", "Jan 1", "Jan 2"]],
    ["Dec 30, 2026", ["Dec 30, 2026", "Dec 31, 2026", "Jan 1, 2027", "Jan 2, 2027"]],
    ["23:58", ["23:58", "23:59", "00:00", "00:01"]],
    ["23:59:58", ["23:59:58", "23:59:59", "00:00:00", "00:00:01"]],
    [
      "2026/12/31 23:59:58",
      ["2026/12/31 23:59:58", "2026/12/31 23:59:59", "2027/01/01 00:00:00", "2027/01/01 00:00:01"]
    ],
    [
      "2026-12-31 23:59:58",
      ["2026-12-31 23:59:58", "2026-12-31 23:59:59", "2027-01-01 00:00:00", "2027-01-01 00:00:01"]
    ],
    ["01~3", ["01", "02", "03", "01", "02", "03", "01", "02", "03"]],
    ["[ 8]~10", ["[ 8]", "[ 9]", "[10]", "[ 8]", "[ 9]", "[10]", "[ 8]", "[ 9]", "[10]"]],
    ["A~3", ["A", "B", "C", "A", "B", "C"]],
    ["01*3", ["01", "01", "01", "02", "02", "02", "03", "03", "03", "04", "04", "04"]],
    ["[ 8]*3", ["[ 8]", "[ 8]", "[ 8]", "[ 9]", "[ 9]", "[ 9]", "[10]", "[10]", "[10]", "[11]", "[11]", "[11]"]],
    ["A*2", ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F"]],
    ["1*2~5", ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "1", "1", "2", "2", "3", "3"]],
    ["[ 8]*3~10", ["[ 8]", "[ 8]", "[ 8]", "[ 9]", "[ 9]", "[ 9]", "[10]", "[10]", "[10]", "[ 8]", "[ 8]", "[ 8]"]],
    ["A*2~5", ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "A", "A", "B", "B", "C", "C"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, expected.length), expected);
    });
  }
});

describe("numberic", () => {
  const examples = [
    ["8", ["8", "9", "10", "11"]],
    ["08", ["08", "09", "10", "11"]],
    [" 8", [" 8", " 9", "10", "11"]],
    [" 98", [" 98", " 99", "100", "101"]],
    ["[ 8]", ["[ 8]", "[ 9]", "[10]", "[11]"]],
    ["98", ["98", "99", "100", "101"]],
    ["098", ["098", "099", "100", "101"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("prefixed radix numbers", () => {
  const examples = [
    ["0b10", ["0b10", "0b11", "0b100", "0b101"]],
    ["0B10", ["0B10", "0B11", "0B100", "0B101"]],
    ["[0b10]", ["[0b10]", "[0b11]", "[0b100]", "[0b101]"]],
    ["0O06", ["0O06", "0O07", "0O10", "0O11"]],
    ["[0o06]", ["[0o06]", "[0o07]", "[0o10]", "[0o11]"]],
    ["0x0E", ["0x0E", "0x0F", "0x10", "0x11"]],
    ["0X0E", ["0X0E", "0X0F", "0X10", "0X11"]],
    ["[0x0e]", ["[0x0e]", "[0x0f]", "[0x10]", "[0x11]"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }

  it("formats a longer sequence across hexadecimal digits (lower case)", () => {
    assert.deepEqual(incrementFor("0x0e", 17), [
      "0x0e",
      "0x0f",
      "0x10",
      "0x11",
      "0x12",
      "0x13",
      "0x14",
      "0x15",
      "0x16",
      "0x17",
      "0x18",
      "0x19",
      "0x1a",
      "0x1b",
      "0x1c",
      "0x1d",
      "0x1e"
    ]);
  });

  it("formats a longer sequence across hexadecimal digits (upper case)", () => {
    assert.deepEqual(incrementFor("0x0E", 17), [
      "0x0E",
      "0x0F",
      "0x10",
      "0x11",
      "0x12",
      "0x13",
      "0x14",
      "0x15",
      "0x16",
      "0x17",
      "0x18",
      "0x19",
      "0x1A",
      "0x1B",
      "0x1C",
      "0x1D",
      "0x1E"
    ]);
  });

  it("formats leading-zero numbers as decimal", () => {
    assert.deepEqual(incrementFor("0100", 4), ["0100", "0101", "0102", "0103"]);
    assert.deepEqual(incrementFor("0007", 4), ["0007", "0008", "0009", "0010"]);
  });
});

describe("japanese numberic", () => {
  const examples = [
    ["０", ["０", "１", "２", "３"]],
    ["１", ["１", "２", "３", "４"]],
    ["０１", ["０１", "０２", "０３", "０４"]],
    ["８", ["８", "９", "１０", "１１"]],
    ["１８", ["１８", "１９", "２０", "２１"]],
    ["９８", ["９８", "９９", "１００", "１０１"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("non-ASCII decimal numberic", () => {
  const examples = [
    ["٠", ["٠", "١", "٢", "٣"]],
    ["٠١", ["٠١", "٠٢", "٠٣", "٠٤"]],
    ["٨", ["٨", "٩", "١٠", "١١"]],
    ["١٨", ["١٨", "١٩", "٢٠", "٢١"]],
    ["٩٨", ["٩٨", "٩٩", "١٠٠", "١٠١"]],
    ["۰", ["۰", "۱", "۲", "۳"]],
    ["۰۱", ["۰۱", "۰۲", "۰۳", "۰۴"]],
    ["۸", ["۸", "۹", "۱۰", "۱۱"]],
    ["۱۸", ["۱۸", "۱۹", "۲۰", "۲۱"]],
    ["۹۸", ["۹۸", "۹۹", "۱۰۰", "۱۰۱"]],
    ["०", ["०", "१", "२", "३"]],
    ["०१", ["०१", "०२", "०३", "०४"]],
    ["८", ["८", "९", "१०", "११"]],
    ["१८", ["१८", "१९", "२०", "२१"]],
    ["९८", ["९८", "९९", "१००", "१०१"]],
    ["০", ["০", "১", "২", "৩"]],
    ["০১", ["০১", "০২", "০৩", "০৪"]],
    ["৮", ["৮", "৯", "১০", "১১"]],
    ["১৮", ["১৮", "১৯", "২০", "২১"]],
    ["৯৮", ["৯৮", "৯৯", "১০০", "১০১"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("Chinese numeric", () => {
  const examples = [
    ["一", ["一", "二", "三", "四"]],
    ["九", ["九", "十", "十一", "十二"]],
    ["十", ["十", "十一", "十二", "十三"]],
    ["二十五", ["二十五", "二十六", "二十七", "二十八"]],
    ["九十九", ["九十九", "百", "百一", "百二"]],
    ["百", ["百", "百一", "百二", "百三"]],
    ["百九十八", ["百九十八", "百九十九", "二百", "二百一"]],
    ["九百九十八", ["九百九十八", "九百九十九", "一", "二"]],
    ["第九章", ["第九章", "第十章", "第十一章", "第十二章"]],
    ["第九章 第十節", ["第九章 第十節", "第十章 第十節", "第十一章 第十節", "第十二章 第十節"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, expected.length), expected);
    });
  }
});

describe("avoid parsing as Chinese numeric", () => {
  const examples = [
    ["一百", ["一百", "一百", "一百", "一百"]],
    ["一百二", ["一百二", "一百二", "一百二", "一百二"]],
    ["一十", ["一十", "一十", "一十", "一十"]],
    ["一十二", ["一十二", "一十二", "一十二", "一十二"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, expected.length), expected);
    });
  }
});

describe("parsing as date (hyphenation)", () => {
  const examples = [
    ["04-29", ["04-29", "04-30", "05-01", "05-02"]],
    ["4-29", ["4-29", "4-30", "5-1", "5-2"]],
    ["2026-11", ["2026-11", "2026-12", "2027-01", "2027-02"]],
    ["2026-8", ["2026-8", "2026-9", "2026-10", "2026-11"]],
    ["2026-12-30", ["2026-12-30", "2026-12-31", "2027-01-01", "2027-01-02"]],
    ["2026-4-29", ["2026-4-29", "2026-4-30", "2026-5-1", "2026-5-2"]],
    ["12-30", ["12-30", "12-31", "01-01", "01-02"]],
    ["04-29-2026", ["04-29-2026", "04-30-2026", "05-01-2026", "05-02-2026"]],
    ["4-29-2026", ["4-29-2026", "4-30-2026", "5-1-2026", "5-2-2026"]],
    ["12-30-2026", ["12-30-2026", "12-31-2026", "01-01-2027", "01-02-2027"]],
    ["11-2026", ["11-2026", "12-2026", "01-2027", "02-2027"]],
    ["8-2026", ["8-2026", "9-2026", "10-2026", "11-2026"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("parsing as date (Zero Padding Spec)", () => {
  const examples = [
    ["4/29", ["4/29", "4/30", "5/1", "5/2"]],
    ["04/29", ["04/29", "04/30", "05/01", "05/02"]],
    ["12/30", ["12/30", "12/31", "01/01", "01/02"]],
    ["2026/04", ["2026/04", "2026/05", "2026/06", "2026/07"]],
    ["04/2026", ["04/2026", "05/2026", "06/2026", "07/2026"]],
    ["4/2026", ["4/2026", "5/2026", "6/2026", "7/2026"]],
    ["11/2026", ["11/2026", "12/2026", "01/2027", "02/2027"]],
    ["1:58", ["1:58", "1:59", "2:00", "2:01"]],
    ["01:58", ["01:58", "01:59", "02:00", "02:01"]],
    ["23:59:58", ["23:59:58", "23:59:59", "00:00:00", "00:00:01"]],
    ["20261230", ["20261230", "20261231", "20270101", "20270102"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("parsing as date (Zero Padding Spec 2)", () => {
  const examples = [
    ["2026/09", ["2026/09", "2026/10", "2026/11", "2026/12","2027/01"]],
    ["9/2026", ["9/2026", "10/2026", "11/2026", "12/2026", "1/2027"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 5), expected);
    });
  }
});

describe("parsing month names as date", () => {
  const examples = [
    ["Nov", ["Nov", "Dec", "Jan", "Feb"]],
    ["November", ["November", "December", "January", "February"]],
    ["nov", ["nov", "dec", "jan", "feb"]],
    ["NOV", ["NOV", "DEC", "JAN", "FEB"]],
    ["Apr", ["Apr", "May", "Jun", "Jul"]],
    ["Sep", ["Sep", "Oct", "Nov", "Dec"]],
    ["Sept", ["Sept", "Oct", "Nov", "Dec"]],
    ["Nov/2026", ["Nov/2026", "Dec/2026", "Jan/2027", "Feb/2027"]],
    ["November/2026", ["November/2026", "December/2026", "January/2027", "February/2027"]],
    ["Nov 2026", ["Nov 2026", "Dec 2026", "Jan 2027", "Feb 2027"]],
    ["Nov-2026", ["Nov-2026", "Dec-2026", "Jan-2027", "Feb-2027"]],
    ["2026/Nov", ["2026/Nov", "2026/Dec", "2027/Jan", "2027/Feb"]],
    ["2026 November", ["2026 November", "2026 December", "2027 January", "2027 February"]],
    ["Nov 30", ["Nov 30", "Dec 1", "Dec 2", "Dec 3"]],
    ["30 Nov", ["30 Nov", "1 Dec", "2 Dec", "3 Dec"]],
    ["30-Nov", ["30-Nov", "1-Dec", "2-Dec", "3-Dec"]],
    ["Nov-30", ["Nov-30", "Dec-1", "Dec-2", "Dec-3"]],
    ["Apr 30", ["Apr 30", "May 1", "May 2", "May 3"]],
    ["Nov 30, 2026", ["Nov 30, 2026", "Dec 1, 2026", "Dec 2, 2026", "Dec 3, 2026"]],
    ["Nov 30 2026", ["Nov 30 2026", "Dec 1 2026", "Dec 2 2026", "Dec 3 2026"]],
    ["30 Nov 2026", ["30 Nov 2026", "1 Dec 2026", "2 Dec 2026", "3 Dec 2026"]],
    ["2026 Nov 30", ["2026 Nov 30", "2026 Dec 1", "2026 Dec 2", "2026 Dec 3"]],
    ["Dec 31, 2026", ["Dec 31, 2026", "Jan 1, 2027", "Jan 2, 2027", "Jan 3, 2027"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("parsing month names as date (for Sept)", () => {
  const examples = [
    ["Sep", ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]],
    ["Sept", ["Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct"]],
    ["Sep 2026", ["Sep 2026", "Oct 2026", "Nov 2026", "Dec 2026", "Jan 2027", "Feb 2027", "Mar 2027", "Apr 2027", "May 2027", "Jun 2027", "Jul 2027", "Aug 2027", "Sep 2027", "Oct 2027"]],
    ["Sept 2026", ["Sept 2026", "Oct 2026", "Nov 2026", "Dec 2026", "Jan 2027", "Feb 2027", "Mar 2027", "Apr 2027", "May 2027", "Jun 2027", "Jul 2027", "Aug 2027", "Sept 2027", "Oct 2027"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 14), expected);
    });
  }
});

describe("parsing month names as date (for Zero Padding)", () => {
  const examples = [
    ["Nov 09", ["Nov 09", "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19", "Nov 20", "Nov 21", "Nov 22", "Nov 23", "Nov 24", "Nov 25", "Nov 26", "Nov 27", "Nov 28", "Nov 29", "Nov 30", "Dec 01"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, expected.length), expected);
    });
  }
});

describe("exceptionally parses dates with a trailing space", () => {
  const examples = [
    ["2026/12/30 ", ["2026/12/30 ", "2026/12/31 ", "2027/01/01 ", "2027/01/02 "]],
    ["2026-12-30 ", ["2026-12-30 ", "2026-12-31 ", "2027-01-01 ", "2027-01-02 "]],
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("characterSets sequences with prefix/suffix", () => {
  const examples = [
    ["ｱ)", ["ｱ)", "ｲ)", "ｳ)", "ｴ)"]],
    ["_ｱ", ["_ｱ", "_ｲ", "_ｳ", "_ｴ"]],
    ["(ｱ)", ["(ｱ)", "(ｲ)", "(ｳ)", "(ｴ)"]],
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("validates Unicode-ordered characterSet sequences", () => {
  const unicodeOrderedStartChars = [
    "①",
    "Ⅰ",
    "a",
    "A",
    "ａ",
    "Ａ",
    "α",
    "Α",
    "あ",
    "ア",
    "가"
  ];

  for (const startChar of unicodeOrderedStartChars) {
    it(`keeps sequence from ${startChar} in Unicode order`, () => {
      const incrementer = detectIncrementer(startChar);
      assert.ok(incrementer, `Expected "${startChar}" to be supported`);

      const codePoints = [incrementer(0).codePointAt(0)];
      let looped = false;
      for (let index = 1; index <= 100; index += 1) {
        const char = incrementer(index);
        if (char === startChar) {
          looped = true;
          break;
        }

        codePoints.push(char.codePointAt(0));
      }

      assert.ok(looped, `Expected "${startChar}" sequence to loop within 100 increments`);
      for (let index = 1; index < codePoints.length; index += 1) {
        assert.ok(codePoints[index - 1] < codePoints[index]);
      }
    });
  }
});

describe("characterSets loops", () => {
  const examples = [
    ["㉙", ["㉙", "㉚", "①", "②"]],
    ["Ⅺ", ["Ⅺ", "Ⅻ", "Ⅰ", "Ⅱ"]],
    ["y", ["y", "z", "a", "b"]],
    ["Y", ["Y", "Z", "A", "B"]],
    ["ｙ", ["ｙ", "ｚ", "ａ", "ｂ"]],
    ["Ｙ", ["Ｙ", "Ｚ", "Ａ", "Ｂ"]],
    ["ω", ["ω", "α", "β", "γ"]],
    ["Ω", ["Ω", "Α", "Β", "Γ"]],
    ["ь", ["ь", "ю", "я", "а"]],
    ["Ь", ["Ь", "Ю", "Я", "А"]],
    ["å", ["å", "ä", "ö", "a"]],
    ["Å", ["Å", "Ä", "Ö", "A"]],
    ["を", ["を", "ん", "あ", "い"]],
    ["ヲ", ["ヲ", "ン", "ア", "イ"]],
    ["ｦ", ["ｦ", "ﾝ", "ｱ", "ｲ"]],
    ["戌", ["戌", "亥", "子", "丑"]],
    ["타", ["타", "파", "하", "가"]]
  ];

  for (const [source, expected] of examples) {
    it(`loops ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), expected);
    });
  }
});

describe("detection order", () => {
  const examples = [
    ["1a", "2a"],
    ["11a", "12a"],
    ["a1", "a2"],
    ["０1", "０2"],
    ["０１01", "０１02"],
    ["【０１】", "【０２】"],
    ["[1【０１】", "[2【０１】"],
    ["0１", "1１"],
    ["01１", "02１"],
    ["1a", "2a"],
    ["٠a", "١a"],
    ["۰a", "۱a"],
    ["०a", "१a"],
    ["০a", "১a"],
    ["１۰", "２۰"],
    ["１০", "２০"],
    ["٠１", "١１"],
    ["۰１", "۱１"],
    ["०１", "१１"],
    ["০１", "১１"],
    ["a１", "a２"],
    ["a٠", "a١"],
    ["a۰", "a۱"],
    ["a०", "a१"],
    ["a০", "a১"],
    ["Ⅰa", "Ⅱa"],
    ["aⅠ", "bⅠ"],
    ["aＡ", "bＡ"],
    ["Ａa", "Ｂa"]
  ];

  for (const [source, expected] of examples) {
    it(`increments the first detected target in ${source}`, () => {
      const incrementer = detectIncrementer(source);
      assert.ok(incrementer, `Expected "${source}" to be supported`);
      assert.equal(incrementer(1), expected);
    });
  }
});

describe("programmatic numeric", () => {
  const examples = [
    ["1~3", ["1", "2", "3", "1", "2", "3", "1", "2", "3"]],
    ["1~5", ["1", "2", "3", "4", "5", "1", "2", "3", "4", "5", "1"]],
    ["0~3", ["0", "1", "2", "3", "0", "1", "2", "3", "0"]],
    ["1~0", ["1", "0", "1", "0", "1", "0"]],
    ["2~3", ["2", "3", "2", "3", "2", "3"]],
    ["3~1", ["3", "2", "1", "3", "2", "1"]],
    ["01~3", ["01", "02", "03", "01", "02", "03", "01", "02", "03"]],
    ["01~5", ["01", "02", "03", "04", "05", "01", "02", "03", "04", "05", "01"]],
    ["00~3", ["00", "01", "02", "03", "00", "01", "02", "03", "00"]],
    ["00~03", ["00", "01", "02", "03", "00", "01", "02", "03", "00"]],
    ["05~02", ["05", "04", "03", "02", "05", "04", "03", "02", "05"]],
    ["[ 8]~10", ["[ 8]", "[ 9]", "[10]", "[ 8]", "[ 9]", "[10]", "[ 8]"]],
    ["[ 8]~010", ["[ 8]", "[ 9]", "[10]", "[ 8]", "[ 9]", "[10]", "[ 8]"]],
    ["1*3", ["1", "1", "1", "2", "2", "2", "3", "3", "3"]],
    ["1*5", ["1", "1", "1", "1", "1", "2", "2", "2", "2", "2", "3", "3", "3", "3", "3"]],
    ["0*3", ["0", "0", "0", "1", "1", "1", "2", "2", "2"]],
    ["01*2", ["01", "01", "02", "02", "03", "03", "04", "04"]],
    ["01*3", ["01", "01", "01", "02", "02", "02", "03", "03", "03", "04", "04", "04"]],
    ["00*3", ["00", "00", "00", "01", "01", "01", "02", "02", "02", "03", "03", "03"]],
    ["00*03", ["00", "00", "00", "01", "01", "01", "02", "02", "02", "03", "03", "03"]],
    ["00*[3]", ["00", "00", "00", "01", "01", "01", "02", "02", "02", "03", "03", "03"]],
    ["[ 8]*2", ["[ 8]", "[ 8]", "[ 9]", "[ 9]", "[10]", "[10]", "[11]", "[11]"]],
    ["[ 8]*3", ["[ 8]", "[ 8]", "[ 8]", "[ 9]", "[ 9]", "[ 9]", "[10]", "[10]", "[10]", "[11]", "[11]", "[11]"]],
    ["[ 8]*03", ["[ 8]", "[ 8]", "[ 8]", "[ 9]", "[ 9]", "[ 9]", "[10]", "[10]", "[10]", "[11]", "[11]", "[11]"]],
    ["[ 8]*[3]", ["[ 8]", "[ 8]", "[ 8]", "[ 9]", "[ 9]", "[ 9]", "[10]", "[10]", "[10]", "[11]", "[11]", "[11]"]],
    ["05*3~02", ["05", "05", "05", "04", "04", "04", "03", "03", "03", "02", "02", "02", "05", "05", "05", "04"]],
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, expected.length), expected);
    });
  }
});

describe("programmatic character", () => {
  const examples = [
    ["A~3", ["A", "B", "C", "A", "B", "C", "A"]],
    ["あ~3", ["あ", "い", "う", "あ", "い", "う", "あ"]],
    ["Y~4", ["Y", "Z", "A", "B", "Y", "Z", "A", "B"]],
    ["A*3", ["A", "A", "A", "B", "B", "B", "C", "C"]],
    ["A*2~3", ["A", "A", "B", "B", "C", "C", "A", "A"]]
  ];

  for (const [source, expected] of examples) {
    it(`formats ${source}`, () => {
      assert.deepEqual(incrementFor(source, expected.length), expected);
    });
  }
});

describe("fallback: date-like input", () => {
  const examples = [
    "[2026/04]",
    "_2026/04",
    "2026/04_",
    "202613",
    "20269",
    "2026/13/29",
    "13/29/2026",
    "4/32/2026",
    "041/29",
    "4/32",
    "13/30",
    "2026/13",
    "13/2026",
    "1:1",
    "23:1",
    "23:1:1",
    "1:59:58",
    "23:59:1",
    "23:59:60",
    "23:60:58",
    "24:59:58",
    "23:60",
    "2026/13/30 23:59:58",
    "2026/04/30 23:59:60",
    "2026-13-30 23:59:58",
    "2026-04-30 23:59:60",
    "20260229",
    "10000/04/29"
  ];

  for (const source of examples) {
    it(`repeats unsupported date input ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), [source, source, source, source]);
    });
  }
});

describe("fallback: invalid programmatic input", () => {
  const examples = [
    "~",
    "~~",
    "*",
    "**",
    "~*",
    "*~",
    "1~",
    "~1",
    " ~1",
    "1*",
    "1*0",
    "*1",
    " *1",
    "1~3*2",
    "1~3~2",
    "1~~3",
    "1**3",
    "1~*3",
    "1*~3",
    "1*3*2",
    "1*3~2~1",
    "1*3~2*1",
    "1~ 3",
    "1~3 ",
    "1~x3",
    "1~3x",
    "00~[3]",
    "[ 8]~[10]",
    "1*3~ 5",
    "1*3~x5",
    "1*3~5x",
    "[ 8]*3~[10]",
    "(a)~3",
    "Nov~3",
    "Nov*3",
    "foo*bar",
    "A~Z",
    "4/9*2",
    "2026-04-29*2",
    "11/2026~2",
    "00:00*2"
  ];

  for (const source of examples) {
    it(`repeats invalid programmatic input ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), [source, source, source, source]);
    });
  }
});

describe("fallback: unsupported non-empty input", () => {
  const examples = [
    "-",
    "---",
    "\t",
    "_",
    "@",
    "'",
    "\""
  ];

  for (const source of examples) {
    it(`repeats unsupported input ${source}`, () => {
      assert.deepEqual(incrementFor(source, 4), [source, source, source, source]);
    });
  }
});
