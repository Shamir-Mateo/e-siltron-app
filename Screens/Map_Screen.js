/*This is an Example of React Native Map*/
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import KButtonPink from '../Components/KButtonPink';

var body;
var tempMarkerPosition;
export default class Map_Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMarking: 0,
      markerArray: [{ "latitude": 1, "longitude": 1 }],
      region: {
        latitude: 53.41058,
        longitude: -2.97794,
        latitudeDelta: 0.1,
        longitudeDelta: 0,
      }
    }
  }

  onRegionChange = (region) => {
    if(this.state.isMarking == 0){
      this.setState({region});
      console.log(region);
    }
  }
  onAddMarker_Click = () => {
    console.log("Add Marker Clicked");
    this.setState({ isMarking: 1 });
    tempMarkerPosition = { "latitude" : this.state.region.latitude, "longitude": this.state.region.longitude};

    console.log(tempMarkerPosition);
  }
  onPlaceMarker_Click = () => {
    //  here have to push on google firebase store
    
    this.setState({markerArray: [...this.state.markerArray, tempMarkerPosition]});
    console.log(this.state.markerArray);
    this.setState({ isMarking: 0 });

  }
  onCancelMarker_Click = () => {
    console.log("Cancel Clicked");
    this.setState({ isMarking: 0 });
  }
  onMarkerDragFinished(markerPosition) {
    tempMarkerPosition = markerPosition;
  }

  render() {
    var mapStyle = [{ "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }];
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />  
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
          onRegionChangeComplete ={region => { this.onRegionChange(region); }}
        >

        {
          this.state.markerArray.map((item, key) => {
            return(
              <Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={'John Smith'}
                description={'8/1/2020 07:32 AM'}
                key = {key}
              />
            );
          })
        }

        {
          this.state.isMarking ? (
            <Marker
              draggable
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
              }}
              onDragEnd={(e) => this.onMarkerDragFinished(e.nativeEvent.coordinate)}
              title={'Your Marker'}
              description={'Drag this to set location'}
              pinColor = {'#0000ff'}
            />) : null
        }

        </MapView>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',//use absolute position to show button on top of the map
            top: '86%', //for center align
            alignSelf: 'center' //for align to right
          }}
        >
          {!this.state.isMarking ? (<KButtonPink title="Add New" callback={this.onAddMarker_Click} />) : null}
          {this.state.isMarking ? (<KButtonPink title="Place" callback={this.onPlaceMarker_Click} />) : null}
          {this.state.isMarking ? (<KButtonPink title="Cancel" callback={this.onCancelMarker_Click} />) : null}

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});