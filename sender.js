import React from 'react';
import { Button } from 'react-native-elements';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';

import { Mutation } from "react-apollo";
import { SEND } from "./queries.js";

// { variables: { agentNumber: agentNumber, customerNumber: key.Phone, customerID: key.Id } }

export default class sender extends React.Component {
    state = {
        text: ''
    }

    render() {
        return (
            <Mutation mutation={SEND} >
                {sendSMS => (
                    <View style={styles.container}>
                        <Image source={require('./meteorite.png')} style={{ width: 80, height: 80 }} />

                        <View style={styles.grid}>
                            <Text style={styles.header} >    My AstroScope</Text>
                        </View>
                        <Text> </Text>
                        <View styles={styles.grid}>
                            <Text style={styles.text}>{this.props.message}</Text>
                            <Text> </Text>
                            <TextInput
                                style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
                                onChangeText={(text) => this.setState({ text })}
                                // value={this.state.text}
                                keyboardType="number-pad"
                            />
                            <Text> </Text>
                            <Text> (enter your number)</Text>
                        </View>
                        <Text> </Text>
                        <Button
                            onPress={() => {
                                sendSMS({ variables: { number: this.state.text, body: this.props.message } })

                            }}
                            title="Send detailed horoscope"
                            buttonStyle={{
                                backgroundColor: "rgba(92, 99,216, 1)",
                                width: 300,
                                height: 34,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                            placeholder='enter your number here'
                        />

                        <Text> What you will receive:</Text>
                        <Text> - Information on your Gyro </Text>
                        <Text> - Information on your Space Objects</Text>
                        <Text> - Complete life clarity </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Button
                            onPress={() => {
                                this.props.reset()
                            }}
                            title="reset"
                            buttonStyle={{
                                backgroundColor: 'gray',
                                width: 55,
                                height: 30,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                )}
            </Mutation>
        )
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    decor: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        color: '#B63B7B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 35,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
