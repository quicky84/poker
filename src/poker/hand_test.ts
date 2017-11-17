import test from 'ava';

import { best_hand, optimize } from './hand';
import { Face, Suit, Card, parse } from './deck52';
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
    const keep = parse("AC AD AH KS")!;
    const consider: Card[] = [
        {face: Face.KING, suit: Suit.CLUBS},
        {face: Face.ACE, suit: Suit.CLUBS},
    ];

    t.is(optimize(keep, consider).combination, Combination.FOUR_OF_A_KIND);
});

test("Full optimize", t=> {
    const input = "2H 3H 4H 5H TC 5C QS KD 2D 6H";

    // two fives, although if unordered a straight flush can be arranged
    t.is(best_hand(input)!.best, Combination.ONE_PAIR);
});


test("Best hand computed correctly", t=> {
    const inputs = [
        ["TH JH QC QD QS QH KH AH 2S 6S", Combination.STRAIGHT_FLUSH],
        ["2H 2S 3H 3S 3C 2D 3D 6C 9C TH", Combination.FOUR_OF_A_KIND],
        ["2H 2S 3H 3S 3C 2D 9C 3D 6C TH", Combination.FULL_HOUSE],
        ["2H AD 5H AC 7H AH 6H 9H 4H 3C", Combination.FLUSH],
        ["AC 2D 9C 3S KD 5S 4D KS AS 4C", Combination.STRAIGHT],
        ["KS AH 2H 3C 4H KC 2C TC 2D AS", Combination.THREE_OF_A_KIND],
        ["AH 2C 9S AD 3C QH KS JS JD KD", Combination.TWO_PAIRS],
        ["6C 9C 8C 2D 7C 2H TC 4C 9S AH", Combination.ONE_PAIR],
        ["3D 5S 2H QD TD 6S KH 9H AD QH", Combination.HIGHEST_CARD],
    ];

    inputs.map(([input, best])=> {
        t.is(best_hand(input)!.best, best);
    });
});
