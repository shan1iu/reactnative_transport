import React, { Component } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  Platform
} from "react-native";

import FavCard from "./favCard/FavCard";
import NavBar from "./navBar/NavBar";

class Fav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.flex_one}>
        <NavBar title="Saved" />
        <ScrollView style={{ flex: 1 }}>
          {/* BUS */}
          <FavCard
            backgroundColor="#40403e"
            iconName="bus"
            content="Great Western St"
          />
          {/* BUS */}
          <FavCard
            backgroundColor="#40403e"
            iconName="bus"
            content="Mary Eastern St"
          />
          {/* Carpark */}
          <FavCard
            backgroundColor="#0061ff"
            iconName="parking"
            content="Carkpark Great Western Test"
          />
          {/* Train */}
          <FavCard
            backgroundColor="#de2929"
            iconName="train-variant"
            content="Train Test St Mary"
          />
          {/* Tram */}
          <FavCard
            backgroundColor="#e8be3e"
            iconName="tram"
            content="Tram Garden Great Western"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex_one: {
    flex: 1
  }
});

export default Fav;
