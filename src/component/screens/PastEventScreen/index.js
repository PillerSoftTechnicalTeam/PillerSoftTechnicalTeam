import React, { Component } from 'react'
import { Text, View, Dimensions, Image, FlatList, SafeAreaView } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
const { width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default class PastEventScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
            ],
            isLoading: false,
            userDetails: '',
            pastEventData: []
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getAllPastEventInfo();

                })
            }
        });
    }

    getAllPastEventInfo = () => {
        const { userDetails } = this.state;

        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetAllPastEvents',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: userDetails.Id,
                    pagenumber: 0,
                    rowsperpage: 99999,
                })
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false, pastEventData: respData.response }, () => {
                    console.log('pastEventData-->>', JSON.stringify(this.state.pastEventData))

                });


            }).catch((error) => {
                console.log(error);
            });
    }

    renderData = ({ item }) => {
        return (
            <View style={{
                marginTop: 15, backgroundColor: 'white', justifyContent: 'center', borderRadius: 15,
                marginBottom: 5, 
            }}>
                <Image style={{ width: width / 1.04, height: width / 1.9, alignSelf: 'center' }} source={{ uri: 'http://staging.godconnect.online/UploadedImages/EventImages/' + item.ImageUrl }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 8, marginEnd: 8 }}>
                    <Text style={{ marginTop: 10, color: '#530D89', fontWeight: '300', flex: 1, fontSize: 14 }}>{item.EventTitle}</Text>
                </View>
                <Text style={{ marginTop: 8, marginStart: 8, marginEnd: 8, color: '#530D89', fontWeight: 'bold', fontSize: 16 }}>{item.EventDescription}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 8, marginEnd: 8, marginTop: 8 }}>
                    <Text style={{ color: '#707070', fontWeight: '400' }}>{'Created By:'}</Text>
                    <Text style={{ marginStart: 5, marginEnd: 8, color: '#707070', textTransform: 'capitalize' }}>{item.PostedBy_Name}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 8, marginEnd: 8, marginTop: 8, }}>
                    <Text style={{ color: '#707070', fontWeight: '700' }}>{'Event Date:'}</Text>
                    <Text style={{ marginStart: 8, marginEnd: 8, color: '#707070', fontWeight: '700' }}>{moment(item.EventDate).format('L')}</Text>
                </View>
            </View>
        )
    }

    renderItem = ({ item }) => {
        console.log('item of my friends',JSON.stringify(item))
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, }}>
                <Image style={{ width: width / 7, height: width / 7 }} source={{  uri:item.ProfileImage?'http://staging.godconnect.online/UploadedImages/ProfileImages'+item.ProfileImage: 'https://godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />
                <View style={{ marginStart: 25, justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>{item.UserName}</Text>
                    <Text style={{ color: '#6C6C6C', fontSize: 12, marginTop: 4 }}>{`${item.MutualCount}${' mutual'}${item.MutualCount == 1 ? ' friend' : ' friends'}`}</Text>
                </View>
                <Button
                    title={StringConstants.BUTTON_UNFRIEND}
                    onPress={() => this.handleUnfriend(item.TRID)}
                    customStyle={[styles.publishContainer, { width: width / 3.75, borderRadius: 10, height: width / 12.5, backgroundColor: '#530D89', marginStart: 25 }]}
                    titleStyle={{ fontSize: 12 }} />
            </View>
        )
    }

    render() {
        const { data, pastEventData, friendRequestData, myFriendData } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                {/* <Content> */}
                <TitleHeader
                    customHeaderStyle={{ width: width / 2.4, }}
                    title={true} title={'PAST EVENTS'} tapOnBack={() => this.props.navigation.goBack()} />
                <View style={{ marginStart: 15, marginEnd: 15, }}>
                    {/* <View style={styles.buttonOuterContainer}>
                        <Button
                            title={StringConstants.FRIEND_REQUEST}
                            onPress={() => this.setState({ isFriendRequestList: true }, () => this.getFriendRequestData())}
                            customStyle={[styles.publishContainer, { backgroundColor: isFriendRequestList ? '#530D89' : '#CEBFDA' }]}
                            titleStyle={{ fontSize: 14, color: isFriendRequestList ? 'white' : '#530D89' }} />
                        <Button
                            title={StringConstants.YOUR_FRIEND}
                            onPress={() => this.setState({ isFriendRequestList: false }, () => this.getMyFriendData())}
                            customStyle={[styles.publishContainer, { backgroundColor: isFriendRequestList ? '#CEBFDA' : '#530D89', marginStart: 10 }]}
                            titleStyle={{ fontSize: 14, color: isFriendRequestList ? '#530D89' : 'white' }} />
                    </View> */}
                    {/* {isFriendRequestList ? <Text style={{ color: '#707070', fontSize: 14, marginTop: 10, fontWeight: 'bold' }}>{`${'Friend Request '}${friendRequestData.length}`}</Text> :
                        <Text style={{ color: '#707070', fontSize: 14, marginTop: 10, fontWeight: 'bold' }}>{`${'Your '}${myFriendData.length == 0?'Friend ':'Friends '}${myFriendData.length}`}</Text>
                    } */}
                    {

                        pastEventData.length > 0 ? <FlatList
                            style={{ marginStart: 8, marginEnd: 8,marginBottom:100 }}
                            data={pastEventData}
                            extraData={pastEventData}
                            renderItem={this.renderData}
                        /> :
                            <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 15 }}>No Data Found</Text>

                    }
                </View>

                {/* <Toast ref="toast" position={position} /> */}
                {/* </Content> */}
            </SafeAreaView>
        );
    }
}