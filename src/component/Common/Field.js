import React from 'react';
import { View, Text,StyleSheet, Dimensions, TextInput } from 'react-native';
const { width, height } = Dimensions.get('window');
import TextDimensions from '../../resources/TextDimensions';
import Colors from '../../resources/Colors';

export default class Field extends React.Component {

    render() {
        const { title, ref, showError, secureTextEntry, placeholder, onChangeText,keyboardType,maxLength } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.titleLabel}>{title}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.textInput,]}
                        onChangeText={(text) => onChangeText(text)}
                        placeholderTextColor={'white'}
                        secureTextEntry={secureTextEntry}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                    />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginStart: width / 12.5,
        marginEnd: width / 12.5,
    },
    titleLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10
    },
    inputContainer: {
        backgroundColor: '#9C5EC6',
        height: width / 8.5,
        borderRadius: 8,
        marginTop: 10
    },
    viewRight: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
    },
    touchCreate: {
        // backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: width > 500 ? 15 : 12,
        // width: 44,
        // height: 18,
        marginStart: 8,
        marginEnd: 12,
    },
    touchSearch: {
        width: height / 14.5,
        justifyContent: 'center',
        height: '100%',
        marginEnd: width / 18.75
    },
    viewSearchContainer: {
        height: '100%',
        width: width,
        position: 'absolute',
        end: 0,
        flexDirection: 'row',
        backgroundColor: Colors.BLACK,
        alignItems: 'center'
    },
    imageSearch: {
        height: width / 18.75,
        width: width / 18.75,
        resizeMode: 'contain',
        alignSelf: 'center',

    },
    textInputSearch: {
        flex: 1,
        fontSize: 16,
        color: 'white',
        paddingStart: 10,
        paddingEnd: 10
    },
    touchMic: {
        justifyContent: 'center',
        paddingEnd: 10
    },
    imageMic: {
        height: 16,
        width: 16
    },

    textNoDataFound: {
        fontSize: TextDimensions.TEXT_XL,
        color: 'white',
        textAlign: 'center',
        marginTop: height / 3
    },
    textInput: {
        flex: 1,
        height: 50,
        color: "white",
        marginStart: 10
    }
})