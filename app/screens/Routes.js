import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";
import { Button, Icon } from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';
import { API_KEY, USERKEY1, USERKEY2 } from "../config/keys";

let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:gb&input=univers&types=geocode&language=en-GB&key=${API_KEY}`;

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: "",
      startShow: false,
      endShow: false,
      input: "",
      startLocationCode: "",
      endLocationCode: "",
      suggestions: [],
      spinner: false,
      title:""
    };
  }
  componentWillMount(){
    this.setState({title:"Suggestions"})
  }
  // handle start input 
  handleStart = (text) => {
    this.setState({ start: text, suggestions:[] })
    this.searchPlaceStart()
  }
  // handle end input 
  handleEnd = (text) => {
    this.setState({ end: text, suggestions:[] })
    this.searchPlaceEnd()
  }
  // get autoComplete based on start input
  searchPlaceStart = () => {
    this.setState({
      suggestions: []
    })
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:gb&input=${
      this.state.start
      }&language=en-GB&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
          this.setState({
            suggestions: res.predictions
          })
        }
        console.log(this.state)
      })
      .catch();
  };
  // get autoComplete based on end input
  searchPlaceEnd = () => {
    this.setState({
      suggestions: []
    })
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:gb&input=${
      this.state.end
      }&language=en-GB&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
          this.setState({
            suggestions: res.predictions
          })
        }
        console.log(this.state)
      })
      .catch();
  };
  
  getRoute = () => {
    this.setState({startShow:false,endShow:false, spinner:true,title:"Result"})
    console.log(`${this.state.start} - ${this.state.end}`)
    console.log(`${this.state.startLocationCode} - ${this.state.endLocationCode}`)
    if(this.state.start !== "" && this.state.end!==""){
      fetch(`https://transportapi.com/v3/uk/public/journey/from/${this.state.startLocationCode}/to/${this.state.endLocationCode}.json?${USERKEY1}&service=southeast`).then(res=>res.json()).then(res=>console.log(res)).then(()=>this.setState({spinner:false}))
    }
    else{
      alert("Please input both start or end Location")
    }
  }

  render() {
    return (
      // Outer Container
      <View style={{ flex: 1, marginTop: 20 }}>
      <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
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
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="Start Location"
              placeholderTextColor="grey"
              onChangeText={this.handleStart}
              value={this.state.start}
              name="start"
              style={styles.textInput}
              onFocus={()=>this.setState({startShow:true,endShow:false})}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="End Location"
              placeholderTextColor="grey"
              onChangeText={this.handleEnd}
              value={this.state.end}
              name="end"
              style={styles.textInput}
              onFocus={()=>this.setState({endShow:true,startShow:false})}
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
              onPress={this.getRoute}
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
            {this.state.title}
          </Text>
        </View>
        {/* Suggestion Result showing Area */}
        <ScrollView keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView style={{ flex: 1 }}
                keyboardVerticalOffset={200} behavior={"position"}>
          {this.state.startShow &&
            this.state.suggestions.map((place, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  onPress={() => {
                    this.setState({
                      start: place.description
                    })
                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${place.description}&key=AIzaSyCdY4Et3Vq2MjQdj0VDBYKoQ8YGeulTvhk`).then(res=>res.json()).then(res=>{
                      this.setState({
                        startLocationCode: `lonlat:${res.results[0].geometry.location.lng},${res.results[0].geometry.location.lat}`
                      })
                      console.log(res.results[0].geometry.location)
                    }).catch(()=>{alert("Error")})
                  }}
                  underlayColor="white"
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    paddingVertical: 15
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      paddingLeft: 15,
                      color: "#494949"
                    }}
                  >
                    {place.description}
                  </Text>
                </TouchableHighlight>
              )
            })
          }
          {this.state.endShow &&
            this.state.suggestions.map((place, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  onPress={() => {
                    this.setState({
                      end: place.description
                    })
                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${place.description}&key=AIzaSyCdY4Et3Vq2MjQdj0VDBYKoQ8YGeulTvhk`).then(res=>res.json()).then(res=>{
                      this.setState({
                        endLocationCode: `lonlat:${res.results[0].geometry.location.lng},${res.results[0].geometry.location.lat}`
                      })
                      console.log(res.results[0].geometry.location)
                    }).catch(()=>{alert("Error")})
                  }}
                  underlayColor="white"
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    paddingVertical: 15
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      paddingLeft: 15,
                      color: "#494949"
                    }}
                  >
                    {place.description}
                  </Text>
                </TouchableHighlight>
              )
            })
          }
          </KeyboardAvoidingView>
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
