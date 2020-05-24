const handleAddDeck = (newDeck) => {
  const key = newDeck.split(" ").join("");
  const addADeck = {
    title : key,
    questions : []
  }
  return addADeck;
}

const removeByKey = (state, deleteKey) => {
  return Object.keys(state)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = state[current];
      return result;
  }, {});
}

export { 
  removeByKey,
  handleAddDeck
}; 