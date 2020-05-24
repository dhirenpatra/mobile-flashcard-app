import React, { Component } from "react";
import { View, Text } from "react-native";
import AllDecks from "./AllDecks";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{flex: 1,alignSelf: "stretch"}}>
        <AllDecks style={{flex: 1,alignSelf: "stretch"}}/>
      </View>
    );
  }
}
