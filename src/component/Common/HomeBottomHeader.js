import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class HomeBottomHeader extends React.Component {

    render() {
        const {  tapOnMenu,tapOnAdd,tapOnProfile,tapOnNet } = this.props;
        return (
            <View style={{backgroundColor:'white'}}>
            <View style={styles.container}>
                <TouchableOpacity style={{}} onPress={()=>tapOnHome()}>
                    <Image style={styles.home} source={require('../../resources/images/ic_home.png')} />
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=>tapOnNet()}>
                    <Image style={styles.net} source={require('../../resources/images/ic_net.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>tapOnAdd()}>
                    <Image style={styles.add} source={require('../../resources/images/ic_add.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>tapOnProfile()}>
                    <Image style={styles.profile} source={require('../../resources/images/ic_profile.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>tapOnMenu()}>
                    <Image style={[styles.add,{marginEnd:5}]} source={require('../../resources/images/ic_grid.png')} />
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 15,
        marginEnd: 15,
        justifyContent: 'space-between',
        // marginTop: 5,
        borderBottomWidth:0.5,
        height:width/8.6,
        borderBottomColor:'#CBBBD7',
        backgroundColor:'white',
    },
    home: {
        height: width / 17.04,
        width: width / 18.75,
        marginStart:5
    },
    net: {
        height: 16,
        width: 23,
    },
    add: { height: 21, width: 21, },
    profile: { height: 21, width: 28, },
})