import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Text } from "react-native";
import { Marker } from "react-native-maps";
import { Icon, Badge } from "react-native-elements";
import Modal from "react-native-modal";

import TramList from "../modal/TramList";
import { USERKEY1, USERKEY2, TFGM_KEY } from "../../config/keys";

class Tram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      tramDetail: {}
    };
  }

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

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  saveTram = id => {
    try {
      AsyncStorage.setItem(`tram_${id}`, `${id}`).then(() => {
        alert("Success!");
      });
    } catch (error) {
      alert("Failed to saved, Please try again");
    }
  };

  render() {
    const id = this.props.id;
    return (
      <Marker
        coordinate={this.props.coordinate}
        stationLocation={this.props.stationLocation}
        id={this.props.id}
        onPress={e => {
          e.preventDefault();
          this.getMetrolinkDetail(id);
        }}
      >
        <Icon
          raised
          name="tram"
          type="material-community"
          color="#e8be3e"
          size={20}
          iconStyle={styles.containerStyle}
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
                  {this.state.tramDetail.StationLocation}
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
                onPress={e => {
                  e.preventDefault();
                  this._toggleModal();
                }}
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
                  this.saveTram(this.props.id);
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
  modalStyle: {
    backgroundColor: "#fff",
    height: 400
  }
});

export default Tram;
