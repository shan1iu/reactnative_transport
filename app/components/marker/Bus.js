import React, {Component} from 'react';
import {Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';

class Bus extends Component {
	render() {
		return (
			<Marker
				atcocode={this.props.atcocode}
				coordinate={this.props.coordinate}
				stop_name={this.props.stop_name}
				name={this.props.name}
				onPress={(e) => {
					e.preventDefault();
					alert(`BUS\nAtcocode:${this.props.atcocode}\nStop_name:${this.props.stop_name}\nName:${this.props.name}`);
				}}
			>
				<Icon
					raised
					name='bus'
					type='material-community'
					color='#40403e'
					size={30}
					containerStyle={{paddingTop: 2.5, paddingLeft: 1.4, width: 35, height: 35}}
				/>
			</Marker>
		);
	}
}

export default Bus;