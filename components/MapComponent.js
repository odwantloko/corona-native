import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: -29.087217,
      lng: 26.154898
    },
    zoom: 5.8
  };

  
 
  render() {
    return (
      <MapView
        style={{ flex: 1, height: 340}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
        latitude: -29.087217,
        longitude: 26.154898,
        latitudeDelta: 15,
        longitudeDelta: 19}}
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421}}
    />
    );
  }
}
 


