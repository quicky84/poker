import test from 'ava';

import * as Deck from './deck52';

test("Parse of invalid input", t => {
    const s = "KS K";
    const cards = Deck.parse(s);

    t.is(cards, null);
});

test("Parses string (1 card) to cards", t=> {
    const s = "KS";
    const cards = Deck.parse(s);

    t.not(cards, null);

    t.is(cards![0].face, Deck.Face.KING);
    t.is(cards![0].suit, Deck.Suit.SPADES);
});

test("Parses string (many card) to cards", t=> {
    const s = "TH JH QC";
    const cards = Deck.parse(s);

    t.not(cards, null);

    t.is(cards![0].face, Deck.Face.TEN);
    t.is(cards![0].suit, Deck.Suit.HEARTS);

    t.is(cards![1].face, Deck.Face.JACK);
    t.is(cards![1].suit, Deck.Suit.HEARTS);

    t.is(cards![2].face, Deck.Face.QUEEN);
    t.is(cards![2].suit, Deck.Suit.CLUBS);
});

test("Stringify one card", t=> {
    const card: Deck.Card = {face: Deck.Face.KING, suit: Deck.Suit.SPADES};
    t.is(Deck.stringify(card), 'KS');
});

test("Stringify many cards", t=> {
    const cards: Deck.Card[] =[
        {face: Deck.Face.TEN, suit: Deck.Suit.HEARTS},
        {face: Deck.Face.JACK, suit: Deck.Suit.HEARTS},
        {face: Deck.Face.QUEEN, suit: Deck.Suit.CLUBS},
    ];

    t.is(Deck.stringify(cards), 'TH JH QC');
});

test("Cards order", t=> {
    const
        c1: Deck.Card = {face: Deck.Face.TEN, suit: Deck.Suit.HEARTS},
        c2: Deck.Card = {face: Deck.Face.JACK, suit: Deck.Suit.HEARTS},
        c3: Deck.Card = {face: Deck.Face.QUEEN, suit: Deck.Suit.CLUBS};

    t.is(Deck.order(c1, c2), -1);
    t.is(Deck.order(c3, c1), 1);
});

test("Same suit", t=> {
    const
    c1: Deck.Card = {face: Deck.Face.TEN, suit: Deck.Suit.HEARTS},
    c2: Deck.Card = {face: Deck.Face.JACK, suit: Deck.Suit.HEARTS},
    c3: Deck.Card = {face: Deck.Face.QUEEN, suit: Deck.Suit.CLUBS};

    t.true(Deck.same_suit(c1, c2));
    t.false(Deck.same_suit(c2, c3));
});
