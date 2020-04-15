import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';



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
    //   <View style={{ height: '95vh', width: '100%' }}>
    //   <GoogleMapReact
    //     bootstrapURLKeys={{ key: "AIzaSyDoATwXhVPVR-k3VQCzhac4QZmXkYxfxRI" }}
    //     defaultCenter={this.props.center}
    //     defaultZoom={this.props.zoom}   
    //   >
      
    //   </GoogleMapReact>
    //   </View>
    <View style={{ height: '95%', width: '100%' }}>
        <MapView
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        />
    </View>


    );
  }
}
 


