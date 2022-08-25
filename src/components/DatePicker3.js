import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {FlatList} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
      minDate: moment().set('date', 1),
      maxDate: moment().set('date', 31),
      diz: null,
    };
  }

  componentDidMount() {
    console.log('componendidmont');
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.endDate !== prevState.endDate) {
      AsyncStorage.getItem('postId').then(async res => {
        const AsyncStorageValue = JSON.parse(res);
        let deneme = moment(this.state.startDate).format('YYYY-MM-DD');
        let deneme2 = moment(this.state.endDate).format('YYYY-MM-DD');
        let filtreocr = {
          endeksStartDate: deneme,
          endeksEndDate: deneme2,
          postId: AsyncStorageValue,
        };
        console.log('filtreocr', filtreocr);
        if (this.state.endDate != null) {
          await axios
            .post('http://10.110.213.34:9090/ocr/ocrfilter', filtreocr)
            .then(response => {
              this.setState({diz: response.data});
            });
        }
      });
    }
  }

  setDates = dates => {
    this.setState({
      ...dates,
    });
  };

  renderUser = ({item, index}) => {
    return (
      <View style={styles.renderView}>
        <Text style={styles.text}>Tarih: {item.createdDateTime}</Text>
        <Text style={styles.text}>Endeks: {item.endeks}</Text>
      </View>
    );
  };
  render() {
    const {startDate, endDate, displayedDate, minDate, maxDate} = this.state;
    console.log('diz', this.state.diz);
    console.log('startdate', startDate);
    console.log('enddate', endDate);
    // moment().subtract(10, 'days').calendar()
    // format '2019-06-01': YYYY-MM-DD
    return (
      <View style={styles.container}>
        <DateRangePicker
          onChange={this.setDates}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          range
          dayHeaderStyle={styles.dayHeaderStyle}
          displayedDate={displayedDate}
          containerStyle={styles.pickercontain}
          backdropStyle={styles.backdropStyle}
          headerStyle={styles.headerStyle}>
          <View style={styles.textView}>
            <Text style={styles.text}>Tarih Belirle</Text>
          </View>
        </DateRangePicker>
        <FlatList
          data={this.state.diz}
          renderItem={this.renderUser}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  dayHeaderStyle: {},
  pickercontain: {
    marginBottom: 170,
  },
  backdropStyle: {},
  headerStyle: {},
  renderView: {
    backgroundColor: '#292c2d',
    padding: 7,
    marginVertical: 2,
    marginHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textView: {
    backgroundColor: '#292c2d',
    padding: 7,
    marginVertical: 2,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    color: '#a8a8a8',
    fontSize: 15,
  },
});
