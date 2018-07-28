import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";

import NavBar from "./navBar/NavBar";
import BusItem from "../components/FavList/BusItem";
import CarparkItem from "../components/FavList/CarparkItem";
import TrainItem from "../components/FavList/TrainItem";
import TramItem from "../components/FavList/TramItem";

class Fav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bus: [],
      carpark: [],
      tram: [],
      train: []
    };
  }

  componentDidMount() {
    this._retrieveData();
  }

  // get all the keys and render the component on Fav screen.
  _retrieveData = () => {
    try {
      const keyPromise = AsyncStorage.getAllKeys();
      if (keyPromise !== null) {
        keyPromise.then(keyArray => {
          keyArray.map((key, index) => {
            AsyncStorage.getItem(key).then(value => {
              // console.log(value);
              let transType = key.split("_")[0];
              if (transType === "bus") {
                this.setState({
                  bus: Array.from(new Set([...this.state.bus, value]))
                });
              } else if (transType === "carpark") {
                this.setState({
                  carpark: Array.from(new Set([...this.state.carpark, value]))
                });
              } else if (transType === "tram") {
                this.setState({
                  tram: Array.from(new Set([...this.state.tram, value]))
                });
              } else if (transType === "train") {
                this.setState({
                  train: Array.from(new Set([...this.state.train, value]))
                });
              }
            });
          });
        });
        // console.log(this.state);
      }
    } catch (error) {
      // console.log(error);
      alert("Failed! Try again later");
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.flex_one}>
        <NavBar title="Saved" />
        <ScrollView style={{ flex: 1 }}>
          {/* code is for api use, such as id/atcocode ... */}
          {this.state.bus.map((data, index) => {
            return (
              <BusItem
                key={index}
                content={data.split("-")[0]}
                code={data.split("-")[1]}
              />
            );
          })}
          {this.state.tram.map((data, index) => {
            return (
              <TramItem
                key={index}
                content={data.split("-")[0]}
                code={data.split("-")[1]}
              />
            );
          })}
          {this.state.train.map((data, index) => {
            return (
              <TrainItem
                key={index}
                content={data.split("-")[0]}
                code={data.split("-")[1]}
              />
            );
          })}
          {this.state.carpark.map((data, index) => {
            return (
              <CarparkItem
                key={index}
                content={data.split("-")[0]}
                code={data.split("-")[1]}
              />
            );
          })}
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
          onPress={this._retrieveData}
        />
        {/* <Button
          title="Delete"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#bbbbbb",
            height: 45,
            borderRadius: 5
          }}
          containerStyle={{ marginHorizontal: 20, marginVertical: 10 }}
          onPress={() => {
            AsyncStorage.clear().then(alert("Success"));
          }}
        /> */}
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
