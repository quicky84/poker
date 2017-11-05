import test from 'ava';

import {parse} from './deck52';
import {hand_value, Combination} from './combinations';

test("Invalid input", t=> {
    const cards = parse("KH TH 9H QH")!;
    const value = hand_value(cards);

    t.is(value, null);
});

test("Find Straight Flush", t=> {
    const cards = parse("KH TH 9H QH JH")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.STRAIGHT_FLUSH);
});

test("Find Four of a Kind", t=> {
    const cards = parse("KH KD 9H KS KC")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.FOUR_OF_A_KIND);
});

test("Find Full house", t=> {
    const cards = parse("KH KD 9H KS 9C")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.FULL_HOUSE);
});

test("Find Flush", t=> {
    const cards = parse("KH TH 9H 6H AH")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.FLUSH);
});

test("Find regular Straight", t=> {
    const cards = parse("KH QC 9S JH TC")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.STRAIGHT);
});

test("Find Baby-Straight", t=> {
    const cards = parse("AH 2C 3S 5H 4C")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.STRAIGHT);
});

test("Find Three of a Kind", t=> {
    const cards = parse("AH 2C AS 5H AC")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.THREE_OF_A_KIND);
});

test("Find Two Pairs", t=> {
    const cards = parse("AH 2D 3S AH 2C")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.TWO_PAIRS);
});

test("Find Pair", t=> {
    const cards = parse("AH 8D 3S AH 2C")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.ONE_PAIR);
});

test("Find Highest Card", t=> {
    const cards = parse("AH 8D 3S QH 2C")!;
    const value = hand_value(cards)!;

    t.is(value.combination, Combination.HIGHEST_CARD);
});

// Order between combinations does not have to be tested because
// base values for different combinations are so far apart
// that for any particular hand forming some combnation
// cards constituting the combination do not have enough value
// to get larger than the base value of any other higher combination
// => Only intra order must be tested

test("Intra order: Highest Card", t=> {
    const
        cards1 = parse("6H 7H 8D 9C QH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("2H 3S 4D 5H KH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: One Pair", t=> {
    const
        cards1 = parse("2H 6H 8D JC JH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("3H 6S 8D JD JH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: Two Pairs", t=> {
    const
        cards1 = parse("2H QH QD JC JH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("3H QS QD JD JH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: Three of a Kind 1", t=> {
    // y z x x x
    const
        cards1 = parse("2H QH QD QC JH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("3H QH QD QS JH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: Three of a Kind 2", t=> {
    // z x x x y
    const
        cards1 = parse("3H QH QD QC KH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("3H QH QD QS AH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: Three of a Kind 2", t=> {
    // x x x y z
    const
        cards1 = parse("QH JH JD JC AH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("KH JH JD JS AH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: Fullhouse", t=> {
    const
        cards1 = parse("QH QS QD JC JH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("QH QH QD AD AH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: Four of a Kind", t=> {
    const
        cards1 = parse("JC JD QD JS JH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("JC JD AD JS JH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: Flush", t=> {
    const
        cards1 = parse("2H 3H 8H JH QH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("2H 3H TH JH QH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1 < value2);
});

test("Intra order: Straight", t=> {
    const
        cards1 = parse("9H TH 8H QC JH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("KH TS 9D QH JH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1<value2);
});

test("Intra order: Straight Flush", t=> {
    const
        cards1 = parse("9H TH 8H QH JH")!,
        {combination: _1, value: value1} = hand_value(cards1)!,
        cards2 = parse("KH TH 9H QH JH")!,
        {combination: _2, value: value2} = hand_value(cards2)!;

    t.true(value1<value2);
});
