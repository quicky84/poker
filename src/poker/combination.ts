/**
 * This module defines Poker combinations and attaches values
 * to every particular combination, so that both inter and
 * intra combination orders are respected.
 *
 * E.g. value_two_pairs < value_one_pair and
 *      queen-straight < king-straight
 */
import { Card, Face, order } from './deck52';

enum Combination {
    STRAIGHT_FLUSH  = 'staright-flush',
    FOUR_OF_A_KIND  = 'four-of-a-kind',
    FULL_HOUSE      = 'full-house',
    FLUSH           = 'flush',
    STRAIGHT        = 'straight',
    THREE_OF_A_KIND = 'three-of-a-kind',
    TWO_PAIRS       = 'two-pairs',
    ONE_PAIR        = 'one-pair',
    HIGHEST_CARD    = 'highest-card'
}

const STRAIGHT_FLUSH  = 8000000;
const FOUR_OF_A_KIND  = 7000000;
const FULL_HOUSE      = 6000000;
const FLUSH           = 5000000;
const STRAIGHT        = 4000000;
const THREE_OF_A_KIND = 3000000;
const TWO_PAIRS       = 2000000;
const ONE_PAIR        = 1000000;

// Hand must be sorted
function value_straight_flush(h: Card[]) {
    return STRAIGHT_FLUSH + value_highest(h);
}

function value_flush(h: Card[]) {
    return FLUSH + value_highest(h);
}

function value_straight(h: Card[]) {
    return STRAIGHT + value_highest(h);
}

function value_four_of_a_kind(h: Card[]) {
    // x x x x y
    // y x x x x
    // z x x x x
    let v = FOUR_OF_A_KIND + 14*h[2].face;
    if (h[2].face === h[0].face) {
        // x x x x y
        v += h[4].face;
    } else {
        // h[2].face = h[4].face
        // y x x x x
        v += h[0].face;
    }
    return v;
}

function value_full_house(h: Card[]) {
    // x x x y y
    // x x x z z
    // x x y y y
    let v = FULL_HOUSE + 14*h[2].face;
    if (h[2].face === h[1].face) {
        // x x x y y
        v += h[3].face;
    } else {
        // h[2].face === h[3].face
        // y y x x x
        v += h[1].face;
    }
    return v;
}

function value_three_of_a_kind(h: Card[]) {
    // x x x y p
    // x x x z k
    // z x x x k
    let v = THREE_OF_A_KIND + 14*14*h[2].face;
    if (h[0].face === h[1].face && h[1].face === h[2].face) {
        // x x x y z
        v += (h[3].face + 14*h[4].face);
    } else
    if (h[1].face === h[2].face && h[2].face === h[3].face) {
        // z x x x y
        v += (h[0].face + 14*h[4].face);
    } else {
        // y z x x x
        v += (h[0].face + 14*h[1].face);
    }

    return v;
}

// value = TWO_PAIRS + 14*14*HighPairCard + 14*LowPairCard + UnmatchedCard
function value_two_pairs(h: Card[]) {
    let v = TWO_PAIRS;

    if (h[0].face === h[1].face && h[2].face === h[3].face) {
        v += (14*14*h[2].face + 14*h[0].face + h[4].face);
    } else
    if (h[0].face === h[1].face && h[3].face === h[4].face) {
        v += (14*14*h[3].face + 14*h[0].face + h[2].face);
    } else {
        v += (14*14*h[3].face + 14*h[1].face + h[0].face);
    }

    return  v;
}

// value = ONE_PAIR + 14^3*PairCard + 14^2*HighestCard + 14*MiddleCard + LowestCard
function value_one_pair(h: Card[]) {
    let v = ONE_PAIR;

    if (h[0].face === h[1].face) {
        v += (14*14*14*h[0].face + h[2].face + 14*h[3].face + 14*14*h[4].face);
    } else
    if (h[1].face === h[2].face) {
        v += (14*14*14*h[1].face + h[0].face + 14*h[3].face + 14*14*h[4].face);
    } else
    if (h[2].face === h[3].face) {
        v += (14*14*14*h[2].face + h[0].face + 14*h[1].face + 14*14*h[4].face);
    } else {
        v += (14*14*14*h[3].face + h[0].face + 14*h[1].face + 14*14*h[2].face);
    }

    return v;
}

// value =  14^4*highestCard + 14^3*2ndHighestCard + 14^2*3rdHighestCard + 14^1*4thHighestCard + LowestCard
function value_highest(h: Card[]): number {
    return h.reduce((v: number, _: Card, i: number)=> (v + 14**i*h[i].face), 0);
}

