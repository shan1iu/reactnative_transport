import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";

class FavCard extends Component {
  constructor(props) {
    super(props);
    this.onPressLearnMore = this.onPressLearnMore.bind(this);
  }
  onPressLearnMore() {
    alert("It Worked");
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
          backgroundColor: this.props.backgroundColor,
          borderRadius: 3
        }}
      >
        {/* Icon */}
        <View>
          <Icon
            name={this.props.iconName}
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
            onPress={this.onPressLearnMore}
            title="VIEW"
            buttonStyle={{
              backgroundColor: null,
              width: 75,
              height: 60
            }}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
      </View>
    );
  }
}

export default FavCard;
