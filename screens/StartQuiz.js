import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text, View , StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Card, Divider, Button } from 'react-native-elements';
import Quiz from './Quiz';
import ScoreCard from './ScoreCard';
import { ANSWERED_CORRECTLY, ANSWERED_INCORRECTLY } from '../constants';

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  cardContainer : {
    borderColor : 'black',
    backgroundColor: "#ebf5f4",
  },
  title: {
    fontSize: 30,
    color: "#34455c",
  },
  cardText: {
    alignItems: "center",
    color: "#224744",
    fontSize: 22,
    textAlign: "center",
  },
  ansBtnStyle: {
    borderRadius: 10,
    height:40,
    width: 100,
    marginTop: 15,
  },
  sideBySide : {
    flexDirection : 'row',
    justifyContent: 'space-around'
  }
});

class StartQuiz extends Component {

    state = {
      currentQuestion : 0,
      correct : 0,
      incorect : 0,
      opacity : new Animated.Value(0)
    }

    componentDidMount() {
    const { opacity } = this.state;
    Animated.timing( opacity, 
      { 
        toValue: 1,
        duration: 1000,
      }).start();
  }

    markAnswer = (mark) => {
      const {correct, incorect, currentQuestion} = this.state;
      if(mark === "correct") {
        this.setState({
          correct : this.state.correct + 1
        });
      } else {
        this.setState({
          incorect : this.state.incorect + 1
        });
      }
      this.setState({
        currentQuestion : currentQuestion + 1
      });
    }

    reStart = () => {
      this.setState({
        currentQuestion : 0,
        correct : 0,
        incorect : 0
      });
    }

    render() {
      const { id, deck } = this.props;
      const qlength = deck.questions.length;
      const { currentQuestion, correct, incorect, opacity } = this.state;
      return (
          <Animated.View style={[styles.container, {opacity}]}>
          {
            currentQuestion >= qlength ? 
            <ScoreCard correct={correct} total={qlength} retake={this.reStart} title={deck.title} id={id}/> :
            <Card title={deck.title} titleStyle={styles.title} containerStyle={styles.cardContainer}>
              <Text style={styles.cardText}> Question {currentQuestion + 1} out of {qlength} </Text>
              <Divider style={{ backgroundColor: 'green' }} />
              <Quiz 
                id={id} 
                deck={deck}
                index={currentQuestion}
              />
              <View style={styles.sideBySide}>
                <Button 
                  title="Correct"
                  type="solid"
                  buttonStyle={[styles.ansBtnStyle, styles.sideBySide]}
                  onPress={() => this.markAnswer(ANSWERED_CORRECTLY)}
                />
                <Button 
                  title="InCorrect"
                  type="solid"
                  buttonStyle={[styles.ansBtnStyle, styles.sideBySide]}
                  onPress={() => this.markAnswer(ANSWERED_INCORRECTLY)}
                />
              </View>
            </Card>
            }
          </Animated.View>
      )
    }
}

const mapStateToProps = (decks, {route}) => {
  const { id } = route.params;
  return {
    deck : decks[id],
    id
  }
}

export default connect(mapStateToProps)(StartQuiz);
