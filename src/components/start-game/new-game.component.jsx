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
  const [readName, setReadName] = useState({
    player1: "",
    player2: "",
  });
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
          setWinner(`${readName.player1} Wins`);
        } else if (count.player1 === count.player2) {
          setWinner(`Draw `);
        } else {
          setWinner(`${readName.player2} Wins`);
        }
      }
    }
  };

  const playerName = (e) => {
    e.preventDefault();
    console.log(e.target.player1.value);
    const { player1, player2 } = e.target;
    if ((player1.value === "") | (player2.value === "")) {
      alert("player1 or player2 don't have a name");
    }
    setReadName({
      player1: player1.value,
      player2: player2.value,
    });
  };

  return (
    <div className="newStart">
      <div className={`center-screen ${showWinner ? "screen-blur" : ""} ${readName.player1 ? "" : "screen-blur"}  `}>
        <div className="player1">
          <h1 className="title">
            {readName.player1} <span className={`showScore ${count.player1 ? "" : "hidden"}`}>+{count.player1}</span>
          </h1>
          <hr className="divider" />
          <div className="card-draw">{Array.isArray(TwoCard) && <img src={TwoCard[0].image} alt="card" />}</div>
        </div>

        <div className="start">
          <h2 className="countRounds">{remaining / 2} rounds left</h2>
          <button onClick={DrawCard} className="playCard">
            Play a card
          </button>
        </div>

        <div className="player2">
          <h1 className="title">
            {readName.player2} <span className={`showScore ${count.player2 ? "" : "hidden"}`}>+{count.player2}</span>
          </h1>
          <hr className="divider" />
          <div className="card-draw">{Array.isArray(TwoCard) && <img src={TwoCard[1].image} alt="card" />} </div>
        </div>
      </div>

      <div className={`playerWins ${showWinner ? "" : "hidden"} `}>
        <h1>{showWinner}</h1>
      </div>

      <div className={`${readName.player1 ? "hidden" : ""} playerWins `}>
        <form onSubmit={playerName} className="playerName">
          <input
            type="text"
            name="player1"
            placeholder="Player 1"
            className="inputPlayerName"
            autoCapitalize="true"
            autoComplete="off"
          />
          <input
            type="text"
            name="player2"
            placeholder="Player 2"
            className="inputPlayerName"
            autoCapitalize="true"
            autoComplete="off"
          />
          <button type="submit" className="playCard btnPlayerName">
            Play The Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewGame;
