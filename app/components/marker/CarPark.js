import React, {Component} from 'react';
import {Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';

class CarPark extends Component {
	render() {
		return (
			<Marker
				coordinate={this.props.coordinate}
				id={this.props.id}
				description={this.props.description}
				onPress={(e) => {
					e.preventDefault();
					alert(`CARPARK\nID:${this.props.id}\nDescription:${this.props.description}\n`);
				}}
			>
				<Icon
					raised
					name='parking'
					type='material-community'
					color='#0061ff'
					size={30}
					containerStyle={{paddingTop: 3, paddingLeft: 1, width: 36, height: 36}}
				/>
			</Marker>
		);
	}
}

export default CarPark;