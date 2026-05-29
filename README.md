# README

## Insert Numbers Ex for Visual Studio Code

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23ea4aaa)](https://github.com/sponsors/almiraj/)

An extension to insert increasing numbers.

![Demo](./images/demo.gif)

## Usage

* Command: `Insert Numbers Ex`
* Keybindings: `ctrl+alt+n` on Windows and Linux or `cmd+alt+n` on macOS

## Thanks

Thanks to Asuka for the original [Insert Numbers](https://marketplace.visualstudio.com/items?itemName=Asuka.insertnumbers) extension, which I have long loved.

This project is a small tribute to that work.

## Examples

num : `0`, `1`, `01`, `[ 8]`
```text
0    1    01    [ 8]
1    2    02    [ 9]
2    3    03    [10]
3    4    04    [11]
...
```

pre/suf : `1.`, `1_`, `(1)`
```text
1.    1_    (1)
2.    2_    (2)
3.    3_    (3)
4.    4_    (4)
...
```

radix : `0b01`, `0o06`, `0x0e`, `0X08`
```text
0b01     0o06    0x0e    0X08
0b10     0o07    0x0f    0X09
0b11     0o10    0x10    0X0A
0b100    0o11    0x11    0X0B
...
```

locale : `１`, `١`, `१`, `一`, `①`, `Ⅰ`
```text
１    ١    १    一    ①    Ⅰ
２    ٢    २    二    ②    Ⅱ
３    ٣    ३    三    ③    Ⅲ
４    ٤    ४    四    ④    Ⅳ
...
```

alpha : `a`, `A`, `α`, `а`, `å`
```text
a    A    α    а    å
b    B    β    б    ä
c    C    γ    в    ö
d    D    δ    г    a
...
```

char : `あ`, `ア`, `ｱ`, `子`, `가`
```text
あ    ア    ｱ    子    가
い    イ    ｲ    丑    나
う    ウ    ｳ    寅    다
え    エ    ｴ    卯    라
...
```

m/d : `04/29`, `4/29`, `12/30`
```text
04/29    4/29    12/30
04/30    4/30    12/31
05/01    5/1     01/01
05/02    5/2     01/02
...
```

y/m : `2026/11`, `2026/8`, `202611`
```text
2026/11    2026/8     202611
2026/12    2026/9     202612
2027/01    2026/10    202701
2027/02    2026/11    202702
...
```

y/m/d : `2026/12/30`, `2026/4/29`, `20261230`
```text
2026/12/30    2026/4/29    20261230
2026/12/31    2026/4/30    20261231
2027/01/01    2026/5/1     20270101
2027/01/02    2026/5/2     20270102
...
```

m/d/y : `04/29/2026`, `4/29/2026`, `12/30/2026`
```text
04/29/2026    4/29/2026    12/30/2026
04/30/2026    4/30/2026    12/31/2026
05/01/2026    5/1/2026     01/01/2027
05/02/2026    5/2/2026     01/02/2027
...
```

m/y : `11/2026`, `8/2026`
```text
11/2026    8/2026
12/2026    9/2026
01/2027    10/2026
02/2027    11/2026
...
```

alpha-m : `Nov`, `NOV`, `November`, `Sep`, `Sept`
```text
Nov    NOV    November    Sep    Sept
Dec    DEC    December    Oct    Oct
Jan    JAN    January     Nov    Nov
Feb    FEB    February    Dec    Dec
...
```

alpha-m/y : `Nov/2026`, `Nov 2026`
```text
Nov/2026    Nov 2026
Dec/2026    Dec 2026
Jan/2027    Jan 2027
Feb/2027    Feb 2027
...
```

alpha-m/d : `Dec/30`, `Dec 30`
```text
Dec/30    Dec 30
Dec/31    Dec 31
Jan/1     Jan 1
Jan/2     Jan 2
...
```

alpha-m/d/y : `Dec/30/2026`, `Dec 30 2026`, `Dec 30, 2026`
```text
Dec/30/2026    Dec 30 2026    Dec 30, 2026
Dec/31/2026    Dec 31 2026    Dec 31, 2026
Jan/1/2027     Jan 1 2027     Jan 1, 2027
Jan/2/2027     Jan 2 2027     Jan 2, 2027
...
```

time : `23:58`, `23:59:58`
```text
23:58    23:59:58
23:59    23:59:59
00:00    00:00:00
00:01    00:00:01
...
```

datetime : `12/31 23:58`, `2026/12/31 23:58`, `2026-12-31 23:59:58`
```text
12/31 23:58    2026/12/31 23:58    2026-12-31 23:59:58
12/31 23:59    2026/12/31 23:59    2026-12-31 23:59:59
01/01 00:00    2027/01/01 00:00    2027-01-01 00:00:00
01/01 00:01    2027/01/01 00:01    2027-01-01 00:00:01
...
```

range loop : `01~3`, `[ 8]~10`, `A~3`
```text
01    [ 8]    A
02    [ 9]    B
03    [10]    C
01    [ 8]    A
02    [ 9]    B
03    [10]    C
01    [ 8]    A
02    [ 9]    B
03    [10]    C
...
```

repeat : `01*3`, `[ 8]*3`, `A*2`
```text
01    [ 8]    A
01    [ 8]    A
01    [ 8]    B
02    [ 9]    B
02    [ 9]    C
02    [ 9]    C
03    [10]    D
03    [10]    D
03    [10]    E
04    [11]    E
04    [11]    F
04    [11]    F
...
```

repeat range loop : `01*2~5`, `[ 8]*3~10`, `A*2~5`
```text
01    [ 8]    A
01    [ 8]    A
02    [ 8]    B
02    [ 9]    B
03    [ 9]    C
03    [ 9]    C
04    [10]    D
04    [10]    D
05    [10]    E
05    [ 8]    E
01    [ 8]    A
01    [ 8]    A
02    [ 9]    B
02    [ 9]    B
03    [ 9]    C
03    [10]    C
...
```
