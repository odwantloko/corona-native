import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Home extends Component {
  
  constructor(props){
    super(props);

    this.state = { 
      data: {}, 
      global_data : {},
      center : {
        lat: -29.087217,
        lng: 26.154898
      }, 
      zoom: 6.2
		}
  }
  
  componentDidMount = () => {


    let postOptions = {};
    
    postOptions.method = 'GET';
    
    postOptions.headers = {};
    postOptions.headers['Content-type'] = 'application/json';
   
	// Api Call for local stats
    fetch('https://api.covid19api.com/live/country/south-africa/status/confirmed', postOptions)
        .then(res => res.json())
        .then((data) => {
		this.setState({data:data[data.length-1]})


    }).catch(console.log())

    // // Global Stats API Call
    // fetch('https://api.covid19api.com/summary', postOptions)
    //     .then(res => res.json())
    //     .then((data) => {
    //     this.setState({global_data:data.Global})
    //     console.log(data.Global)   
    //     }).catch(console.log)

  
  }
  
 
  render() {
    return (
    <View>
        <Text>Confirmed Cases: {this.state.data.Confirmed} </Text>
        <Text>Active Cases: {this.state.data.Active} </Text>
        <Text>Recovered Cases: {this.state.data.Recovered} </Text>
        <Text>Deaths: {this.state.data.Deaths} </Text>
    </View>
     
       
      
    );
  }
};

