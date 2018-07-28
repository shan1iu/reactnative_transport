import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Badge, Button } from "react-native-elements";
import Modal from "react-native-modal";

import TramList from "../modal/TramList";
import { USERKEY1, USERKEY2, TFGM_KEY } from "../../config/keys";

class CarparkItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      tramDetail: {}
    };
  }

  _toggleModal1 = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.getMetrolinkDetail(this.props.code);
  };

  _toggleModal2 = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  getMetrolinkDetail(id) {
    fetch(`https://api.tfgm.com/odata/Metrolinks(${id})`, {
      headers: new Headers(TFGM_KEY)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          tramDetail: res
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
          backgroundColor: "#e8be3e",
          borderRadius: 3
        }}
      >
        {/* Icon */}
        <View>
          <Icon
            name="tram"
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
                name="tram"
                type="material-community"
                color="#e5b700"
                size={35}
                iconStyle={{
                  paddingTop: 20,
                  paddingHorizontal: 10
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#e5b700",
                    paddingTop: 8,
                    paddingBottom: 5
                  }}
                >
                  {/* {this.state.tramDetail.StationLocation} */}
                  {this.props.content}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, color: "#aaa" }}>
                    line:{this.state.tramDetail.Line}
                  </Text>
                  <Badge
                    containerStyle={{
                      backgroundColor: "red",
                      width: 100,
                      marginLeft: 20
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#111"
                      }}
                    >
                      {this.state.tramDetail.Direction}
                    </Text>
                  </Badge>
                </View>
              </View>
            </View>
            <TramList
              stationLocation={this.state.tramDetail.Dest0}
              status={
                this.state.tramDetail.Wait0 > 0
                  ? this.state.tramDetail.Wait0 + " min"
                  : "Departing"
              }
            />
            <TramList
              stationLocation={this.state.tramDetail.Dest1}
              status={
                this.state.tramDetail.Wait1 > 0
                  ? this.state.tramDetail.Wait1 + " min"
                  : "Departing"
              }
            />
            <TramList
              stationLocation={this.state.tramDetail.Dest2}
              status={
                this.state.tramDetail.Wait2 > 0
                  ? this.state.tramDetail.Wait2 + " min"
                  : "Departing"
              }
            />
            <View style={{ position: "absolute", right: 5, bottom: 5 }}>
              <Icon
                reverse
                name="md-close"
                type="ionicon"
                color="#e5b700"
                iconStyle={{ paddingTop: 3, paddingLeft: 1, fontSize: 30 }}
                onPress={this._toggleModal2}
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
    height: 400
  }
});

export default CarparkItem;
