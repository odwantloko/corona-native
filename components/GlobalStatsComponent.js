import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from 'react-native';


export default class GlobalStats extends Component {

	constructor(props){
		super(props);
		this.state = { 
			data: [{}],
			CountryCodes: null
		}
	}

 

  componentDidMount = () => {
    let postOptions = {};
    postOptions.method = 'GET';
    postOptions.headers = {};
  
	let values = [{}];
		
    fetch('https://api.covid19api.com/summary', postOptions)
        .then(res => res.json())
        .then((data) => {
		console.log(data.Countries[0].CountryCode)

		values = data.Countries
		values.forEach(function(item){ 
			delete item.Slug; 
			delete item.CountryCode; 
			delete item.NewConfirmed; 
			delete item.NewDeaths; 
			delete item.NewRecovered; 
			item.Date =new Date(item.Date).toLocaleString(); 
		});
		values.sort( (a,b) => b.TotalConfirmed - a.TotalConfirmed);
		this.setState({data: values})
		
    }).catch(console.log)
  
  }

	render() {
		return (
			<View>
				 <Text> Global Stats</Text>

			</View>

		);
    }

};