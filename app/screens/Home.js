import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Icon } from "react-native-elements";

import Bus from "../components/marker/Bus";
import CarPark from "../components/marker/CarPark";
import Tram from "../components/marker/Tram";
import Train from "../components/marker/Train";
import metrolink_data from "../data/metrolink";

const DELTA = 0.1;
const USERKEY1 = "app_id=2ab3f5e2&app_key=4f694a46d98dde70516abbc1f636b93a";
const USERKEY2 = "app_id=21531a5c&app_key=aa1b4a07c862e7cfdb7dafb23bf888a9";
const TFGM_KEY = {
  "Ocp-Apim-Subscription-Key": "352d46528de74094835792b951c110fc"
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocationMe: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA
      },
      currentLocationBus: [],
      currentLocationCarPark: [],
      currentLocationTram: [],
      currentLocationTrain: []
    };
    this.handleGoBackToCurrentLocation = this.handleGoBackToCurrentLocation.bind(
      this
    );
  }

  componentWillMount() {
    console.log("===== componentWillMount called =====");
    this.handleGetCurrentLocation();
  }

  componentDidMount() {
    console.log("===== componentDidMount called =====");
  }

  componentWillUpdate() {
    console.log("===== componentWillUpdate called =====");
  }

  componentDidUpdate() {
    console.log("===== componentDidUpdate called =====");
  }

  /*
	* getCurrentLocation
	* return {
	* 	latitude: crd.latitude,
	* 	longitude: crd.longitude
	* }
	* */

  //get nearBy BusStop
  handleGetNearByBusStop(latitude, longitude) {
    fetch(
      `http://transportapi.com/v3/uk/bus/stops/near.json?${USERKEY2}&lat=${latitude}&lon=${longitude}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          currentLocationBus: res.stops
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  //get nearBy Train Stop
  handleGetNearByTrainStop(latitude, longitude) {
    fetch(
      `http://transportapi.com/v3/uk/train/stations/near.json?${USERKEY2}&lat=${latitude}&lon=${longitude}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          currentLocationTrain: res.stations
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  //get nearBy CarPark
  handleGetNearByCarPark() {
    fetch(`https://api.tfgm.com/odata/Carparks?$expand=Location`, {
      headers: new Headers(TFGM_KEY)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          currentLocationCarPark: res.value
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // get current Location
  // , this.handleGetNearByBusStop(this.state.currentLocationMe.latitude, this.state.currentLocationMe.longitude)
  handleGetCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        let crd = pos.coords;
        this.setState({
          currentLocationMe: {
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: DELTA,
            longitudeDelta: DELTA
          }
        });
        this.handleGetNearByBusStop(
          this.state.currentLocationMe.latitude,
          this.state.currentLocationMe.longitude
        );
        // this.handleGetNearByTrainStop(
        //   this.state.currentLocationMe.latitude,
        //   this.state.currentLocationMe.longitude
        // );
        this.handleGetNearByCarPark();
      },
      err => {
        console.log(`ERROR(${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  // when pressing the refresh button
  handleRefreshLocation() {
    console.log("===== handleRefreshLocation called =====");
  }

  // when pressing the goBackToCurrentLocation button
  handleGoBackToCurrentLocation() {
    console.log("===== handleGoBackToCurrentLocation called =====");
    this.setState({
      currentLocationMe: {
        latitude: this.state.currentLocationMe.latitude,
        longitude: this.state.currentLocationMe.longitude,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA
      }
    });
  }

  // when pressing the marker button
  // should give information based on marker type (bus/carpark/tram/train)
  handleMarkerPress = e => {
    console.log(e.nativeEvent.coordinate);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} translucent={true} />
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.currentLocationMe}
            onRegionChangeComplete={e =>
              console.log("onRegionChangeComplete:", e.latitude, e.longitude)
            }
            showsCompass={true}
            showsTraffic={true}
            scrollEnabled={true}
            showsUserLocation={false}
            showsPointsOfInterest={false}
            onUserLocationChange={e =>
              console.log("onUserLocationChange:", e.latitude, e.longitude)
            }
            // onPress={e => console.log("onPress:", e.nativeEvent.coordinate)}
          >
            {// Bus STOP RENDERING
            this.state.currentLocationBus.map(busStop => {
              return (
                <Bus
                  atcocode={busStop.atcocode}
                  key={busStop.latitude}
                  name={busStop.name}
                  stop_name={busStop.stop_name}
                  coordinate={{
                    latitude: busStop.latitude,
                    longitude: busStop.longitude
                  }}
                />
              );
            })}
            {// Train STOP RENDERING
            this.state.currentLocationTrain.map(trainStop => {
              return (
                <Train
                  name={trainStop.name}
                  station_code={trainStop.station_code}
                  key={trainStop.latitude}
                  coordinate={{
                    latitude: trainStop.latitude,
                    longitude: trainStop.longitude
                  }}
                />
              );
            })}
            {// Carpark
            this.state.currentLocationCarPark.map(carpark => {
              let info =
                carpark.Location.LocationSpatial.Geography.WellKnownText;
              let info_latitude = parseFloat(
                info.substring(7, info.length - 1).split(" ")[1]
              );
              let info_longitude = parseFloat(
                info.substring(7, info.length - 1).split(" ")[0]
              );
              return (
                <CarPark
                  key={carpark.Id}
                  id={carpark.Id}
                  coordinate={{
                    latitude: info_latitude,
                    longitude: info_longitude
                  }}
                  name={carpark.Description}
                />
              );
            })}
            {// Tram Stop
            metrolink_data.map(item => {
              return (
                <Tram
                  key={item.Id}
                  id={item.Id}
                  stationLocation={item.StationLocation}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude
                  }}
                />
              );
            })}
          </MapView>
        </View>
        <View style={{ position: "absolute", right: 5, bottom: 70 }}>
          <Icon
            raised
            name="md-refresh"
            type="ionicon"
            color="#F64A4A"
            onPress={this.handleRefreshLocation}
            containerStyle={{ paddingTop: 2, paddingLeft: 1.4 }}
          />
        </View>
        <View style={{ position: "absolute", right: 5, bottom: 5 }}>
          <Icon
            raised
            name="md-locate"
            type="ionicon"
            color="#F64A4A"
            onPress={this.handleGoBackToCurrentLocation}
            containerStyle={{ paddingTop: 2, paddingLeft: 1.4 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default Home;
