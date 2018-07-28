import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Icon, Badge } from "react-native-elements";
import Modal from "react-native-modal";

import { TFGM_KEY } from "../../config/keys";

class CarparkItem extends Component {
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

  _toggleModal1 = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.getCarparkDetail(this.props.code);
  };

  _toggleModal2 = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

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
          backgroundColor: "#0061ff",
          borderRadius: 3
        }}
      >
        {/* Icon */}
        <View>
          <Icon
            name="parking"
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
                {this.props.content}
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
    height: 250
  }
});

export default CarparkItem;
