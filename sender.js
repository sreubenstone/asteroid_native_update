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
                        <Text>{this.props.message}</Text>
                        <Button
                            onPress={() => {
                                sendSMS({ variables: { number: this.state.text, body: this.props.message } })

                            }}
                            title="Send detailed horoscope"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <TextInput
                            style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ text })}
                            // value={this.state.text}
                            keyboardType="number-pad"
                        />
                        <Button
                            onPress={() => {
                                this.props.reset()
                            }}
                            title="reset"
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
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});


