import React from 'react';
import Gyro from './input';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Sender from './sender';
import { Button } from 'react-native-elements';
import {
  Gyroscope,
} from 'expo';
import {
  Image,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
// const getAsteroids = require('./asteroid')
const executeHoroscope = require('./algo')
const horoscopes = require('./horoscopes');

const client = new ApolloClient({
  uri: "https://53d547ed.ngrok.io/graphql"
});

export default class App extends React.Component {

  state = {
    input: false,
    data: [],
    horoscope: null,
    horo_data: '',
    name: '',
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
      const ho = executeHoroscope(input, asteroids)
      const h = ho.h
      const horoscope = horoscopes[h].body
      console.log('horo in app.js:', horoscope)
      this.setState({ horoscope: true, horo_data: horoscope, name: ho.name })

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

  reset = () => {
    this.setState({
      input: false,
      data: [],
      horoscope: null,
      horo_data: ''
    })
  }

  render() {
    console.log('state:', this.state)
    const sms_body = `Horoscope: ${this.state.horo_data}. Your asteroid's name: ${this.state.name} -- AstroScope`
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>

          {(this.state.horoscope === null) ?

            (this.state.input === false) ?

              <View style={styles.grid}>
                <Image source={require('./meteorite.png')} style={{ width: 80, height: 80 }} />
                <Text> </Text>
                <Button
                  onPress={() => {
                    console.log('PRESSED BUTTON');
                    this.toggleState();
                    this.setTim();
                  }}
                  title="Get My AstroScope"
                  buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 250,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                  }}
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
                <Text> </Text>
                <View >
                  <View styles={styles.decor} >
                    <Text >        (Click the button above to see your future)</Text>
                  </View>
                  <Text> </Text>
                  <Text>1. AstroScope tracks your motions for 10 seconds.</Text>
                  <Text> </Text>
                  <Text>2. AstroScope checks the nearest 7 space objects to Earth through Nasa's Live API.</Text>
                  <Text> </Text>
                  <Text>3. AstroScope's ancient formula predicts your future based on your movements and nearest asteroids to Earth.</Text>
                </View>
              </View>
              : <Gyro funky={this.updateData} /> : null
          }

          {(this.state.horoscope === true) ?
            <Sender horo={this.state.horo_data} message={sms_body} reset={this.reset} /> : null}
        </View>
      </ApolloProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 25
  },
  grid: {
    alignItems: 'center'
  },
  decor: {
    justifyContent: 'center',
  }
});