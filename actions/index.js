import { FETCH_DECKS, ADD_CARD_TO_DECK, CREATE_DECK, REMOVE_DECK } from "../constants";
import { createADeck, addCard, removeEntry } from '../utils/api';
import { handleAddDeck } from '../utils/helper';

export const fetchInitialDeck = (decks) => {
  return {
    type: FETCH_DECKS,
    decks,
  };
};

export const createDeck = (deckTitle) => {
  let newDeck = handleAddDeck(deckTitle);
  createADeck(newDeck);
  return {
    type: CREATE_DECK,
    newDeck,
  };
};

export const addCardToDeck = ({deckId, question, answer}) => {
  addCard(deckId,question,answer);
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    question,
    answer,
  };
};

export const deleteDeck = (deckId) => {
  removeEntry(deckId);
  return {
    type: REMOVE_DECK,
    deckId
  }
;}
