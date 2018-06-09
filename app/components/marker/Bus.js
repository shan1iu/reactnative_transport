import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";

class Bus extends Component {
  render() {
    return (
      <Marker
        atcocode={this.props.atcocode}
        coordinate={this.props.coordinate}
        stop_name={this.props.stop_name}
        name={this.props.name}
        onPress={e => {
          e.preventDefault();
          alert(
            `BUS\nAtcocode:${this.props.atcocode}\nStop_name:${
              this.props.stop_name
            }\nName:${this.props.name}`
          );
        }}
      >
        <Icon
          raised
          name="bus"
          type="material-community"
          color="#40403e"
          size={20}
          iconStyle={styles.iconContainerStyle}
        />
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  iconContainerStyle: {
    paddingTop: 3,
    paddingLeft: 2
  }
});

export default Bus;
