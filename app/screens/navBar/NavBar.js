import React, { Component } from "react";
import { View, Text } from "react-native";

class NavBar extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 60,
          shadowOffset: { width: 0, height: 0 },
          marginBottom: 10,
          alignItems: "flex-end"
        }}
      >
        <Text
          style={{
            fontSize: 30,
            paddingLeft: 10,
            color: "#484848",
            fontWeight: "bold"
          }}
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default NavBar;
