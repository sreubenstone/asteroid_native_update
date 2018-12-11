import React from 'react';
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
import { accelerometer } from "react-native-sensors";
const getAsteroids = require('./asteroid')

const fakeInput = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,]

const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
  console.log({ x, y, z, timestamp })
);

export default class App extends React.Component {

  // constructor(props) {
  //   super(props);

  //   new Accelerometer({
  //     updateInterval: 400 // defaults to 100ms
  //   }).then(observable => {
  //     observable.subscribe(({ x, y, z }) => this.setState({ x, y, z }));
  //   })
  //     .catch(error => {
  //       console.log("The sensor is not available");
  //     });

  //   this.state = { x: 0, y: 0, z: 0 };
  // }


  render() {

    console.log('state hereEEEEE:', this.state)
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            console.log('PRESSED BUTTON');
            getAsteroids(fakeInput);
          }}
          title="Get Horoscope"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text>Click the button above to see your future.</Text>
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
