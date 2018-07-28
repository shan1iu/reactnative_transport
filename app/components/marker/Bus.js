import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, AsyncStorage } from "react-native";
import { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";

import { USERKEY1, USERKEY2 } from "../../config/keys";

// const USERKEY1 = "app_id=2ab3f5e2&app_key=4f694a46d98dde70516abbc1f636b93a";
// const USERKEY2 = "app_id=21531a5c&app_key=aa1b4a07c862e7cfdb7dafb23bf888a9";
class Bus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      busDetail: {}
    };
  }

  getBusDetail(atcocode) {
    fetch(
      `http://transportapi.com/v3/uk/bus/stop/${atcocode}/live.json?${USERKEY2}&nextbuses=no`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          busDetail: res.departures
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  saveBus = atcocode => {
    try {
      AsyncStorage.setItem(`bus_${atcocode}`, `${atcocode}`).then(() => {
        alert("Success!");
      });
    } catch (error) {
      alert("Failed to saved, Please try again");
    }
  };

  render() {
    const atcocode = this.props.atcocode;
    const stop_name = this.props.stop_name;
    return (
      <Marker
        atcocode={this.props.atcocode}
        coordinate={this.props.coordinate}
        stop_name={this.props.stop_name}
        name={this.props.name}
        onPress={e => {
          e.preventDefault();
          // alert(
          //   `BUS\nAtcocode:${this.props.atcocode}\nStop_name:${
          //     this.props.stop_name
          //   }\nName:${this.props.name}`
          // );
          this.getBusDetail(atcocode);
        }}
      >
        <Icon
          raised
          name="bus"
          type="material-community"
          color="#40403e"
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
          {/* BUS STOP TITLE */}
          <View style={styles.modalStyle}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="bus"
                type="material-community"
                color="#40403e"
                size={35}
                iconStyle={{ paddingTop: 22, paddingHorizontal: 10 }}
              />
              <Text
                style={{
                  marginBottom: 30,
                  paddingTop: 20,
                  fontSize: 30
                }}
              >
                {stop_name}
              </Text>
            </View>
            <ScrollView style={{ marginBottom: 70 }}>
              {Object.keys(this.state.busDetail).map((key, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      height: 60,
                      marginHorizontal: 10,
                      marginBottom: 10,
                      justifyContent: "space-evenly",
                      borderBottomColor: "#eee",
                      borderBottomWidth: 1
                    }}
                  >
                    {/* BUS LINE */}
                    <Text
                      style={{
                        fontSize: 25,
                        marginHorizontal: 5,
                        fontWeight: "bold",
                        width: 75,
                        color: "#F64A4A"
                      }}
                    >
                      {key}
                    </Text>
                    {this.state.busDetail[key].map((time, index) => (
                      <Text key={index} style={styles.time}>
                        {time.aimed_departure_time}
                      </Text>
                    ))}
                  </View>
                );
              })}
            </ScrollView>
            <View style={{ position: "absolute", right: 5, bottom: 5 }}>
              {/* close Modal */}
              <Icon
                reverse
                name="md-close"
                type="ionicon"
                color="#40403e"
                onPress={this._toggleModal}
                iconStyle={{ paddingTop: 3, paddingLeft: 1, fontSize: 30 }}
              />
            </View>
            <View style={{ position: "absolute", right: 65, bottom: 5 }}>
              {/* save to Modal */}
              <Icon
                reverse
                name="md-heart"
                type="ionicon"
                color="#ddd"
                iconStyle={{ paddingTop: 4, paddingLeft: 1, fontSize: 30 }}
                onPress={e => {
                  e.preventDefault();
                  this.saveBus(atcocode);
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
    paddingLeft: 2
  },
  modalStyle: {
    backgroundColor: "#fff",
    height: 500
  },
  time: {
    fontSize: 20,
    paddingLeft: 10,
    textAlign: "center",
    lineHeight: 50,
    width: 70
  }
});

export default Bus;
