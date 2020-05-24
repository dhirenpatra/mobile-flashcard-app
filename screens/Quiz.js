import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Card, ListItem, Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import Answer from './Answer';
import Question from './Question';

const Quiz = (props) => {
    const {id, deck , index} = props;
    const question = deck.questions[index].question;

    const [toggleAnswer, setToggleAnswer] = useState(false);    
    const toggleAnswerFn = () => {
      setToggleAnswer(!toggleAnswer);
    }

    return (
        <View >
          {
            toggleAnswer ? 
              <Answer deck={deck} toggleAnswerFn={toggleAnswerFn} index={index} /> : 
              <Question id={id} deck={deck} toggleAnswerFn={toggleAnswerFn} index={index} />
            }
        </View>
    )
}

Quiz.propTypes = {
  deck : PropTypes.object.isRequired,
  index : PropTypes.number.isRequired
}

export default Quiz
