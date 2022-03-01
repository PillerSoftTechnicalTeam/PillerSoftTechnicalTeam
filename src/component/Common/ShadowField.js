import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class ShadowField extends React.Component {

    render() {
        const { title, tapOnItemCallback } = this.props;
        return (
            <TouchableOpacity style={styles.outerContainer} onPress={() => tapOnItemCallback()}>
                <Text style={styles.label}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        height: width / 7.5,
        width: width / 1.09,
        shadowColor: '#707070',
        shadowOpacity: 0.1,
        borderRadius: 15,
        backgroundColor: 'grey',
        padding: 15,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        alignSelf: 'center'
    },
    label: {
        flex: 1,
        color: '#707070',
        fontSize: 14
    }
})