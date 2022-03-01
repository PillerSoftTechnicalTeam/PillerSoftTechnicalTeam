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

export default class FriendScreen extends Component {

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
            isFriendRequestList: true,
            friendRequestData: [],
            isLoading: false,
            userDetails: '',
            myFriendData: []
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getFriendRequestData()

                })
            }
        });
    }

    getFriendRequestData = () => {
        const { userDetails, friendRequestData } = this.state;
        this.setState({ isLoading: true });
        let body=JSON.stringify({
            Id: userDetails.Id,
            pagenumber: 0,
            rowsperpage: 99999,
        })
        console.log('friendRequestData-->>', JSON.stringify(body))

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetFriendRequests',
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
                this.setState({ isLoading: false, friendRequestData: respData.response }, () => {
                    console.log('friendRequestData-->>', JSON.stringify(friendRequestData))

                });
            }).catch((error) => {
                this.setState({ isLoading: false });
                console.log(error);
            });
    }


    getMyFriendData = () => {
        const { userDetails, myFriendData } = this.state;
        this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetMyFriends',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: userDetails.Id,
                    pagenumber: 0,
                    rowsperpage: 10,
                })
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false, myFriendData: respData.response }, () => {
                    console.log('friendRequestData-->>', JSON.stringify(myFriendData))
                });
            }).catch((error) => {
                this.setState({ isLoading: false });
                console.log(error);
            });
    }


    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }


    acceptFriendRequest = (Id, type) => {
        console.log(Id);
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/UpdateFriendRequest',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: Id,
                    Message: type
                })
            }).then((response) => response.json())
            .then((respData) => {
                console.log('respData UpdateFriendRequest',JSON.stringify(respData));
                if (respData.response.StatusCode == 1) {
                    const FilterData = this.state.friendRequestData.filter(item => item.TRID != Id);
                    this.setState({ friendRequestData: FilterData });
                }
            }).catch((error) => {
                console.log(error);

            });
    }

    handleUnfriend = (Id) => {


        console.log(Id);
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetFriendEntity',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: Id,
                })
            }).then((response) => response.json())
            .then((respData) => {

                if (respData.response.Id > 0) {
                    const resultData = respData.response;
                    resultData.CurrentStatus = "Unfriend";
                    fetch(GLOBAL.BASE_URL + 'api/CommonAPI/UnfriendRequest_Mobile',
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                resultData
                            }),
                        }).then((response) => response.json())
                        .then((respData) => {

                            if (respData.response.StatusCode == 1) {
                                const FilterData = this.state.myFriendData.filter(item => item.TRID != Id);
                                this.setState({ myFriendData: FilterData });
                            }
                        }).catch((error) => {
                            console.log(error);

                        });

                }

            }).catch((error) => {
                console.log(error);

            });
    }

    renderData = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 18 }}>
                <Image style={{ width: width / 5, height: width / 5 }} source={{ uri:item.ProfileImage?'http://staging.godconnect.online/UploadedImages/ProfileImages'+item.ProfileImage: 'https://godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />
                <View style={{ marginStart: 25 }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>{item.UserName}</Text>
                    <Text style={{ color: '#6C6C6C', fontSize: 12, marginTop: 4 }}>{`${item.MutualCount}${' mutual'}${item.MutualCount == 1 ? ' friend' : ' friends'}`}  Mutual</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                        <Button
                            title={StringConstants.BUTTON_CONFIRM}
                            onPress={() => this.acceptFriendRequest(item.TRID, 'Accepted')}
                            customStyle={[styles.publishContainer, { width: width / 3.75, borderRadius: 10, height: 30, backgroundColor: '#530D89' }]}
                            titleStyle={{ fontSize: 12 }} />
                        <Button
                            title={StringConstants.BUTTON_DELETE}
                            onPress={() => this.acceptFriendRequest(item.TRID, 'Rejected')}
                            customStyle={[styles.publishContainer, { backgroundColor: '#CEBFDA', marginStart: 10, width: width / 3.75, borderRadius: 10, height: 30, backgroundColor: '#CEBFDA' }]}
                            titleStyle={{ fontSize: 12, color: '#530D89' }} />
                    </View>
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
        const { data, isFriendRequestList, friendRequestData, myFriendData } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                {/* <Content> */}
                <TitleHeader
                    customHeaderStyle={{ width: width / 2.4, }}
                    title={true} title={'FRIENDS'} tapOnBack={() => this.props.navigation.goBack()} />
                <View style={{ marginStart: 15, marginEnd: 15, }}>
                    <View style={styles.buttonOuterContainer}>
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
                    </View>
                    {isFriendRequestList ? <Text style={{ color: '#707070', fontSize: 14, marginTop: 10, fontWeight: 'bold' }}>{`${'Friend Request '}${friendRequestData.length}`}</Text> :
                        <Text style={{ color: '#707070', fontSize: 14, marginTop: 10, fontWeight: 'bold' }}>{`${'Your '}${myFriendData.length == 0?'Friend ':'Friends '}${myFriendData.length}`}</Text>
                    }
                    {isFriendRequestList ?

                        (friendRequestData.length > 0 ? <FlatList
                            style={{ marginStart: 8, marginEnd: 8, }}
                            data={friendRequestData}
                            extraData={friendRequestData}
                            renderItem={this.renderData}
                        /> :
                            <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 15 }}>No Data Found</Text>)

                        :
                        (myFriendData.length > 0 ? <FlatList
                            style={{ marginStart: 8, marginEnd: 8, }}
                            data={myFriendData}
                            extraData={myFriendData}
                            renderItem={this.renderItem}
                        /> :
                            <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 15 }}>No Data Found</Text>)
                    }
                </View>

                {/* <Toast ref="toast" position={position} /> */}
                {/* </Content> */}
            </SafeAreaView>
        );
    }
}