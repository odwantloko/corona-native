import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SimpleMap from './MapComponent';

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
      zoom: 6.2,
      date: null
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
        data[data.length-1].Date =new Date(data[data.length-1].Date).toLocaleString(); 

    this.setState({data:data[data.length-1]})
  

    }).catch(console.log())

    // Global Stats API Call
    fetch('https://api.covid19api.com/summary', postOptions)
        .then(res => res.json())
        .then((data) => {
        this.setState({global_data:data.Global})
        this.setState({date:new Date(data.Date).toLocaleString()})

        }).catch(console.log)
      
  
  }
  
 
  render() {
    return (
    <View>
        <View>  
          <Text style={styles.headings}> South African Stats</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textDefault}>Confirmed Cases: </Text><Text style={styles.textConfirmed}>{this.state.data.Confirmed} </Text>
            <Text style={styles.textDefault}>Active Cases: </Text><Text style={styles.textActive}>{this.state.data.Active} </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textDefault}>Recovered Cases: </Text><Text style={styles.textRecovered}>{this.state.data.Recovered} </Text>
            <Text style={styles.textDefault}>Deaths: </Text><Text style={styles.textDeaths}>{this.state.data.Deaths} </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textUpdatedDate}> Last Updated at {this.state.data.Date} </Text>
          </View>
      </View>

      <SimpleMap/>

      <View>
        <Text style={styles.headings}>Global Stats </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textDefault}>Confirmed Cases: </Text><Text style={styles.textConfirmed}>{this.state.global_data.TotalConfirmed} </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textDefault}>Recovered Cases: </Text><Text style={styles.textRecovered}>{this.state.global_data.TotalRecovered} </Text>
          <Text style={styles.textDefault}>Deaths: </Text><Text style={styles.textDeaths}>{this.state.global_data.TotalDeaths} </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textUpdatedDate}> Last Updated at {this.state.date} </Text>
        </View>
      </View>
    </View> 
    );
  }
};

const styles = StyleSheet.create({
  textDefault : { textAlign: 'center', fontWeight: '600', color:'#a9a9a9', fontSize:18, paddingBottom: 10},
  textConfirmed: { textAlign: 'center', fontWeight: '600', color:'#ffce52', fontSize:18},
  textActive: { textAlign: 'center', fontWeight: '600', color:'#52b7ff', fontSize:18},
  textRecovered: { textAlign: 'center', fontWeight: '600', color:'#72ff52',fontSize:18 },
  textDeaths: { textAlign: 'center', fontWeight: '600', color:'#ff5852',fontSize:18 },
  textUpdatedDate: { textAlign: 'right', fontWeight: '400', color:'#a9a9a9',fontSize:12 },
  headings:  { textAlign: 'center', fontWeight: '700', color:'#a9a9a9',fontSize:22, paddingBottom:20, paddingTop:10}


});


