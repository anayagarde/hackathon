import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
 

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
//   getSelectedDayEvents = date => {
//     let markedDates = {};
//     markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
//     let serviceDate = moment(date);
//     serviceDate = serviceDate.format("DD.MM.YYYY");
//     this.setState({
//         selectedDate: serviceDate,
//         markedDates: markedDates
//     });
// };

// today = moment();
// day = today.clone().startOf('month');
// customDatesStyles = [];
// while(day.add(1, 'day').isSame(today, 'month')) {
//   customDatesStyles.push({
//     date: day.clone(),
//     // Random colors
//     style: {backgroundColor: '#'+('#00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)},
//     textStyle: {color: 'black'}, // sets the font color
//     containerStyle: [], // extra styling for day container
//     allowDisabled: true, // allow custom style to apply to disabled dates
//   });
// }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
          markedDates={this.state.markedDates}
        //   onDayPress={day => {
        //     getSelectedDayEvents(day.dateString);
        //   }
          
        // }
        //customDatesStyles={customDatesStyles}
        />

        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});