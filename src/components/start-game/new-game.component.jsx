import React, { useEffect, useRef, useState } from "react";
import { CardCode } from "../cardCode";
import { UseFetchCreateDeck, useFetchDrawCards } from "../useFetch";

import "./new-game.styles.scss";

const cardRankingChecker = (card1, card2) => {
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
          setWinner(`Player 1 Wins  `);
        } else if (count.player1 === count.player2) {
          setWinner(`Draw `);
        } else {
          setWinner(`Player 2 Wins  `);
        }
      }
    }
  };
  console.log(count);

  return (
    <div className="newStart">
      <div className={`center-screen ${showWinner ? "screen-blur" : ""} `}>
        <div className="player1">
          <h1 className="title">Player 1</h1>
          <hr className="divider" />
          <div className="card-draw">{Array.isArray(TwoCard) && <img src={TwoCard[0].image} alt="card" />}</div>
        </div>

        <div className="start">
          <h2>Remaining Cards : {remaining}</h2>
          <button onClick={DrawCard} className="playCard">
            Play a card
          </button>
        </div>

        <div className="player2">
          <h1 className="title">Player 2</h1>
          <hr className="divider" />
          <div className="card-draw">{Array.isArray(TwoCard) && <img src={TwoCard[1].image} alt="card" />} </div>
        </div>
      </div>

      <div className={`playerWins ${showWinner ? "" : "hidden"} `}>
        <h1>{showWinner}</h1>
      </div>
    </div>
  );
}

export default NewGame;
