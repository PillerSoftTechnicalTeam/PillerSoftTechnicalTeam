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
class EventStaticsModal extends Component {
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
        const { userDetails, EventItem } = this.props;

        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + `api/CommonAPI/InviteToEvent?userId=${userDetails.Id}&emailIds=${this.state.email}&eventId=${EventId}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: undefined
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
        const { countryList, showModal, EventItem, dismissModalCallback } = this.props;
        console.log('EventItem EventItem-->>', JSON.stringify(EventItem))

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
                            <Text style={{ fontSize: 24, flex: 1, textAlign: 'center' }}>Event Statics</Text>
                            <TouchableOpacity onPress={() => dismissModalCallback()}>
                                <Image style={{ width: 26, height: 26, marginEnd: 8 }} source={require('../../resources/images/ic_close.png')} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 16, marginTop: 45, marginEnd: 10, marginStart: 10 }}>Take a Quick look at your Event Attendance</Text>
                        <View style={{
                            height: width / 4, marginTop: 25,
                            marginBottom: width / 7.9,
                            width: width / 1.2,
                            // borderRadius: 15,
                            // padding: 12,
                            flexDirection: 'row',
                            // alignItems: 'flex-start',
                            // elevation: 5, shadowColor: '#000',
                            // shadowOffset: { width: 1, height: 1 },
                            backgroundColor: 'white',
                            shadowOpacity: 0.2,
                            // shadowRadius: 2, 
                             borderWidth:1,borderColor:'gray',alignSelf:'center',alignItems:'center'
                        }}>
                            <View style={{borderRightWidth:1,width:width/2.3,height:100,borderRightColor:'gray',justifyContent:'center'}}>
                            <Text style={{ fontSize: 20,  textAlign: 'center',color:'black' }}>{EventItem.TotalInterest == null?0:EventItem.TotalInterest}</Text>
                            <Text style={{ fontSize: 16,  textAlign: 'center',color:'gray',marginTop:10 }}>{'Intrested'}</Text>

                            </View>
                            <View style={{borderRightWidth:1,width:width/2.3,height:100,justifyContent:'center'}}>
                            <Text style={{ fontSize: 20,  textAlign: 'center' }}>{EventItem.ApproxAttend}</Text>
                            <Text style={{ fontSize: 16,  textAlign: 'center',color:'gray',marginTop:10 }}>{'Expected'}</Text>
                            </View>
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
EventStaticsModal.propTypes = {
    selectContainerStyles: PropTypes.object,
};

export default EventStaticsModal;
