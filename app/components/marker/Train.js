import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";

class Train extends Component {
  render() {
    return (
      <Marker
        name={this.props.name}
        station_code={this.props.station_code}
        coordinate={this.props.coordinate}
        onPress={e => {
          e.preventDefault();
          console.log(this.props.id);
          alert(
            `TRAIN\nName:${this.props.name}\nStation_code:${
              this.props.station_code
            }\n`
          );
        }}
      >
        <Icon
          raised
          name="train-variant"
          type="material-community"
          color="#de2929"
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

export default Train;
