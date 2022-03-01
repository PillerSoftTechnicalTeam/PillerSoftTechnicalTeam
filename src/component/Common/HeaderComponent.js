import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
const { width, height } = Dimensions.get('window');
import TextDimensions from '../../resources/TextDimensions';
import Colors from '../../resources/Colors';
import Header from './Header';


export default class HeaderComponent extends React.Component {

    render() {
        const {title, tapOnBack, isEdit, tapOnEdit, customHeaderStyle, isItemSale, tapOnFilter, tapOnAdd, tapOnSearch, isGroups, tapOnSetting, customTitleStyle, isEvent, isChat } = this.props;
        return (
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: 'white',justifyContent:'space-between' }}>
                {/* <Header title={StringConstants.BACK}
                    headerStyle={[styles.headerContainer, customHeaderStyle]}
                    titleStyle={{ left: '8%', top: 200 / 12, }}
                    tapOnBack={() => tapOnBack()}
                    isAuth={false}
                /> */}
                <TouchableOpacity
                    onPress={() => { tapOnBack() }}>
                    <View>
                        <Image
                            style={styles.darkImg}
                            source={require('../../resources/images/header_purple_background.png')} />
                        <View style={[styles.titleContainer]}>
                            <Image
                                style={{ height: 12, width: 18, resizeMode: 'contain', tintColor: 'white' }}
                                source={require('../../resources/images/backward_arrow.png')}
                            />
                            <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>Back</Text>
                        </View>
                        <Image style={styles.img} source={require('../../resources/images/shadow_new.png')} />

                    </View>
                </TouchableOpacity>

                {title &&
                    <View style={{width:'45%',alignItems:'center',justifyContent:'center'}}>
                        <Text style={[styles.title, customTitleStyle]}>{title}</Text>
                    </View>
                }
                <View style={[styles.container]}>
                    {isEdit &&
                    <TouchableOpacity onPress={() => tapOnEdit()}>
                        <Image 
                        // style={{ marginTop: 20 }} 
                        source={require('../../resources/images/ic_edit.png')} />
                    </TouchableOpacity>
                   } 

                    {isItemSale &&
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => tapOnFilter()}>
                            <Image style={{  height: 30, width: 30 }} source={require('../../resources/images/ic_filter.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => tapOnAdd()}>
                            <Image style={{height: 30, width: 30, marginStart: 5 }} source={require('../../resources/images/ic_add_mp.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => tapOnSearch()}>
                            <Image style={{  height: 30, width: 30, marginStart: 5 }} source={require('../../resources/images/ic_search.png')} />
                        </TouchableOpacity>
                    </View>
                   } 

                    {isGroups &&
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => tapOnAdd()}>
                                <Image style={{  height: 30, width: 30 }} source={require('../../resources/images/ic_add_mp.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => tapOnSearch()}>
                                <Image style={{  height: 30, width: 30, marginStart: 5 }} source={require('../../resources/images/ic_search.png')} />
                            </TouchableOpacity>
                        </View>
                    }

                    {isEvent &&
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => tapOnAdd()}>
                                <Image style={{ height: 32, width: 32, marginEnd: 20 }} source={require('../../resources/images/ic_add_mp.png')} />
                            </TouchableOpacity>
                        </View>
                    }

                    {isChat &&
                        <View style={{ flexDirection: 'row', marginRight: 10, }}>

                            <TouchableOpacity onPress={() => tapOnSearch()}>
                                <Image style={{ height: 30, width: 30 }} source={require('../../resources/images/ic_search.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: 30, height: 30 }}
                                onPress={() => tapOnAdd()}>
                                <Image style={{  height: 31, width: 31, marginStart: 5, resizeMode: 'cover' }} source={require('../../resources/images/ic_dot.png')} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: { width: width / 2.8, height: width / 5.35 },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        // backgroundColor: 'red'
    },
    imageDjSantana: {
        height: '100%',
        width: width / 2.4,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    title: {
        width: '100%',
        fontSize: 14,
        color: '#707070',
        fontWeight: '600',
        textAlign: 'center',
        //  backgroundColor:'green'
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
    darkImg: {
        height: 45,
        width: 85,
        resizeMode: 'stretch',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 11,
        left: 5
    },
    img: {
        position: 'absolute',
        width: 82,
        height: 51,
        resizeMode: 'stretch',
    },
})