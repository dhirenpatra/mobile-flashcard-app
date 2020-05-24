import React, { Component } from "react";
import { connect } from "react-redux";

import {
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, Button } from "react-native-elements";

import { addCardToDeck } from "../actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width: 300,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  btn: {
    height: 45,
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#192f8a",
  },
  textInput: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
  },
});

export class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleQuestion = (question) => {
    this.setState({
      question,
    });
  };

  handleAnswer = (answer) => {
    this.setState({
      answer,
    });
  };

  validateForm = () => {
    const { question, answer } = this.state;
    return question === "" || answer === "";
  };

  handleSubmit = () => {
    const { question, answer } = this.state;
    if (question.trim() === "" && answer.trim() === "") {
      this.setState({
        question: "",
        answer: "",
      });
    } else if (question.trim() === "") {
      this.setState({
        question: "",
      });
    } else if (answer.trim() === "") {
      this.setState({
        answer: "",
      });
    } else {
      this.props.dispatch(
        addCardToDeck({
          deckId: this.props.route.params.id,
          question,
          answer,
        })
      );
      this.setState({
        question: "",
        answer: "",
      });
      this.props.navigation.goBack();
    }
  };

  render() {
    const { question, answer, opacity } = this.state;
    return (
      <KeyboardAvoidingView
        style={[styles.container, { opacity }]}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Card title={this.props.route.params.id} containerStyle={styles.card}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.handleQuestion}
            autoFocus={true}
            value={question}
            placeholder="Enter Your Question"
            placeholderTextColor="#5a6666"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={this.handleAnswer}
            value={answer}
            placeholder="Enter Your Answer"
            placeholderTextColor="#5a6666"
          />
          <Button
            icon={
              !this.validateForm() && (
                <Icon name="plus-square" size={35} color="white" />
              )
            }
            title="Add Question"
            buttonStyle={[styles.btn, { backgroundColor: "#166644" }]}
            iconRight={true}
            disabled={this.validateForm()}
            disabledStyle={{ backgroundColor: "#853844" }}
            titleStyle={{ marginRight: 15, marginLeft: 15 }}
            onPress={this.handleSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(AddCard);
