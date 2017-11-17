import * as Deck from './deck52';
import {Combination, hand_value, HandValue} from './combination';

// === Helpers ===>
type Card = Deck.Card;

const better_hand = (h1: HandValue, h2: HandValue): HandValue => {
    return h1.value > h2.value ? h1 : h2;
};
// <===  helpers ===

/**
 * Recursively builds up a hand and scores it
 * @param keep Cards being kept
 * @param consider Cards to consider
 */
function optimize(keep: Card[], consider: Card[]): HandValue {
    if(keep.length === 5) {
        // keep contains 5 valid cards => hand_value is well-defined
        return hand_value(keep)!;
    }

    // variable to hold the best hand
    // initialize it with the negative value,
    // so any other combination will be better
    let bh: HandValue = { combination: Combination.HIGHEST_CARD, value: -1 };

    if (keep.length + consider.length < 5) {
        // there are not enough cards to make up a combination
        return bh;
    }

    for(let i = 0; i < consider.length; i++) {
        const next = consider[i];

        // Build up a better hand by adding cards from `consider`
        // Observe that once the i-th card is added to the hand
        // the only cards to consider are those that come after it,
        // because otherwise we create permutations of the same combination
        const some_hand =
            optimize(
                [...keep, next],
                consider.slice(i+1)
            );

        bh = better_hand(bh, some_hand);
    }

    return bh;
}

/**
 * Computes the best poker hand given a sequence of 10 cards: 5 in hand, 5 in the deck
 * @param input encoded string representation of the cards
 * @returns hand contains cards in hand, deck contains cards in the deck, best is the description of the best hand,
 *          or null if the input is invalid
 */
function best_hand(input: string): {hand: string, deck: string, best: string} | null {
    const cards = Deck.parse(input);
    if (cards === null) {
        // could not parse the input
        return null;
    }

    if (cards.length < 5 || cards.length > 10) {
        // too few cards even for a hand
        return null;
    }

    const
        hand = cards.slice(0, 5),
        deck = cards.slice(5);

    // variable to hold the best hand
    // initialize it with the negative value,
    // so any other combination will be better
    let bh: HandValue = hand_value(hand)!;

    for (let n = 1; n <= deck.length; n++){
        const widow = deck.slice(0, n);
        // build up a hand starting from the widow
        // and adding cards to it
        const some_hand = optimize(widow, hand);

        bh = better_hand(bh, some_hand);
    }

    return {
        hand: Deck.stringify(hand),
        deck: Deck.stringify(deck),
        best: bh.combination
    };
}

export { best_hand, optimize };
