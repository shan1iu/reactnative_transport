import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, AsyncStorage } from "react-native";
import { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";

import { USERKEY1, USERKEY2 } from "../../config/keys";

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainDetail: [],
      trainStationName: ""
    };
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  getBusDetail(station_code) {
    fetch(
      `http://transportapi.com/v3/uk/train/station/${station_code}/live.json?${USERKEY2}&nextbuses=no`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          trainStationName: res.station_name,
          trainDetail: res.departures.all
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  saveTrain = (station_code,name) => {
    try {
      AsyncStorage.setItem(`train_${station_code}`, `${name}-${station_code}`).then(
        () => {
          alert("Success!");
        }
      );
    } catch (error) {
      alert("Failed to saved, Please try again");
    }
  };

  render() {
    const station_code = this.props.station_code;
    const name = this.props.name;
    return (
      <Marker
        name={this.props.name}
        station_code={this.props.station_code}
        coordinate={this.props.coordinate}
        onPress={e => {
          e.preventDefault();
          this.getBusDetail(station_code);
        }}
      >
        <Icon
          raised
          name="train-variant"
          type="material-community"
          color="#de2929"
          size={20}
          iconStyle={styles.iconContainerStyle}
          onPress={this._toggleModal}
        />
        <Modal
          isVisible={this.state.isModalVisible}
          style={{
            justifyContent: "flex-end",
            margin: 0
          }}
        >
          <View style={styles.modalStyle}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="train-variant"
                type="material-community"
                color="#de2929"
                size={35}
                iconStyle={{ paddingTop: 22, paddingHorizontal: 10 }}
              />
              <Text
                style={{
                  marginBottom: 30,
                  paddingTop: 25,
                  fontSize: 20,
                  color: "#de2929"
                }}
              >
                {/* {this.state.trainStationName} */}
                {name}
              </Text>
            </View>
            <ScrollView style={{ marginBottom: 70 }}>
              {this.state.trainDetail.map((train, index) => (
                <View
                  key={index}
                  style={{
                    height: 60,
                    paddingHorizontal: 20,
                    marginBottom: 20
                  }}
                >
                  // top
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5
                    }}
                  >
                    <Text style={{ fontSize: 22 }}>
                      {train.destination_name}
                    </Text>
                    <Text style={{ fontSize: 20 }}>
                      {train.aimed_departure_time}
                    </Text>
                  </View>
                  // bottom
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomColor: "#eee",
                      borderBottomWidth: 1,
                      paddingBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        backgroundColor: "#de2929",
                        color: "#fff",
                        fontWeight: "bold",
                        paddingHorizontal: 5,
                        paddingTop: 2
                      }}
                    >
                      {train.platform}
                    </Text>
                    <Text
                      style={{
                        paddingTop: 5,
                        flex: 1,
                        paddingLeft: 10,
                        color: "#aaa"
                      }}
                    >
                      {train.operator_name}
                    </Text>
                    <Text style={{ fontSize: 20, color: "#de2929" }}>
                      {train.expected_departure_time}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={{ position: "absolute", right: 5, bottom: 5 }}>
              <Icon
                reverse
                name="md-close"
                type="ionicon"
                color="#de2929"
                onPress={this._toggleModal}
                iconStyle={{ paddingTop: 3, paddingLeft: 1, fontSize: 30 }}
              />
            </View>
            <View style={{ position: "absolute", right: 65, bottom: 5 }}>
              <Icon
                reverse
                name="md-heart"
                type="ionicon"
                color="#ddd"
                iconStyle={{ paddingTop: 4, paddingLeft: 1, fontSize: 30 }}
                onPress={e => {
                  e.preventDefault();
                  this.saveTrain(station_code,name);
                }}
              />
            </View>
          </View>
        </Modal>
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  iconContainerStyle: {
    paddingTop: 3,
    paddingLeft: 1
  },
  modalStyle: {
    backgroundColor: "#fff",
    height: 600
  }
});

export default Train;
