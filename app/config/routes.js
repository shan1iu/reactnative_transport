import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../screens/Home";
import Fav from "../screens/Fav";
import Route from "../screens/Routes";
import Settings from "../screens/Settings";
import Search from "../screens/Search";

export default createBottomTabNavigator(
  {
    Home: {
    screen: Home,
    navigationOptions: {
      labeled: false,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-home" size={30} color={tintColor} />
      )
      }
    },
  Fav: {
    screen: Fav,
    navigationOptions: {
      labeled: false,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-heart" size={30} color={tintColor} />
      ),
      tabBarOnPress: null
    }
  },
    Route: {
      screen: Route,
      navigationOptions: {
        labeled: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-swap" size={30} color={tintColor} />
        )
      }
    },
    
    
    Search: {
      screen: Search,
      navigationOptions: {
        labeled: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-search" size={30} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        labeled: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-settings" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#F64A4A",
      inactiveTintColor: "#b0b0b0",
      showLabel: false
    }
  }
);
