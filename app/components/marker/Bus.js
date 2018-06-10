import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Marker } from "react-native-maps";
import { Icon, Divider, Text, Badge } from "react-native-elements";
import Modal from "react-native-modal";

const USERKEY1 = "app_id=2ab3f5e2&app_key=4f694a46d98dde70516abbc1f636b93a";
const USERKEY2 = "app_id=21531a5c&app_key=aa1b4a07c862e7cfdb7dafb23bf888a9";

// mock data of busdetail
const mock_data = {
  15: [
    {
      aimed_departure_time: "10:53"
    },
    {
      aimed_departure_time: "11:53"
    }
  ],
  111: [
    {
      aimed_departure_time: "10:47"
    },
    {
      aimed_departure_time: "11:07"
    },
    {
      aimed_departure_time: "11:27"
    }
  ]
};

class Bus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      busDetail: {}
    };
  }
  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
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
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalStyle}>
            <Text
              h4
              style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}
            >
              {stop_name}
            </Text>
            <Divider style={{ backgroundColor: "#ededed", marginBottom: 10 }} />
            {/* use arrow function here */}
            <ScrollView>
              {Object.keys(this.state.busDetail).map((key, index) => {
                return (
                  <View key={index} style={{ display: "flex", flex: 1 }}>
                    <Badge
                      value={key}
                      textStyle={{ color: "orange" }}
                      containerStyle={{
                        display: "flex",
                        justifyContent: "flex-start"
                      }}
                    />
                    {this.state.busDetail[key].map((time, index) => (
                      <Badge
                        key={index}
                        containerStyle={{
                          backgroundColor: "violet",
                          display: "flex",
                          justifyContent: "flex-end"
                        }}
                      >
                        <Text>{time.aimed_departure_time}</Text>
                      </Badge>
                    ))}
                  </View>
                );
              })}
            </ScrollView>
            <View style={{ position: "absolute", right: 5, bottom: 5 }}>
              <Icon
                reverse
                name="md-close"
                type="ionicon"
                color="#F64A4A"
                onPress={this._toggleModal}
                containerStyle={{ paddingTop: 2, paddingLeft: 3 }}
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
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20
  }
});

export default Bus;
