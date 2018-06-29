import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";

import NavBar from "./navBar/NavBar";
class Settings extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* other code from before here */}
        <NavBar title="Settings" />
        <Text>Settings</Text>
      </SafeAreaView>
    );
  }
}

export default Settings;
