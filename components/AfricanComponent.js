
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols } from 'react-native-table-component';
import {Africa} from './../constants/AfricanCountries'
 
export default class AricanComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Highest','Country','Total Confirmed','Total Deaths', 'Total Recoveries','Last Updated'],
      widthArr: [50, 90, 90, 90, 90, 120], 
      data: [{}],
      CountryCodes: null,
      countries: Africa
    
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
          
          values = data.Countries;
          var african_stats= [];
          var countries = this.state.countries;
          // Extract African stats from global stats
          for (let i = 0; i < values.length; i++){
            delete values[i].Slug;
            delete values[i].NewConfirmed; 
            delete values[i].NewDeaths; 
            delete values[i].NewRecovered; 

            for (let j = 0; j < countries.length; j++){

                if(values[i].CountryCode === countries[j].Country_Code){
                  delete values[i].CountryCode; 
                  values[i].Date =new Date(values[i].Date).toLocaleString(); 

                  african_stats.push(values[i]);
                }
              
            }
  
          }
          // sort according to number of cases
          african_stats.sort( (a,b) => b.TotalConfirmed - a.TotalConfirmed);
          this.setState({data: african_stats})
    
    }).catch(console.log)
  
  }

  
  render() {
    const state = this.state;
    const stats = this.state.data;
    const tableData = [];
    for (let i = 0; i < stats.length ; i ++) {
      const rowData = [];
      rowData.push(i+1);
      rowData.push(stats[i].Country);
      rowData.push(stats[i].TotalConfirmed);
      rowData.push(stats[i].TotalDeaths);
      rowData.push(stats[i].TotalRecovered);
      rowData.push(stats[i].Date);
      tableData.push(rowData);  
    }
   
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.headerText}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}

                   
                    />
                  ))
                }
                   {/* <Col data={state.tableHead} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                  <Rows data={tableData} flexArr={[2, 1, 1,1,1,1]} style={styles.row}/> */}

              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
  
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#a9a9a9' },
  headerText: { textAlign: 'center', fontWeight: '500', color:'#ffffff', fontSize:13 },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});