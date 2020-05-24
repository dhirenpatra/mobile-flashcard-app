import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';

const styles = StyleSheet.create({
  cardContainer : {
    backgroundColor: "#ebf5f4",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height:'auto',
  },
  cardText: {
    alignItems: "center",
    color: "#224744",
    fontSize: 25,
    textAlign: "center",
  },
  ansBtnStyle: {
    borderRadius: 30,
    height:40,
    width: "auto",
    marginTop: 15,
  }
});

const Question = (props) => {
    const {id, deck , index, toggleAnswerFn} = props;
    const question = deck.questions[index].question;

    return (
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <TouchableOpacity onPress={toggleAnswerFn}>
              <Text style={styles.cardText}>
                {question}
              </Text>
              <View style={styles.buttonContainer}>
              <Button
                title="Show Answer"
                titleStyle={{marginRight : 15,marginLeft : 15}}
                type="clear"
                buttonStyle={[styles.ansBtnStyle]}
                onPress={toggleAnswerFn}
              />
              </View>
            </TouchableOpacity>
          </Card>
        </View>
    )
}

Question.propTypes = {
  toggleAnswerFn : PropTypes.func.isRequired,
  deck : PropTypes.object.isRequired,
  index : PropTypes.number.isRequired
}

export default Question
