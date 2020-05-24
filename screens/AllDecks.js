import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllDecks } from "../utils/api";
import { fetchInitialDeck } from "../actions";
import { View, FlatList, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import IndividualDeck from "./IndividualDeck";

class AllDecks extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    getAllDecks()
      .then((decks) => dispatch(fetchInitialDeck(decks)))
      .then(() =>
        this.setState({
          loading: false,
        })
      );
  }

  mapAndExtract = (id) => {
    const { decks } = this.props;
    return {
      key: id,
      data: decks[id],
    };
  };

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    const { decks } = this.props;
    const ids = Object.keys(decks);

    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
        }}
      >
        <FlatList
          style={styles.flatList}
          data={ids.map(this.mapAndExtract)}
          renderItem={({ item }) => (
            <IndividualDeck key={item.key} id={item.key} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
  },
});

const mapStateToProps = (decks) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(AllDecks);
