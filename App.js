import React from 'react';
import Gyro from './input';
import {
  Gyroscope,
} from 'expo';
import {
  Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// const getAsteroids = require('./asteroid')
const executeHoroscope = require('./algo')
const horoscopes = require('./horoscopes');



export default class App extends React.Component {

  state = {
    input: false,
    data: [],
    horoscope: false,
    horo_data: ''
  }

  getAsteroids = async (input) => {
    console.log('starting program')

    try {
      const asteroidsData = await fetch(
        'https://api.nasa.gov/neo/rest/v1/feed/today?detailed=false&api_key=DEMO_KEY',
      );

      const fixedNative = JSON.parse(asteroidsData._bodyInit)
      const keyArray = Object.keys(fixedNative.near_earth_objects)
      const key1 = keyArray[0]
      const asteroids = fixedNative.near_earth_objects[key1]
      const h = executeHoroscope(input, asteroids)
      console.log('horoscope h:', h)
      const horoscope = horoscopes[h].body
      console.log('horo in app.js:', horoscope)
      this.setState({ horoscope: true, horo_data: horoscope })

    } catch (error) {
      console.log(error)
    }
  }

  toggleState = () => {
    this.setState({ input: !this.state.input })
  }

  setTim = () => {
    setTimeout(() => {
      this.setState({ input: false });
    }, 10000);
  }

  updateData = (array) => {
    this.setState({ data: array },
      () => {
        this.getAsteroids(this.state.data);

      })
  }

  render() {
    console.log('state:', this.state)
    return (
      <View style={styles.container}>
        {(this.state.input === false) ?
          <View style={styles.container}>
            <Button
              onPress={() => {
                console.log('PRESSED BUTTON');
                this.toggleState();
                this.setTim();
              }}
              title="Get Horoscope"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Text>Click the button above to see your futureee.</Text>
          </View>
          : <Gyro funky={this.updateData} />
        }

        {(this.state.horoscope === true) ?
          <View style={styles.container}>
            <Text>{this.state.horo_data}</Text></View> : null}

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});