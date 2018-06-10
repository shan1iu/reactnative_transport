import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";
import { Icon, Text, Divider, List, ListItem } from "react-native-elements";
import Modal from "react-native-modal";

const TFGM_KEY = {
  "Ocp-Apim-Subscription-Key": "352d46528de74094835792b951c110fc"
};

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
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
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
          // alert(
          //   `CARPARK\nID:${this.props.id}\nDescription:${
          //     this.props.description
          //   }\n`
          // );
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
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalStyle}>
            <Text
              h4
              style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}
            >
              {name}
            </Text>
            <Divider style={{ backgroundColor: "#ededed", marginBottom: 10 }} />
            <Text>State:{this.state.carparkDetail.State}</Text>
            <Text>Capacity:{this.state.carparkDetail.Capacity}</Text>
            <Text>Occupany:{this.state.carparkDetail.Occupancy}</Text>
          </View>
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

export default CarPark;
