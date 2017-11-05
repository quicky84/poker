import { best_hand } from './poker';

function handle(input: string): string {
    const bh = best_hand(input);
    return bh === null
        ? "Invalid input"
        : `Hand: ${bh.hand} Deck: ${bh.deck} Best hand: ${bh.best}`;
}

const args = process.argv.slice(2);

if (args.length !== 0) {
    // if we got some arguments
    console.log(
        handle(args.join(' '))
    );
} else {
    // demo regime
    const inputs = [
        "TH JH QC QD QS QH KH AH 2S 6S",
        "2H 2S 3H 3S 3C 2D 3D 6C 9C TH",
        "2H 2S 3H 3S 3C 2D 9C 3D 6C TH",
        "2H AD 5H AC 7H AH 6H 9H 4H 3C",
        "AC 2D 9C 3S KD 5S 4D KS AS 4C",
        "KS AH 2H 3C 4H KC 2C TC 2D AS",
        "AH 2C 9S AD 3C QH KS JS JD KD",
        "6C 9C 8C 2D 7C 2H TC 4C 9S AH",
        "3D 5S 2H QD TD 6S KH 9H AD QH",
    ];

    inputs.map(input=> console.log(handle(input)));
}
