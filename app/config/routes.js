import React from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator, TabBarBottom, TabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Fav from '../screens/Fav';
import Route from '../screens/Routes';
import Settings from "../screens/Settings";
import Search from "../screens/Search";


export default TabNavigator(
	{
		Home: {screen: Home},
		Fav: {screen: Fav},
		Route: {screen: Route},
		Search: {screen: Search},
		Settings: {screen: Settings},
	},
	{
		navigationOptions: ({navigation}) => ({
			tabBarIcon: ({focused, tintColor}) => {
				const {routeName} = navigation.state;
				let iconName;
				if (routeName === 'Home') {
					iconName = "md-home";
				} else if (routeName === 'Fav') {
					iconName = "md-heart";
				} else if (routeName === 'Route') {
					iconName = "md-swap";
				} else if (routeName === 'Settings') {
					iconName = "md-settings";
				} else if (routeName === 'Search') {
					iconName = "md-search";
				}
				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Ionicons name={iconName} size={30} color={tintColor}/>;
			},
		}),
		tabBarOptions: {
			activeTintColor: '#F64A4A',
			inactiveTintColor: '#b0b0b0',
			showLabel: false,
			style: {
				borderTopWidth: 1,
				backgroundColor: "transparent",
			}
		},
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: false,
	}
);

