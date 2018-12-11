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
const getAsteroids = require('./asteroid')

const fakeInput = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,]

export default class App extends React.Component {

  state = {
    input: false
  }

  toggleState = () => {
    this.setState({ input: !this.state.input })
  }

  render() {
    return (
      <View>
        {(this.state.input === false) ?
          <View style={styles.container}>
            <Button
              onPress={() => {
                console.log('PRESSED BUTTON');
                this.toggleState();
              }}
              title="Get Horoscope"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Text>Click the button above to see your future.</Text>
          </View>

          : <View> <Gyro /> <Button
            onPress={() => {
              console.log('PRESSED BUTTON');
              this.toggleState();
            }}
            title="Get Horoscope"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          </View>
        }

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
