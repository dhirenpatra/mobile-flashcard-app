import React, { Component } from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { createDeck } from "../actions";
import { handleAddDeck } from "../utils/helper";

class AddDecks extends Component {
  state = {
    input: "",
  };

  setText = (text) => {
    this.setState({
      input: text,
    });
  };

  submit = () => {
    const { input } = this.state;
    this.props.dispatch(createDeck(input));
    const { navigation } = this.props;
    navigation.navigate("DeckCard", {
      id: handleAddDeck(this.state.input).title,
    });
    this.setState({
      input: "",
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Card title="Add to Deck" containerStyle={styles.card}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setText(text)}
            autoFocus={true}
            value={this.state.input}
            placeholder="Enter Deck Name"
            placeholderTextColor="#5a6666"
          />
          <Button
            icon={
              this.state.input === "" ? (
                <Icon name="ban" size={30} color="white" />
              ) : (
                <Icon name="plus-square" size={30} color="white" />
              )
            }
            buttonStyle={styles.btn}
            iconRight={true}
            disabled={this.state.input === ""}
            disabledStyle={{ backgroundColor: "#192f8a" }}
            onPress={this.submit}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    backgroundColor: "#c3d2e8",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  btn: {
    height: 45,
    width: 120,
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

export default connect()(AddDecks);
