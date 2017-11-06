import test from 'ava';

import { best_hand, optimize, Loc, CardEx } from './hand';
import { Face, Suit, parse } from './deck52';
import { Combination } from './combination';


test("Invalid input: Can't parse", t=> {
    const input = "TH JH QC Qv QS QH KH AH 2S 6S";
    t.is(best_hand(input), null);
});

test("Invalid input: too few cards", t=> {
    const input = "TH JH QC";
    t.is(best_hand(input), null);
});

test("Invalid input: too many cards", t=> {
    const input = "TH JH QC QD QS QH KH AH 2S 6S 8D";
    t.is(best_hand(input), null);
});

test("Optimize: 1 step, pick best between two possible", t=> {
    const keep = parse("8C 8D 8H 8S")!
        .map((c): CardEx=> ({card: c, loc: Loc.HAND}));
    const consider: CardEx[] = [
        {card: {face: Face.TEN, suit: Suit.CLUBS}, loc: Loc.HAND},
        {card: {face: Face.ACE, suit: Suit.CLUBS}, loc: Loc.DECK},
    ];

    t.is(optimize(keep, consider, 1).combination, Combination.FOUR_OF_A_KIND);
});

test("Optimize: 1 step, pick best between two possible under budget", t=> {
    const keep = parse("AC AD AH KS")!
        .map((c): CardEx=> ({card: c, loc: Loc.HAND}));
    const consider: CardEx[] = [
        {card: {face: Face.KING, suit: Suit.CLUBS}, loc: Loc.DECK},
        {card: {face: Face.ACE, suit: Suit.CLUBS}, loc: Loc.HAND},
    ];

    // ideally one would choose for four of a kind
    // but the budget forces to choose full house

    t.is(optimize(keep, consider, 0).combination, Combination.FULL_HOUSE);
});

test("Best hand computed correctly", t=>{
    const inputs = [
        ["TH JH QC QD QS QH KH AH 2S 6S", "staright-flush"],
        ["2H 2S 3H 3S 3C 2D 3D 6C 9C TH", "four-of-a-kind"],
        ["2H 2S 3H 3S 3C 2D 9C 3D 6C TH", "full-house"],
        ["2H AD 5H AC 7H AH 6H 9H 4H 3C", "flush"],
        ["AC 2D 9C 3S KD 5S 4D KS AS 4C", "straight"],
        ["KS AH 2H 3C 4H KC 2C TC 2D AS", "three-of-a-kind"],
        ["AH 2C 9S AD 3C QH KS JS JD KD", "two-pairs"],
        ["6C 9C 8C 2D 7C 2H TC 4C 9S AH", "one-pair"],
        ["3D 5S 2H QD TD 6S KH 9H AD QH", "highest-card"],
    ];

    inputs.map(([input, best])=> {
        t.is(best_hand(input)!.best, best);
    });
});
