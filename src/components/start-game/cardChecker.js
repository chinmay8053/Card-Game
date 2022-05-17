import { CardCode } from "../cardCode";

export const cardRankingChecker = (card1, card2) => {
  let player1, player2;
  CardCode.forEach((code, index) => {
    if (card1 === code) {
      player1 = index;
    }
    if (card2 === code) {
      player2 = index;
    }
  });

  if (player1 < player2) {
    return 1;
  } else {
    return 0;
  }
};
