import { FETCH_DECKS, ADD_CARD_TO_DECK, CREATE_DECK, REMOVE_DECK } from "../constants";
import { removeByKey } from "../utils/helper";

export default function decks(state = {}, action) {
  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case CREATE_DECK: {
      const { newDeck } = action;
      return {
        ...state,
        [newDeck.title]: newDeck,
      };
    }
    case ADD_CARD_TO_DECK: {
      const newQuestion = {
        question: action.question,
        answer: action.answer,
      };
      return {
        ...state,
        [action.deckId]: {
          title: state[action.deckId].title,
          questions: [...state[action.deckId].questions, newQuestion],
        },
      };
    }
    case REMOVE_DECK : 
      return removeByKey(state, action.deckId);
    
    default:
      return state;
  }
}
