import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import Modal from "react-native-modal";

import { USERKEY1, USERKEY2 } from "../../config/keys";

class BusItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false, busDetail: {} };
    this._toggleModal1 = this._toggleModal1.bind(this);
    this._toggleModal2 = this._toggleModal2.bind(this);
    this.getBusDetail = this.getBusDetail.bind(this);
  }
  componentMount() {
    console.log(this.props);
  }
  _toggleModal1() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.getBusDetail(this.props.code);
  }

  _toggleModal2() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
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
          backgroundColor: "#40403e",
          borderRadius: 3
        }}
      >
        {/* Icon */}
        <View>
          <Icon
            name="bus"
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
        {/* ========== Modal ========== */}
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
                {this.props.content}
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

export default BusItem;
