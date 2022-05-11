import React, { useEffect, useRef, useState } from "react";
import { UseFetchCreateDeck, useFetchDrawCards } from "../useFetch";

import "./new-game.styles.scss";

const cardsCode = [
  "AS",
  "AH",
  "AD",
  "AC",
  "KS",
  "KD",
  "KC",
  "KC",
  "QS",
  "QH",
  "QD",
  "QC",
  "JS",
  "JH",
  "JD",
  "JC",
  "0S",
  "0H",
  "0D",
  "0C",
  "9S",
  "9H",
  "9D",
  "9C",
  "8S",
  "8H",
  "8D",
  "8C",
  "7S",
  "7H",
  "7D",
  "7C",
  "6S",
  "6H",
  "6D",
  "6C",
  "5S",
  "5H",
  "5D",
  "5C",
  "4S",
  "4H",
  "4D",
  "4C",
  "3S",
  "3H",
  "3D",
  "3C",
  "2S",
  "2H",
  "2D",
  "2C",
];

const cardRankingChecker = (card1, card2) => {
  let player1, player2;
  cardsCode.forEach((code, index) => {
    if (card1 === code) {
      player1 = index;
    }
  });
  cardsCode.forEach((code, index) => {
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

function NewGame() {
  let cardId = useRef(null);
  const [TwoCard, setTwoCard] = useState(null);
  const [remaining, setRemaining] = useState(52);
  const [showWinner, setWinner] = useState(null);
  const [count, setCount] = useState({
    player1: 0,
    player2: 0,
  });

  useEffect(() => {
    const asyncFetch = async () => {
      const createDeck = await UseFetchCreateDeck();
      cardId.current = createDeck.deck_id;
    };
    asyncFetch();
  }, [cardId]);

  const DrawCard = async () => {
    const drawTwoCard = await useFetchDrawCards(cardId.current);
    const cards = drawTwoCard.cards;
    if (drawTwoCard.success) {
      setTwoCard(cards);
      setRemaining(drawTwoCard.remaining);
      setCount((prevState) => {
        const player = cardRankingChecker(cards[0].code, cards[1].code);
        console.log(player);
        if (player) {
          return {
            ...count,
            player1: prevState.player1 + 1,
          };
        } else {
          return {
            ...count,
            player2: prevState.player2 + 1,
          };
        }
      });

      if (drawTwoCard.remaining === 0) {
        if (count.player1 > count.player2) {
          setWinner("player 1 wins ");
        } else {
          setWinner("player 2 wins");
        }
      }
    }
  };

  return (
    <div className="newStart">
      <div className="center-screen">
        <div className="player1">
          <h1 className="title">Player 1</h1>
          <hr className="divider" />
          <div className="card-draw">{Array.isArray(TwoCard) && <img src={TwoCard[0].image} alt="card" />}</div>
        </div>

        <div className="start">
          <h2>Remaining : {remaining}</h2>
          <button onClick={DrawCard}>Play a card</button>
          <h1>{showWinner}</h1>
        </div>

        <div className="player2">
          <h1 className="title">Player 2</h1>
          <hr className="divider" />
          <div className="card-draw">{Array.isArray(TwoCard) && <img src={TwoCard[1].image} alt="card" />} </div>
        </div>
      </div>
    </div>
  );
}

export default NewGame;