function is_four_of_a_kind(h: Card[]): boolean {
    if( h[0].face === h[1].face && h[1].face === h[2].face && h[2].face === h[3].face ){
        // x x x x y
        return true;
    }
    if( h[1].face === h[2].face && h[2].face === h[3].face && h[3].face === h[4].face ){
        // y x x x x
        return true;
    }
    return false;
}

function is_full_house(h: Card[]): boolean {
    if (h[0].face === h[1].face && h[1].face === h[2].face && h[3].face === h[4].face) {
        // x x x y y
        return true;
    }
    if (h[0].face === h[1].face && h[2].face === h[3].face && h[3].face === h[4].face) {
        // x x y y y
        return true;
    }
    return false;
}

// IMPORTANT: triple and four_kind may be true simultaneously
// IMPORTANT: triple and full_house may be true simultaneously
function is_three_of_a_kind(h: Card[]): boolean {
    if (h[0].face === h[1].face && h[1].face === h[2].face) {
        // x x x y y
        return true;
    }
    if (h[1].face === h[2].face && h[2].face === h[3].face) {
        // y x x x y
        return true;
    }
    if (h[2].face === h[3].face && h[3].face === h[4].face) {
        // y y x x x
        return true;
    }
    return false;
}

function is_two_pairs(h: Card[]): boolean {
    if (h[0].face === h[1].face && h[2].face === h[3].face) {
        // x x y y z
        return true;
    }
    if (h[1].face === h[2].face && h[3].face === h[4].face) {
        // z x x y y
        return true;
    }
    if (h[0].face === h[1].face && h[3].face === h[4].face) {
        // x x z y y
        return true;
    }
    return false;
}

function is_one_pair(h: Card[]): boolean {
    if (h[0].face === h[1].face) {
        // x x y k z
        return true;
    }
    if (h[1].face === h[2].face) {
        // z x x k y
        return true;
    }
    if (h[2].face === h[3].face) {
        // z k x x y
        return true;
    }
    if (h[3].face === h[4].face) {
        // k y z x x
        return true;
    }
    return false;
}

function is_flush(h: Card[]): boolean {
    return h[0].suit === h[1].suit && h[1].suit === h[2].suit && h[2].suit === h[3].suit && h[3].suit === h[4].suit;
}

function is_straight(h: Card[]): boolean {
    // Straight 2 3 4 5 A
    if (h[0].face === Face.TWO && h[1].face === Face.THREE && h[2].face === Face.FOUR &&
        h[3].face === Face.FIVE && h[4].face === Face.ACE) {
            return true;
    }
    // otherwise, the difference in faces between concequent catds must be 1
    return h.slice(1)
            .map((c, i)=> c.face - h[i].face)
            .every(d=> d===1);
}


type HandValue = {combination: Combination, value: number};

function hand_value(cards: Card[]): HandValue | null {
    if (cards.length !== 5) {
        return null;
    }

    // copy cards
    const h: Card[] = [];
    for(let card of cards) {
        h.push({
            face: card.face,
            suit: card.suit
        });
    }

    h.sort((a, b)=> order(a, b));

    if ( is_flush(h) && is_straight(h) )
        { return {combination: Combination.STRAIGHT_FLUSH, value: value_straight_flush(h)}; }
    else if ( is_four_of_a_kind(h) )
        { return {combination: Combination.FOUR_OF_A_KIND, value: value_four_of_a_kind(h) }; }
    else if ( is_full_house(h) )
        { return {combination: Combination.FULL_HOUSE, value: value_full_house(h) }; }
    else if ( is_flush(h) )
        { return {combination: Combination.FLUSH, value: value_flush(h)}; }
    else if ( is_straight(h) )
        { return {combination: Combination.STRAIGHT, value: value_straight(h)}; }
    else if ( is_three_of_a_kind(h) )
        { return {combination: Combination.THREE_OF_A_KIND, value: value_three_of_a_kind(h)}; }
    else if ( is_two_pairs(h) )
        { return {combination: Combination.TWO_PAIRS, value: value_two_pairs(h)}; }
    else if ( is_one_pair(h) )
        { return {combination: Combination.ONE_PAIR, value: value_one_pair(h)}; }
    else
        { return {combination: Combination.HIGHEST_CARD, value: value_highest(h)}; }
}

export { Combination, HandValue, hand_value};
