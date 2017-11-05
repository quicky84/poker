enum Face {
    TWO = 2, THREE = 3, FOUR = 4, FIVE = 5, SIX = 6, SEVEN = 7, EIGHT = 8,
    NINE = 9, TEN = 10, JACK = 11, QUEEN = 12, KING = 13, ACE = 14
}

enum Suit {CLUBS, DIAMONDS, HEARTS, SPADES}

interface Card {
    face: Face;
    suit: Suit;
}

function order(a: Card, b: Card): -1 | 0 | 1 {
    if(a.face < b.face) { return -1; }
    if(a.face > b.face) { return 1; }
    return 0;
}

function same_suit(a: Card, b: Card) {
    return a.suit === b.suit;
}

const decode_Face = new Map<string, Face>([
    ['2', Face.TWO],
    ['3', Face.THREE],
    ['4', Face.FOUR],
    ['5', Face.FIVE],
    ['6', Face.SIX],
    ['7', Face.SEVEN],
    ['8', Face.EIGHT],
    ['9', Face.NINE],
    ['T', Face.TEN],
    ['J', Face.JACK],
    ['Q', Face.QUEEN],
    ['K', Face.KING],
    ['A', Face.ACE],
]);
const encode_Face = new Map<Face, string>([
    [Face.TWO, '2'],
    [Face.THREE, '3'],
    [Face.FOUR, '4'],
    [Face.FIVE, '5'],
    [Face.SIX, '6'],
    [Face.SEVEN, '7'],
    [Face.EIGHT, '8'],
    [Face.NINE, '9'],
    [Face.TEN, 'T'],
    [Face.JACK, 'J'],
    [Face.QUEEN, 'Q'],
    [Face.KING, 'K'],
    [Face.ACE, 'A'],
]);
const decode_Suit = new Map<string, Suit>([
    ['C', Suit.CLUBS],
    ['D', Suit.DIAMONDS],
    ['H', Suit.HEARTS],
    ['S', Suit.SPADES],
]);
const encode_Suit = new Map<Suit, string>([
    [Suit.CLUBS, 'C'],
    [Suit.DIAMONDS, 'D'],
    [Suit.HEARTS, 'H'],
    [Suit.SPADES, 'S'],
]);

function decoder(s: string): Card | null {
    // s must be of length 2
    if(s.length !== 2) {
        return null;
    }
    const face = decode_Face.get(s.charAt(0));
    if (face === undefined) {
        return null;
    }
    const suit = decode_Suit.get(s.charAt(1));
    if (suit === undefined) {
        return null;
    }
    return {face, suit};
}

/**
 * Parse string into the cards
 * @returns List of cards or null if the input does not represent a sequence of cards
 */
function parse(input: string): Card[] | null {
    let cards: Card[] = [];
    for(let s of input.split(' ')) {
        const card = decoder(s);
        if (card === null) {
            return null;
        }
        cards = [...cards, card];
    }
    return cards;
}

/**
 * Make two-letter representations of some cards
 */
function stringify(many_or_one: Card | Card[]): string {
    return many_or_one instanceof Array
            ? many_or_one
                .map(c=> `${encode_Face.get(c.face)}${encode_Suit.get(c.suit)}`)
                .join(' ')
            : `${encode_Face.get(many_or_one.face)}${encode_Suit.get(many_or_one.suit)}`;
}

export { Face, Suit, Card, order, same_suit, parse, stringify };
