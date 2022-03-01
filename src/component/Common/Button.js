import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
const { width, height } = Dimensions.get('window');
import TextDimensions from '../../resources/TextDimensions';
import Colors from '../../resources/Colors';


export default class Button extends React.Component {

    render() {
        const { title, showLogo, titleStyle, customStyle, onPress } = this.props;
        return (
            <TouchableOpacity style={[styles.container, customStyle]} onPress={onPress}>
                <Text style={[styles.titleLabel,titleStyle]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4A50C',
        height: width / 9.37,
        width: width / 2.08,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    titleLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
})
