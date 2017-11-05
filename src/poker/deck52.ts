enum Face {
    TWO = 2, THREE = 3, FOUR = 4, FIVE = 5, SIX = 6, SEVEN = 7, EIGHT = 8,
    NINE = 9, TEN = 10, JACK = 11, QUEEN = 12, KING = 13, ACE = 14
}

enum Suit {CLUBS, DIAMONDS, HEARTS, SPADES}

interface Card {
    face: Face;
    suit: Suit;
}

function parse_value(c: string): Face | null {
    // c is expected to be one charachter
    switch (c) {
        case '2':
            return Face.TWO;
        case '3':
            return Face.THREE;
        case '4':
            return Face.FOUR;
        case '5':
            return Face.FIVE;
        case '6':
            return Face.SIX;
        case '7':
            return Face.SEVEN;
        case '8':
            return Face.EIGHT;
        case '9':
            return Face.NINE;
        case 'T':
            return Face.TEN;
        case 'J':
            return Face.JACK;
        case 'Q':
            return Face.QUEEN;
        case 'K':
            return Face.KING;
        case 'A':
            return Face.ACE;
        default:
            return null;
    }
}

function parse_suit(s: string): Suit | null {
    switch (s) {
        case 'C':
            return Suit.CLUBS;
        case 'D':
            return Suit.DIAMONDS;
        case 'H':
            return Suit.HEARTS;
        case 'S':
            return Suit.SPADES;
        default:
            return null;
    }
}


function order(a: Card, b: Card): -1 | 0 | 1 {
    if(a.face < b.face) { return -1; }
    if(a.face > b.face) { return 1; }
    return 0;
}

function same_suit(a: Card, b: Card) {
    return a.suit === b.suit;
}

function parse(input: string): Card[] {
    return input
        .split(' ')
        .map((s): Card => {
            return {
                face: parse_value(s.charAt(0))!,
                suit: parse_suit(s.charAt(1))!,
            };
        });
}

/**
 * Make two-letter representation of the card
 */
function encode(c: Card): string {
    const face = function(f: Face): string | null {
        switch (f) {
            case Face.TWO:
                return '2';
            case Face.THREE:
                return '3';
            case Face.FOUR:
                return '4';
            case Face.FIVE:
                return '5';
            case Face.SIX:
                return '6';
            case Face.SEVEN:
                return '7';
            case Face.EIGHT:
                return '8';
            case Face.NINE:
                return '9';
            case Face.TEN:
                return 'T';
            case Face.JACK:
                return 'J';
            case Face.QUEEN:
                return 'Q';
            case Face.KING:
                return 'K';
            case Face.ACE:
                return 'A';
            default:
                return null;
        }
    };
    const suit = function(s: Suit): string | null {
        switch (s) {
            case Suit.CLUBS:
                return 'C';
            case Suit.DIAMONDS:
                return 'D';
            case Suit.HEARTS:
                return 'H';
            case Suit.SPADES:
                return 'S';
            default:
                return null;
        }
    };

    return `${face(c.face)}${suit(c.suit)}`;
}

export { Face, Suit, Card, parse, encode, order, same_suit };
