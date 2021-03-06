import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Text } from "react-native";
import { Marker } from "react-native-maps";
import { Icon, Badge } from "react-native-elements";
import Modal from "react-native-modal";

import { TFGM_KEY } from "../../config/keys";

class CarPark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      carparkDetail: {}
    };
  }
  getCarparkDetail(id) {
    fetch(`https://api.tfgm.com/odata/Carparks(${id})`, {
      headers: new Headers(TFGM_KEY)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          carparkDetail: res
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  saveCarpark = (id, name) => {
    try {
      AsyncStorage.setItem(`carpark_${id}`, `${name}-${id}`).then(() => {
        alert("Success!");
      });
    } catch (error) {
      alert("Failed to saved, Please try again");
    }
  };

  render() {
    const id = this.props.id;
    const name = this.props.name;
    return (
      <Marker
        coordinate={this.props.coordinate}
        id={this.props.id}
        onPress={e => {
          e.preventDefault();
          this.getCarparkDetail(id);
        }}
      >
        <Icon
          raised
          name="parking"
          type="material-community"
          color="#0061ff"
          size={20}
          iconStyle={styles.containerStyle}
          onPress={this._toggleModal}
        />
        <Modal
          isVisible={this.state.isModalVisible}
          onSwipe={() =>
            this.setState({ isModalVisible: !this.state.isModalVisible })
          }
          swipeDirection="down"
          style={{
            justifyContent: "flex-end",
            margin: 0
          }}
        >
          <View style={styles.modalStyle}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="parking"
                type="material-community"
                color="#0061ff"
                size={35}
                iconStyle={{ paddingTop: 22, paddingHorizontal: 10 }}
              />
              <Text
                style={{
                  marginBottom: 30,
                  paddingTop: 20,
                  fontSize: 30,
                  color: "#0061ff"
                }}
              >
                {/* {this.state.carparkDetail.Description} */}
                {name}
              </Text>
            </View>
            <View style={{ flexDirection: "row", height: 60 }}>
              <Text
                style={{
                  fontSize: 25,
                  paddingHorizontal: 20,
                  justifyContent: "center",
                  paddingTop: 5
                }}
              >
                Avaiable
              </Text>
              {parseInt(this.state.carparkDetail.Capacity) -
                parseInt(this.state.carparkDetail.Occupancy) >
              0 ? (
                <Badge
                  value={
                    parseInt(this.state.carparkDetail.Capacity) -
                    parseInt(this.state.carparkDetail.Occupancy)
                  }
                  textStyle={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: "bold"
                  }}
                  containerStyle={{ backgroundColor: "#006f37" }}
                />
              ) : (
                <Badge
                  value={
                    parseInt(this.state.carparkDetail.Capacity) -
                    parseInt(this.state.carparkDetail.Occupancy)
                  }
                  textStyle={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: "bold"
                  }}
                  containerStyle={{ backgroundColor: "red" }}
                />
              )}
            </View>
            <View style={{ position: "absolute", right: 5, bottom: 5 }}>
              <Icon
                reverse
                name="md-close"
                type="ionicon"
                color="#0061ff"
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
                  this.saveCarpark(id, name);
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
    height: 250
  }
});

export default CarPark;
