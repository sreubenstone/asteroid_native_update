import React from 'react';

import {
    Gyroscope,
} from 'expo';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


array = []

export default class GyroscopeSensor extends React.Component {
    state = {
        gyroscopeData: {},
    }

    componentDidMount() {
        this._toggle();
        Gyroscope.setUpdateInterval(1000);
    }

    componentWillUnmount() {
        this._unsubscribe();
        this.props.funky(array)
    }

    updateArray = (input) => {
        if (input.x > 0 && input.y > 0) {
            array.push(1);
        } else if (input.x < 0 && input.y < 0) {
            array.push(2);

        } else if (input.x > 0 && input.y < 0) {
            array.push(3);
        } else {
            array.push(4)
        }
    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    }


    _subscribe = () => {
        this._subscription = Gyroscope.addListener((result) => {
            this.setState({ gyroscopeData: result });
        });
    }

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    }

    render() {
        let { x, y, z } = this.state.gyroscopeData;
        this.updateArray(this.state.gyroscopeData)
        return (
            <View style={styles.sensor}>
                <View style={styles.grid}>
                    <Image source={require('./meteor.png')} style={{ width: 101, height: 101 }} />
                </View>
                <Text> </Text>
                <Text>AstroScope is currently feeling your rhythms...MOVE your body (and the phone)!</Text>
                <Text> </Text>
                <Text> </Text>
                <Text>Gyroscopic Reading:</Text>
                <Text> </Text>
                <View style={styles.text}>
                    <Text style={styles.text}>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
                </View>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
                <Text> ...contacting Nasa</Text>
            </View>
        );
    };
}

function round(n) {
    if (!n) {
        return 0;
    }

    return Math.floor(n * 100) / 100;
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    sensor: {
        marginTop: 15,
        paddingHorizontal: 10,
    },
});