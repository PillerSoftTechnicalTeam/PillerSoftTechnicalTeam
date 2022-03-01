import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, Modal, Image } from 'react-native';
import { BottomSheet, ListItem, Avatar } from 'react-native-elements';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Colors from '../layout/Colors';
// import countries from '../utils/countries';
// import CountryIcon from '../assets/images/icons/gender.svg';
// import Layout from '../layout/Layout';
import { Content } from 'native-base';
const { width } = Dimensions.get('window')
import Button from '../Common/Button';
import GLOBAL from '../../constants/ApiConstants';

import StringConstants from '../../constants/StringConstants';
// import Font from '../layout/Font';
class InviteGroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            name: null,
            countryId: '',
            email: ''
        };
    }

    selectGender(item) {
        this.setState({ name: item }, () => {
            this.props.parentReference(item)
        });
        this.toggleSelect();
    }

    toggleSelect() {
        // alert('Under development')
        // return
        this.setState({ isVisible: !this.state.isVisible });
    }

    renderItem = ({ item }) => {

        return (
            <TouchableOpacity activeOpacity={0.9} style={{
                backgroundColor: 'white', height: width / 9.7, width: width / 1.37, alignSelf: 'center'
            }} onPress={() => this.selectGender(item)}>
                <Text style={{ marginStart: 15, color: '#530D89', fontSize: 16 }}>{item}</Text>
            </TouchableOpacity>
        )
    }

    onChangeEmail = (text) => { this.setState({ email: text }) }

    onPressInvite = (id) => {
        const { userDetails, EventId } = this.props;
        console.log('userDetails invite-->>', JSON.stringify(userDetails))

        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + `api/CommonAPI/InviteToGroup`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        Id: userDetails.Id,
                        pagenumber: 0,
                        rowsperpage: 99,
                        Message: this.state.email,
                        UserId: userDetails.Id,
                        // "src": "string",
                        // "mktCatId": 0,
                        // "mktSubCatId": 0,
                        // "search": "string",
                        // "FriendId": 0,
                        // "countryCode": "string",
                        // "mobileNumber": "string"
                })
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false, }, () => {
                    console.log('respData invite-->>', JSON.stringify(respData))
                    alert(respData.response.Message)
                    this.props.dismissModalCallback()
                    // this.getAllFutureEventInfo()
                });


            }).catch((error) => {
                console.log(error);
            });

    }



    render() {
        const { countryList, showModal, inviteFriend, dismissModalCallback } = this.props;
        return (
            <Modal
                // isVisible={this.state.isVisible}
                // containerStyle={{ }}
                transparent={true}
                animationType={'fade'}
                showModal={showModal}
                onRequestClose={() => { }}>
                <Content style={styles.rootContainerMain}>
                    <View style={{ marginTop: 160, alignSelf: 'center', backgroundColor: 'white', width: width / 1, paddingStart: 10, }}>
                        {/* <TextInput
                        style={{ height: width / 7.5, width: width/1.2, color: 'black',}}
                        // onChangeText={(text) => this.setState({ age: text })}
                        onChangeText={(text) => onChangeSearch(text)}
                        placeholder={"Search here..."}
                        placeholderTextColor={'#707070'} /> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, borderBottomColor: '#B7B0B0', borderBottomWidth: 0.2, height: 50, marginEnd: 15 }}>
                            <Text style={{ fontSize: 24, flex: 1, textAlign: 'center' }}>Invite to Group</Text>
                            <TouchableOpacity onPress={() => dismissModalCallback()}>
                                <Image style={{ width: 26, height: 26, marginEnd: 8 }} source={require('../../resources/images/ic_close.png')} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 14, marginTop: 45, marginEnd: 10, marginStart: 10 }}>Enter the Email address to Invite a friend to join the group!</Text>
                        <View style={{
                            height: width / 7, marginTop: 25,
                            marginBottom: width / 7.9,
                            width: width / 1.09,
                            borderRadius: 15,
                            // padding: 12,
                            flexDirection: 'row',
                            // alignItems: 'flex-start',
                            elevation: 5, shadowColor: '#000',
                            shadowOffset: { width: 1, height: 1 },
                            backgroundColor: 'white',
                            shadowOpacity: 0.2,
                            shadowRadius: 2, marginEnd: 10, marginStart: 10
                        }}>
                            <TextInput
                                style={{ fontSize: 14, height: width / 7, marginStart: 8, color: 'black' }}
                                placeholder={"Email ID"}
                                placeholderTextColor={'#707070'}
                                onChangeText={(text) => this.onChangeEmail(text)} />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30, alignSelf: 'center', marginBottom: width / 7.9, }}>
                            <Button
                                title={StringConstants.INVITE_FRIEND}
                                onPress={() => this.onPressInvite()}
                                customStyle={{ backgroundColor: '#530D89', width: width / 2.5, height: width / 9.71 }}
                                titleStyle={{ fontSize: 14 }} />
                            <Button
                                title={StringConstants.CANCEL}
                                onPress={() => dismissModalCallback()}
                                customStyle={[styles.publishContainer, { backgroundColor: '#CEBFDA', marginStart: 10, width: width / 2.5, height: width / 9.71 }]}
                                titleStyle={{ fontSize: 14, }} />
                        </View>
                    </View>
                </Content>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rootContainerMain: {
        backgroundColor: '#00000060',
        flex: 1,
    },
    iconWrapper: {
        paddingHorizontal: 8,
    },
    countryPlaceHolderText: {
        fontSize: 16,
        color: '#707070',
        marginStart: 8
    },
    selectedCountryText: {
        fontSize: 16,
        color: 'black', marginStart: 8
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: Layout.window.width * 0.43,
        width: width / 1.09,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
});
InviteGroupModal.propTypes = {
    selectContainerStyles: PropTypes.object,
};

export default InviteGroupModal;
