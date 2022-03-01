import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, Modal, Image, Text, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import StringConstants from '../../constants/StringConstants';

const { width, height } = Dimensions.get('window');

export default function Menu({ onItemSelected, showModal, dismissModalCallBack, isUserLogin }) {
    return (
        <Modal
            transparent={true}
            visible={showModal}
            onRequestClose={() => { console.log('close modal') }}>
            <Content style={{ flex: 1, backgroundColor: 'transparent' }} scrollEnabled={false}>
                <TouchableOpacity style={styles.mainContainer} activeOpacity={1} onPress={() => dismissModalCallBack()}>

                    <TouchableOpacity style={styles.menu}   >
                        <Text style={styles.menuLabel}>{StringConstants.MENU}</Text>

                        <View style={styles.boxContainer}>
                            <TouchableOpacity style={styles.boxTouch}
                                onPress={() => onItemSelected('Profile')}>
                                <Image style={{ height: 19, width: 19 }} source={require('../../resources/images/ic_menu_profile.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.YOUR_PROFILE}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.boxTouch, { marginStart: 10 }]}
                                onPress={() => onItemSelected('Cart')}>
                                <Image style={{ height: 16, width: 28 }} source={require('../../resources/images/ic_cart_menu.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.MARKET}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.boxTouch}
                                onPress={() => onItemSelected('Friend')}>
                                <Image style={{ height: 19, width: 19 }} source={require('../../resources/images/ic_friend_menu.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.FRIEND}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.boxTouch, { marginStart: 10 }]}
                                onPress={() => onItemSelected('Group')}>
                                <Image style={{ height: 24, width: 24 }} source={require('../../resources/images/ic_group_menu.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.GROUPS}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.boxTouch}
                                onPress={() => onItemSelected('Event')}>
                                <Image style={{ height: 19, width: 19 }} source={require('../../resources/images/ic_event_menu.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.EVENTS}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.boxTouch, { marginStart: 10 }]}
                                onPress={() => onItemSelected('Chat')}>
                                <Image style={{ height: 20, width: 28 }} source={require('../../resources/images/ic_chat_menu.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.CHAT}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.boxTouch}
                                onPress={() => onItemSelected('Invite')}>
                                <Image style={{ height: 19, width: 19 }} source={require('../../resources/images/ic_invite_menu.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.INVITE}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.boxTouch, { marginStart: 10 }]}
                                onPress={() => onItemSelected('Prayer')}>
                                <Image style={{ height: 26, width: 28 }} source={require('../../resources/images/ic_prayer_menu.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.PRAYER}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 8, }}>
                            <TouchableOpacity style={styles.boxTouch}
                                onPress={() => onItemSelected('Church')}>
                                <Image style={{ height: 19, width: 19 }} source={require('../../resources/images/ic_church_menu.png')} />
                                <Text style={styles.titleLabel}>{StringConstants.CHURCH}</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={styles.logoutContainer}
                            onPress={() => onItemSelected('Logout')}>
                            <Image style={{ height: 22, width: 22, marginStart: 30 }} source={require('../../resources/images/ic_logout.png')} />
                            <Text style={{ color: '#2D3F7B', fontSize: 14, marginStart: 10 }} numberOfLines={1} ellipsizeMode={'tail'}>{StringConstants.LOGOUT}</Text>
                        </TouchableOpacity>

                    </TouchableOpacity>

                </TouchableOpacity>
            </Content>


        </Modal>
    );
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
    name: PropTypes.string,
    image: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        // backgroundColor: '',
        justifyContent: 'flex-end',


        // alignItems: 'center',
        // flexDirection: 'column',
    },
    menu: {
        backgroundColor: '#F8F8FF',
        height: width / 0.5,
        width: '100%',
        padding: 8,
        marginTop: 90,
        alignSelf: 'flex-end',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    menuLabel: {
        fontSize: 16, color: '#707070', fontWeight: 'bold'
    },
    boxContainer: {
        flexDirection: 'row', padding: 8, justifyContent: 'center'
    },
    boxTouch: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: width / 5.76,
        width: width / 2.25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutContainer: {
        flexDirection: 'row',
        height: width / 7.5,
        width: width / 1.09,
        borderRadius: 12,
        borderColor: '#CEBFDA',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10

    },
    logoContainer: {
        height: width / 2.95,
    },
    logoImg: {
        height: width / 6.25,
        width: width / 2.46
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 25,
        marginTop: 25
    },
    itemIcon: {
        height: width / 20.8,
        width: width / 20.8
    },
    titleLabel:{ fontSize: 14, marginStart: 20, color: '#2D3F7B' },
    logoutIcon: {
        height: width / 20.8,
        width: width / 20.8
    },
    logoutLabel: {
        color: '#456AAF',
        marginStart: width / 25,
        fontSize: 16
    }
});