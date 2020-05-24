import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { blue, gray, red } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { deleteDeck } from '../actions';
import { removeEntry } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer : {
    borderColor : 'black',
    backgroundColor: "#ebf5f4",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 4
  },
  button: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    backgroundColor: "aliceblue",
  },
  title: {
    fontSize: 30,
    color: "#34455c",
  },
  cardText: {
    alignItems: "center",
    color: blue,
    fontSize: 22,
    textAlign: "center",
  },
  dltBtnStyle: {
    flex: 1,
    borderRadius: 30,
    height:40,
    width: 100,
    marginTop: 15,
  }
});

const IndividualDeck = ({ id, title, totalNumOfCards, decks, dispatch }) => {

  const navigation = useNavigation();

  const handleOnClick = () => {
    navigation.navigate("DeckCard", {
      id,
      name: id
    });
  };

  const removeCard = () => {
    dispatch(deleteDeck(id));
    removeEntry(id);
  }

  return (
    <View style={styles.container}>
      <Card title={title} titleStyle={styles.title} containerStyle={styles.cardContainer}>
        <TouchableOpacity style={styles.button} onPress={handleOnClick}>
          {totalNumOfCards > 0 ? (
            <Text style={styles.cardText}>
             {totalNumOfCards} cards
            </Text>
          ) : (
            <Text style={{ color: red }}> Please add cards</Text>
          )}
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button icon={
                    <Icon
                      name="trash"
                      size={25}
                      color="white"
                    />
                  }
            type="solid"
            buttonStyle={[styles.dltBtnStyle, { backgroundColor: "#f03043" }]}
            onPress={removeCard}
          />
        </View>
      </Card>
    </View>
  );
};

const mapStateToProps = (decks, { id }) => {
  return {
    id,
    title: decks[id].title,
    totalNumOfCards: decks[id].questions.length,
    decks
  };
};

export default connect(mapStateToProps)(IndividualDeck);
