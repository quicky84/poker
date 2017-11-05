The program computes the best possible poker hand
for the problem of the psychic player that has 5 cards
in hand and forsees the next 5 cards in the deck.

To install and run under `NodeJS` environment
```
npm install
npm run start
```
This will run a number of demo cases.

It is possible to provide own input. It must comply
with the (relaxed) rules of the problem:
1. Cards must be correctly encoded
2. At least 5 and up to 10 cards must be provided.
   This is a relaxation. Originally only 10 was accepted.
In all other cases the program will report invalid input.

For example,
```
npm run start TH JH QC QD QS QH KH AH 2S 6S
```