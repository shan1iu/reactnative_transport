import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";

class Routes extends Component {
  render() {
    const a = (
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          paddingVertical: 15
        }}
      >
        <Icon
          name="location-arrow"
          type="font-awesome"
          color="#ccc"
          iconStyle={{ paddingTop: 0, paddingLeft: 10 }}
        />
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 15,
            color: "#494949"
          }}
        >
          University of Manchester
        </Text>
      </View>
    );
    return (
      // Outer Container
      <View style={{ flex: 1, marginTop: 20 }}>
        {/* Search Area */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F64A4A",
            // backgroundColor: "#fff",
            height: 104
          }}
        >
          {/* left input area */}
          <View
            style={{
              flex: 4,
              backgroundColor: "#fff",
              height: 104,
              backgroundColor: "#F64A4A"
            }}
          >
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Start Location"
              placeholderTextColor="grey"
              style={styles.textInput}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="End Location"
              placeholderTextColor="grey"
              style={styles.textInput}
            />
          </View>
          {/* right search button */}
          <View style={{ flex: 1 }}>
            <Button
              title="GO"
              titleStyle={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}
              buttonStyle={{
                backgroundColor: "#F64A4A",
                paddingVertical: 26,
                paddingRight: 9
              }}
            />
          </View>
        </View>
        {/* close - Search Area */}
        {/* Suggestion Title Area */}
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 10,
              color: "#aaa"
            }}
          >
            Suggestion
          </Text>
        </View>
        {/* Suggestion Result showing Area */}
        <ScrollView>
          {a}
          {a}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    fontSize: 20,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 8,
    paddingVertical: 10,
    paddingRight: 5,
    paddingLeft: 10,
    borderRadius: 3
  }
});

export default Routes;
