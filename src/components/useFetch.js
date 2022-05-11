import axios from "axios";

const UseFetchCreateDeck = async () => {
  const fetchPromise = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  const fetchData = fetchPromise.data;
  return fetchData;
};
const useFetchDrawCards = async (cardId) => {
  const fetchPromise = await axios.get(`https://deckofcardsapi.com/api/deck/${cardId}/draw/?count=2`);
  const fetchData = fetchPromise.data;
  return fetchData;
};

export { UseFetchCreateDeck, useFetchDrawCards };
