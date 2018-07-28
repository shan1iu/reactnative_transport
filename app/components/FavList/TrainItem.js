import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Icon, Button } from "react-native-elements";
import Modal from "react-native-modal";

import { USERKEY1, USERKEY2 } from "../../config/keys";

class TrainItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainDetail: [],
      trainStationName: ""
    };
  }

  _toggleModal1 = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.getBusDetail(this.props.code);
  };

  _toggleModal2 = () => {
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

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "white",
          height: 60,
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: "#de2929",
          borderRadius: 3
        }}
      >
        {/* Icon */}
        <View>
          <Icon
            name="train-variant"
            type="material-community"
            color="#fff"
            size={40}
            iconStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
          />
        </View>
        {/* Content */}
        <View
          style={{
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 20,
              alignContent: "center",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            {this.props.content.length > 18
              ? this.props.content.substring(0, 18) + "..."
              : this.props.content}
          </Text>
        </View>
        {/* Button */}
        <View>
          <Button
            onPress={this._toggleModal1}
            title="VIEW"
            buttonStyle={{
              backgroundColor: null,
              width: 75,
              height: 60
            }}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
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
                {this.props.content}
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
                onPress={this._toggleModal2}
                iconStyle={{ paddingTop: 3, paddingLeft: 1, fontSize: 30 }}
              />
            </View>
          </View>
        </Modal>
      </View>
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

export default TrainItem;
