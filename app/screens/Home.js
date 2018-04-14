import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon, Button} from 'react-native-elements';

class Home extends Component {
	handleRefreshLocation = () => {
		console.log("refresh Location");
	};
	handleGoBackToCurrentLocation = () => {
		console.log("Go Back to current Location");
	};

	render() {
		return (
			<View style={{flex: 1}}>
				<StatusBar
					barStyle={'dark-content'}
					translucent={true}
				/>
				<View style={styles.container}>
					<MapView
						style={styles.map}
						region={{
							latitude: 53.4677054,
							longitude: -2.2334529,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}}
						showsCompass={true}
						showsTraffic={false}
						onPress={e => console.log(e.nativeEvent)}
					>
						{/* ME */}
						<Marker
							coordinate={{
								latitude: 53.4677054,
								longitude: -2.2334529
							}}
							title="me"
							description="Where I am"
						/>
						{/* BUS */}
						<Marker
							coordinate={{
								latitude: 53.4675,
								longitude: -2.23465
							}}
							title="me"
							description="Where I am"
						/>
						{/* CARPARK */}
						{/**/}
						<Marker
							coordinate={{
								latitude: 53.46584148528714,
								longitude: -2.234366232947922
							}}
							title="me"
							description="Where I am"
						/>
						{/* TRAM */}
						<Marker
							coordinate={{
								latitude: 53.468455440547984,
								longitude: -2.231624012018449
							}}
							title="me"
							description="Where I am"
						/>
						{/* TRAIN */}
						<Marker
							coordinate={{
								latitude: 53.46917239821252,
								longitude: -2.234366232947922
							}}
							title="me"
							description="Where I am"
						/>
					</MapView>
				</View>
				<View style={{position: "absolute", right: 5, bottom: 70}}>
					<Icon
						raised
						name='md-refresh'
						type='ionicon'
						color='#F64A4A'
						onPress={this.handleRefreshLocation}
						containerStyle={{paddingTop: 2, paddingLeft: 1.4}}
					/>
				</View>
				<View style={{position: "absolute", right: 5, bottom: 5}}>
					<Icon
						raised
						name='md-locate'
						type='ionicon'
						color='#F64A4A'
						onPress={this.handleGoBackToCurrentLocation}
						containerStyle={{paddingTop: 2, paddingLeft: 1.4}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default Home;
