import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {Text, View , StyleSheet, TouchableOpacity} from 'react-native';
import { Card, AirbnbRating , Divider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { removeNotification } from '../utils/notification';

const styles = StyleSheet.create({
  cardContainer : {
    backgroundColor: "#ebf5f4",
  },
  title: {
    fontSize: 30,
    color: "#34455c",
  },
  cardText: {
    alignItems: "center",
    color: "#0c6136",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10
  },
  ansBtnStyle: {
    height:40,
    width: "auto",
    marginTop: 15,
  },
  sideBySide : {
    flexDirection : 'row',
    justifyContent: 'space-around',
    marginTop : 30,
    marginBottom: 10
  }
});

const ScoreCard = props => {
  
  const navigation = useNavigation();
  
  const {correct, total, id, title, retake} = props;

  useEffect(() => {
    removeNotification();
  });

  const retakeQuiz = () => {
    retake();
    navigation.navigate('Quiz', {
      name : title,
      id
    });
  }

  const goBack = () => {
    removeNotification();
    navigation.navigate('DeckCard', {
      id,
      name: id
    });
  }

  const calculateRating = (correct, total) => {
    return correct === 0 ? 1 :  Math.round( ( correct / total ) * 5 );
  }

  const resultText = correct === total ?
                  "Awesome All Answered Correctly..." :
                  `You have answered ${correct} out of ${total} correctly.`

  
  const getStyle = () => {
    const result = calculateRating(correct, total);
    if(result < 2) {
      return '#a82222';
    } else if (  result > 2 && result <= 3) {
      return '#b39934';
    } else if (result > 3) {
      return '#1c9c49';
    }
  }

  return (
      <View>
        <AirbnbRating
          count={5}
          isDisabled={true}
          reviews={['Needs Improvement', 'Average', 'Good', 'Excellent', 'Outstanding']}
          reviewColor={getStyle()}
          selectedColor={getStyle()}
          defaultRating={calculateRating(correct, total)}
          size={25}
        />
        <Divider style={{margin : 20}}/>
        <TouchableOpacity>
          <Card title="Your Result" titleStyle={styles.title} containerStyle={styles.cardContainer}>
            <Text style={styles.cardText}>
              {resultText}
            </Text>
            <View style={styles.sideBySide}>
             <Button 
                title="Retake Quiz"
                type="clear"
                buttonStyle={[styles.ansBtnStyle, styles.sideBySide]}
                onPress={retakeQuiz}
              />
              <Button 
                title="Go Back"
                type="clear"
                buttonStyle={[styles.ansBtnStyle, styles.sideBySide]}
                onPress={goBack}
              />
            </View>
          </Card>
        </TouchableOpacity>
      </View>
  )
}

ScoreCard.propTypes = {
  correct: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  id : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
  retake : PropTypes.func.isRequired 
}

export default ScoreCard
