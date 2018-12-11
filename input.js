import React from 'react';

import {
    Gyroscope,
} from 'expo';
import {
    StyleSheet,
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
                <Text>Gyroscope:</Text>
                <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
                <Text>Astroscope is currently feeling your rhythms...</Text>
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