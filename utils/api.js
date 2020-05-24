import { AsyncStorage } from "react-native";
import { KEY_FOR_DECKS } from "../constants";
import initialData from "./SampleData";

const getInitialData = () => {
  AsyncStorage.setItem(KEY_FOR_DECKS, JSON.stringify(initialData));
  return initialData;
};

export function createADeck(deck) {
  return AsyncStorage.mergeItem(
    KEY_FOR_DECKS,
    JSON.stringify({
      [deck.title]: deck,
    })
  );
}

export async function getAllDecks() {
  AsyncStorage.removeItem(KEY_FOR_DECKS);
  const results = await AsyncStorage.getItem(KEY_FOR_DECKS);
  if (results !== null) {
    return JSON.parse(results);
  } else {
    return getInitialData();
  }
}

export async function removeEntry(key) {
  const results = await AsyncStorage.getItem(KEY_FOR_DECKS);
  const data = JSON.parse(results);
  delete data[key];
  AsyncStorage.setItem(KEY_FOR_DECKS, JSON.stringify(data));
}

export function addCard(deckId, question, answer) {
  AsyncStorage.getItem(KEY_FOR_DECKS).then((result) => {
    const allDecks = JSON.parse(result);
    if (allDecks[deckId] !== undefined) {
      let newQuestion = [
        {
          question,
          answer,
        },
      ];
      newQuestion.concat(allDecks[deckId].questions);
      AsyncStorage.mergeItem(KEY_FOR_DECKS, JSON.stringify(allDecks));
    }
  });
}

export function fetchLatestResults() {
  return AsyncStorage.getItem(KEY_FOR_DECKS).then(JSON.parse);
}

export default getInitialData;
