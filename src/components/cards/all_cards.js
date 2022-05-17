import { CardCode } from "../cardCode";

export const AllCards = {
  success: true,
  remaining: 52,
  cards: CardCode.map((code) => {
    return { image: `https://deckofcardsapi.com/static/img/${code}.png`, code };
  }),
};
