/*This is an Example of React Native Map*/
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import KButtonPink from '../Components/KButtonPink';
// import Firebase from '@react-native-firebase/app';
import {firebaseDB} from '../src/config';

var body;
var tempMarkerPosition;
var itemsRef = firebaseDB.ref('/items');
let AddToFirebase = item => {
  itemsRef.push({
    latitude : item.latitude,
    longitude : item.longitude,
    ttl : 100
  });
};
/*
itemsRef.on('value', snapshot => {
  snapshot.forEach(function(childSnapshot) {
    var key = childSnapshot.key;
    var childData = childSnapshot.val();

    console.log(childData);
  });

});
*/

var cnt = 0;
var markerArray = [{ "latitude": 1, "longitude": 1 }];
function Map_Screen() {

  const [isMarking, setIsMarking] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);
  // const [markerArray, setMarkerArray] = useState([{ "latitude": 1, "longitude": 1 }]);
  const [region, setRegion] = useState({
    latitude: 53.41058,
    longitude: -2.97794,
    latitudeDelta: 0.1,
    longitudeDelta: 0,
  });


  useEffect(() => {
    const onValueChange = itemsRef.on('value', snapshot => {
      console.log(cnt++);

      let lastLength = markerArray.length;
      markerArray = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        markerArray[markerArray.length] = { "latitude" : childData.latitude, "longitude": childData.longitude, "ttl" : childData.ttl};
      });
      console.log(markerArray);

      if(lastLength != markerArray.length)
        setForceUpdate(forceUpdate + 1);
      
    });

    // Stop listening for updates when no longer required
    return () => { itemsRef.off('value', onValueChange); }
    return () => {}
  });
  
  const onRegionChange = (region) => {
    if(isMarking == 0){
      setRegion(region);
    }
  }
  const onAddMarker_Click = () => {
    console.log("Add Marker Clicked");
    setIsMarking(1);
    tempMarkerPosition = { "latitude" : region.latitude, "longitude": region.longitude};    
  }
  const onPlaceMarker_Click = () => {
    ///////////////////////////////this.setState({markerArray: [...markerArray, tempMarkerPosition]});
    //setMarkerArray([...markerArray, tempMarkerPosition]);

    setIsMarking(0);
    AddToFirebase(tempMarkerPosition);
    Alert.alert("Successfully Added!");
  }
  const onCancelMarker_Click = () => {
    console.log("Cancel Clicked");
    setIsMarking(0);
  }
  const onMarkerDragFinished = (markerPosition) => {
    tempMarkerPosition = markerPosition;
  }

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
          onRegionChangeComplete ={region => { onRegionChange(region); }}
        >

        {
          markerArray.map((item, key) => {
            return(
              <Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                //title={parseFloat(item.ttl)}
                // description={'8/1/2020 07:32 AM'}
                key = {key}
              />
            );
          })
        }

        {
          isMarking ? (
            <Marker
              draggable
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              onDragEnd={(e) => onMarkerDragFinished(e.nativeEvent.coordinate)}
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
          {!isMarking ? (<KButtonPink title="Add New" callback={onAddMarker_Click} />) : null}
          {isMarking ? (<KButtonPink title="Place" callback={onPlaceMarker_Click} />) : null}
          {isMarking ? (<KButtonPink title="Cancel" callback={onCancelMarker_Click} />) : null}

        </View>
      </View>
  )
}
export default Map_Screen;


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