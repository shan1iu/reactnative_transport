import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";

class CarPark extends Component {
  render() {
    return (
      <Marker
        coordinate={this.props.coordinate}
        id={this.props.id}
        onPress={e => {
          e.preventDefault();
          alert(
            `CARPARK\nID:${this.props.id}\nDescription:${
              this.props.description
            }\n`
          );
        }}
      >
        <Icon
          raised
          name="parking"
          type="material-community"
          color="#0061ff"
          size={20}
          iconStyle={styles.containerStyle}
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

export default CarPark;
