import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import FavCard from "./favCard/FavCard";
import NavBar from "./navBar/NavBar";

class Fav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storage_key: []
    };
  }

  // get all the keys and render the component on Fav screen.
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getAllKeys();
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

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
        {/* When click this button, refresh the state of this conmponent ( get the new LocalStorage)  */}
        <Button
          title="REFRESH"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#bbbbbb",
            height: 45,
            borderRadius: 5
          }}
          containerStyle={{ marginHorizontal: 20, marginVertical: 10 }}
        />
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
