import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { gray, white } from "../utils/colors";
import { connect } from "react-redux";
import { Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    marginBottom: 20,
  },
  card: {
    width: 350,
    height: 350,
    backgroundColor: "#c3d2e8",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  noOfCards: {
    fontSize: 20,
    color: gray,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
  },
});

class DeckCard extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  addCard = () => {
    const { id } = this.props.route.params;
    this.props.navigation.navigate("AddCard", {
      id,
    });
  };

  startQuiz = () => {
    let { id } = this.props.route.params;
    this.props.navigation.navigate("Quiz", {
      name: this.props.decks[id].title,
      id,
    });
  };

  render() {
    const { id } = this.props.route.params;
    const deck = this.props.decks[id];
    const totalNumOfCards = deck.questions.length;
    const { opacity } = this.state;
    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <Card title={deck.title} containerStyle={styles.card}>
          <Text style={styles.noOfCards}>{totalNumOfCards} Cards</Text>
          <Button
            title="Add Card"
            icon={<Icon name="plus-square" size={35} color="white" />}
            type="solid"
            buttonStyle={[
              styles.btn,
              { backgroundColor: "#166644" },
              { marginTop: 45 },
            ]}
            onPress={this.addCard}
            titleStyle={{ marginLeft: 25 }}
          />
          <Button
            title="Start Quiz"
            icon={
              totalNumOfCards !== 0 && (
                <FontAwesome5 name="hand-point-right" size={35} color="white" />
              )
            }
            type="solid"
            disabled={totalNumOfCards === 0}
            buttonStyle={[
              styles.btn,
              { backgroundColor: "#456982" },
              { marginTop: 10 },
            ]}
            onPress={this.startQuiz}
            titleStyle={{ marginLeft: 25 }}
          />
        </Card>
      </Animated.View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckCard);
