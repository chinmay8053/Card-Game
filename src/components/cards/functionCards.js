export const shuffleTheCards = (Cards) => {
  Cards.cards.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return Cards;
};

export const drawTwoCardsFromAllCards = (Cards) => {
  if (Cards.cards.length === 0) return Cards;
  Cards.remaining = Cards.cards.length - 2;
  return { cards: [Cards.cards.pop(), Cards.cards.pop()], success: Cards.success, remaining: Cards.remaining };
};

export const CheckRemainingCards = (Cards) => {
  if (Cards.remaining === 0) {
    Cards.success = false;
  }
  return Cards;
};
