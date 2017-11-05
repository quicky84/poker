import * as Deck from './poker/deck52';
import {Combination, hand_value, HandValue, better_hand} from './poker/combinations';

enum Loc { DECK, HAND }

interface CardEx {
    card: Deck.Card;
    loc: Loc;
}

function summarize(cards: CardEx[], prefix: string = ""): string {
    let hand = prefix;
    let from = prefix;
    for(let card of cards) {
        const h_ = Deck.stringify(card.card);
        const f_ = `${new Array(h_.length-1).join(' ')}`;
        hand = `${hand}${h_} `;
        from = `${from}${f_}${card.loc === Loc.DECK ? ' D': ' H'} `;
    }
    return `${hand}\n${from}`;
}

function optimize(keep: CardEx[], consider: CardEx[], budget: number, log: boolean = false): HandValue {
    // `consider` is sorted w.r.t. the face
    if(log){
        const prefix = new Array(keep.length).join('- ');
        console.log(
            `===================\n` +
            `${prefix}Keep:\n${summarize(keep, prefix)}\n` +
            `${prefix}Consider:\n${summarize(consider, prefix)}` +
            `\n${prefix}Budget: ${budget}\n`
        );
    }

    if(keep.length === 5) {
        // keep contains 5 valid cards => hand_value is well-deined
        const {combination, value} = hand_value(keep.map(card_ex=> card_ex.card))!;
        if(log){
            console.log(`>>> Hand: ${summarize(keep)}\n>>> ${combination} of ${value}\n`);
        }
        return {combination, value};
    }

    // variable to hold the best hand
    // initialize it with the negative value,
    // so any other combination will be better
    let bh: HandValue = { combination: Combination.HIGHEST_CARD, value: -1 };

    for(let i = 0; i < consider.length; i++) {
        const next = consider[i];
        const kept = keep.length;
        if (kept !== 0) {
            const prev = keep[kept-1];
            if (Deck.order(prev.card, next.card) > 0) {
                // face value of the prev card is larger than the one of the next
                continue;
            }
        }
        // Guarantee:
        // face value either the same or increased
        // suit may change arbitrarily

        if (next.loc === Loc.HAND && budget === 0) {
            // we have already kept enough cards from the hand
            continue;
        }
        // Guarantee: we are not keeping in hand more than budget

        const some_hand =
            optimize(
                [...keep, next],
                consider.slice(i+1),
                budget - (next.loc === Loc.HAND ? 1 : 0),
                log
            );

        bh = better_hand(bh, some_hand);
    }

    return bh;
}


function best_hand(input: string): {hand: string, deck: string, best: string} | null {
    const ten_cards = Deck.parse(input);
    if (ten_cards === null) {
        return null;
    }

    const
        hand = ten_cards.slice(0, 5).map((c): CardEx=> ({card: c, loc: Loc.HAND})),
        deck = ten_cards.slice(5, 10).map((c): CardEx=> ({card: c, loc: Loc.DECK}));

    // variable to hold the best hand
    // initialize it with the negative value,
    // so any other combination will be better
    let bh: HandValue = { combination: Combination.HIGHEST_CARD, value: -1 };

    for (let n = 0; n <= deck.length; n++){
        const hand_ex = n === 0
            ? [...hand]
            : [...hand, ...deck.slice(0, n)];

        // sort cards from lowest to highest by value
        hand_ex.sort((a, b)=> Deck.order(a.card, b.card));
        // console.log(`On hand:\n${summarize(hand_ex)}`);

        const some_hand = optimize([], hand_ex, 5 - n);

        bh = better_hand(bh, some_hand);
    }

    return {
        hand: Deck.stringify(hand.map(c=> c.card)),
        deck: Deck.stringify(deck.map(c=> c.card)),
        best: bh.combination
    };
}

export { best_hand, Deck };
