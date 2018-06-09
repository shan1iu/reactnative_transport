import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";

class Tram extends Component {
  render() {
    return (
      <Marker
        coordinate={this.props.coordinate}
        stationLocation={this.props.stationLocation}
        id={this.props.id}
        onPress={e => {
          e.preventDefault();
          alert(
            `TRAM\nStation Location:${this.props.stationLocation}\nID:${
              this.props.id
            }\n`
          );
        }}
      >
        <Icon
          raised
          name="tram"
          type="material-community"
          color="#e8be3e"
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
    paddingLeft: 1
  }
});

export default Tram;
