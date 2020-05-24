import React from 'react'
import PropTypes from 'prop-types'
import {Text, View , StyleSheet, TouchableOpacity} from 'react-native';
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

const Answer = (props) => {
    const {toggleAnswerFn, deck , index} = props;
    const answer = deck.questions[index].answer;
    return (
        <View style={styles.container} >
          <Card containerStyle={[styles.cardContainer, styles.container]}>
            <Text style={styles.cardText} >
              {answer}
            </Text>
            <View style={styles.buttonContainer}>
              <Button 
                title="Hide Answer"
                titleStyle={{marginRight : 15,marginLeft : 15}}
                type="solid"
                buttonStyle={[styles.ansBtnStyle, { backgroundColor: "#820952" }]}
                onPress={props.toggleAnswerFn}
              />
            </View>
            
          </Card>
        </View>
    )
}

Answer.propTypes = {
  toggleAnswerFn : PropTypes.func.isRequired,
  deck : PropTypes.object.isRequired,
  index : PropTypes.number.isRequired
}

export default Answer
