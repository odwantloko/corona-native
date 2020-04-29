
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols } from 'react-native-table-component';
 
export default class GlobalStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Highest','Country','Total Confirmed','Total Deaths','', 'Total Recoveries','','Last Updated'],
      widthArr: [50, 120, 90, 90, 55,90, 55,110], 
      data: [{}],
      CountryCodes: null
    
    }
  }

componentDidMount = () => {
    let postOptions = {};
    postOptions.method = 'GET';
    postOptions.headers = {};
  
  let values = [{}];
  let arr = [];

		
    fetch('https://api.covid19api.com/summary', postOptions)
        .then(res => res.json())
        .then((data) => {

    values = data.Countries
    values.sort( (a,b) => b.TotalConfirmed - a.TotalConfirmed);
      
			
		for (let i=0; i < values.length; i++){
			let obj ={};
			let DeathRatio = (values[i].TotalDeaths/values[i].TotalConfirmed * 100).toFixed(2);
			let RecoveryRatio = (values[i].TotalRecovered/values[i].TotalConfirmed * 100).toFixed(2);

			if(RecoveryRatio !=="NaN"){
				obj.Country = values[i].Country;
				obj.TotalConfirmed = values[i].TotalConfirmed;
				obj.TotalDeaths = values[i].TotalDeaths;
				obj.DeathRatio = DeathRatio + "%";
				obj.TotalRecovered = values[i].TotalRecovered;
				obj.RecoveryRatio = RecoveryRatio +"%";
				obj.Date = new Date(values[i].Date).toLocaleString();
			
				
			}else{
				obj.Country = values[i].Country;
				obj.TotalConfirmed = values[i].TotalConfirmed;
				obj.TotalDeaths = values[i].TotalDeaths;
				obj.DeathRatio = "0.00%";
				obj.TotalRecovered = values[i].TotalRecovered;
				obj.RecoveryRatio ="0.00%";
				obj.Date = new Date(values[i].Date).toLocaleString();
			}


			
			arr.push(obj)
		}
		
		this.setState({data: arr})
		
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
      rowData.push(stats[i].DeathRatio);
      rowData.push(stats[i].TotalRecovered);
      rowData.push(stats[i].RecoveryRatio);
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
                      style={[styles.row, index%2 && {backgroundColor: '#fff'}]}
                      textStyle={styles.text}

                   
                    />
                  ))
                }

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
  header: { height: 50, backgroundColor: '#ff5852' },
  headerText: { textAlign: 'center', fontWeight: '500', color:'#ffffff', fontSize: 13 },
  text: { textAlign: 'center', fontWeight: '300' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#ffbaba' }
});
