import React, { Component } from "react";
import { View, Text } from "react-native";

class TramList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          height: 50,
          justifyContent: "space-between",
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          marginHorizontal: 3
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20 }}>
          {this.props.stationLocation}
        </Text>
        <Text style={{ alignSelf: "center", fontSize: 20 }}>
          {this.props.status}
        </Text>
      </View>
    );
  }
}

export default TramList;
