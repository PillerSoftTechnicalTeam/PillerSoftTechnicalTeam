import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, ScrollView, Image, ImageBackground, FlatList, Alert, alert } from 'react-native'
import styles from './styles'
import Header from '../../Common/Header';
import Toast, { DURATION } from 'react-native-easy-toast'
import StringConstants from '../../../constants/StringConstants';
import HeaderComponent from '../../Common/HeaderComponent';
import TitleHeader from '../../Common/TitleHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import GLOBAL from '../../../constants/ApiConstants';
import ImagePicker from 'react-native-image-crop-picker';
import AppConstants from '../../../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
// const selected = require('../resources/images/check_box.png')
// const unselected = require('../resources/images/check_box_blue.png')
import ImgToBase64 from 'react-native-image-base64';
import Video from 'react-native-video';
import moment from 'moment';

export default class OthersProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: this.props.route.params.Item,
            loggedInUserDetail: '',
            value: '',
            password: '',
            coverPhoto: '',
            selectedImageBase64: '',
            profilePhoto: '',
            selectedProfileBase64: '',
            imageName: '',
            myFriendData: [],
            postData: [],
            friendRequestText: 'Add Friend',

        }
    }

    componentDidMount() {
        // console.log('===============================', this.state.userData)
        // console.log('================================', AsyncStorage.getItem(AppConstants.USER_DETAILS))
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            // console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                this.setState({ loggedInUserDetail: JSON.parse(user_details) }, () => {
                    // this.getLiveUsers()

                })
            }
        });
    }



    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }

    renderItem = ({ item }) => {
        return (
            <View style={{ marginStart: 8, alignItems: 'center' }} >
                <Image style={{ height: width / 3.12, width: width / 3.12 }} source={{ uri: 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + item.ProfileImage }} />
                <Text style={{ fontSize: 14, color: "#444D6E", marginTop: 10 }}>{item.UserName}</Text>
            </View>
        )
    }

    renderData = ({ item }) => {
        return (
            <View style={{ marginTop: 20, backgroundColor: "white", borderRadius: 8, padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: width / 9.8, width: width / 9.8 }} source={item.image} />
                    <View style={{ marginStart: 8 }}>
                        <Text style={{ fontSize: 16, color: '#707070', marginTop: 5, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text style={{ fontSize: 12, color: '#BABDC9', marginTop: 1 }}>{item.date}</Text>

                    </View>

                </View>
                <Text style={{ fontSize: 13, color: '#444D6E', marginTop: 10, }}>{item.description}</Text>

                <Image style={{ height: width / 1.39, width: width / 1.0, marginTop: 10, borderRadius: 10 }} source={item.post_image} />

                <View style={{ flexDirection: 'row', marginTop: 8, marginStart: 10, alignItems: 'center', borderBottomWidth: 0.2, borderBottomColor: '#707070', height: 60 }}>
                    <View style={{ flex: 0.5, flexDirection: 'row', }}>
                        <Image style={{ height: 20, width: 20, }} source={item.like} />
                        <Image style={{ height: 20, width: 20, marginStart: 50 }} source={item.comment} />
                    </View>

                    <View style={{ flex: 0.55, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, color: '#747EA0' }}>{'30 Comments 50'}</Text>
                        <Image style={{ height: 20, width: 20, marginStart: 10 }} source={item.likeBg} />
                        <Image style={{ height: 20, width: 20, }} source={item.heart} />
                    </View>
                </View>
            </View>
        )
    }


    getMyFriendData = () => {
        const { loggedInUserDetail, myFriendData } = this.state;
        this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetMyFriends',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: loggedInUserDetail.Id,
                    pagenumber: 0,
                    rowsperpage: 10,
                })
            }).then((response) => response.json())
            .then((respData) => {
                console.log('myFriendData res-->>', JSON.stringify(respData))

                this.setState({ isLoading: false, myFriendData: respData.response }, () => {
                    console.log('myFriendData-->>', JSON.stringify(myFriendData))
                });
            }).catch((error) => {
                this.setState({ isLoading: false });
                console.log(error);
            });
    }


    tapOnLike = (item, index) => {
        const { loggedInUserDetail } = this.state;
        // console.log('item tapOnLike-->>', JSON.stringify(item));

        if (item.IsPostedLikedByYou == true) {
            this.hitDislikeApi(item, index)
        } else {

            let body = JSON.stringify({
                PostId: item.Id,
                LikedBy: loggedInUserDetail.Id
            })
            // console.log('body tapOnLike-->>', JSON.stringify(body));
            fetch(GLOBAL.BASE_URL + 'api/CommonAPI/LikePost',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PostId: item.Id,
                        LikedBy: loggedInUserDetail.Id
                    })

                }).then((response) => response.json())
                .then((responsedata) => {
                    if (responsedata.response.StatusCode == 1) {
                        // console.log('index ' + index);
                        // console.log(this.state.postData);
                        const posts = this.state.postData;
                        // console.log(' from duplicate ' + posts);
                        const targetpost = posts[index];
                        targetpost.IsPostedLikedByYou = true;
                        targetpost.Likes += 1;
                        posts[index] = targetpost;
                        this.setState({ postData: posts });

                    }
                }).catch(error => {
                    setTimeout(() => {
                        // Alert.alert("Alert!", `Error : ${error}`);
                    }, 100);
                });
        }
    }

    _updateRecipients = () => {
        this.getPostData();
    }

    sendFriendRequest = () => {
        const { loggedInUserDetail, userData } = this.state;
        // this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/SaveFriendRequest',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserId: loggedInUserDetail.Id,
                    FriendId: userData.Id,
                    RequestedBy: loggedInUserDetail.Id
                })
            }).then((response) => response.json())
            .then((respData) => {

                console.log('respData SaveFriendRequest', JSON.stringify(respData));
                if (respData.response.StatusCode == 1) {
                    this.setState({friendRequestText: 'Request Sent'}, ()=>{
                        Alert.alert('Success', `You have sent friend request to ${userData.PostedByName}`)
                    })
                    // console.log('Sent successfully');
                    // AsyncStorage.setItem('requestSent', respData.response)
                    // console.log(FilterData);
                   

                }
                this.setState({ isLoading: false });

            }).catch((error) => {
                console.log(error);

                this.setState({ isLoading: false });

            });
    }

    render() {
        const { loggedInUserDetail, friendRequestText, userData, coverPhoto, myFriendData, postData } = this.state;
        // console.log('userData-->>', JSON.stringify(userData))
        let url = userData.ProfileImage != null ? 'http://staging.godconnect.online/UploadedImages/ProfileImages' + userData.ProfileImage : require('../../../resources/images/ic_dummy_user.png')
        // console.log('userData url-->>', JSON.stringify(url))

        let uri = userData.CoverImg != null ? 'http://staging.godconnect.online/UploadedImages/CoverIMages/' + userData.CoverImg : require('../../../resources/images/ic_cover_profile.png')
        let uriProfileImg = userData.ProfileImage
        // console.log('userData uri-->>', JSON.stringify(uri))

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <ScrollView nestedScrollEnabled={true}>
                    <HeaderComponent
                        title={true}
                        title={userData.PostedByName}
                        tapOnBack={() => this.props.navigation.goBack()} />


                    <View style={{ minHeight: width / 1.2, }}>
                        <ImageBackground resizeMode='stretch' style={{ width: width, height: width / 1.65, padding: 10, alignSelf: 'center' }} source={{ uri: userData.CoverImg != null ? 'http://staging.godconnect.online/UploadedImages/CoverIMages/' + userData.CoverImg : 'http://staging.godconnect.online/UploadedImages/CoverIMages/dummy.png' }}>

                            <Image style={styles.user} source={{ uri: userData.ProfileImage != null ? 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + userData.ProfileImage : 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />

                        </ImageBackground>
                    </View>
                    <Text style={styles.name}>{userData.PostedByName}</Text>
                    {/* <Text style={styles.job}> UI/UX Designer |  Developer </Text> */}

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.msgContainer} onPress={() => this.props.navigation.navigate('ChatScreen', { senderId: userData.Id })}>
                            <Image style={{ height: 15, width: 15, }} source={require('../../../resources/images/ic_message_profile.png')} />
                            <Text style={{ fontSize: 14, color: 'white', marginStart: 8 }}>{StringConstants.MESSAGE}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editContainer}
                            onPress={() => this.sendFriendRequest()}>
                            <Image style={{ height: 17, width: 17, tintColor: '#530D89' }} resizeMode='contain' source={require('../../../resources/images/add-friend.png')} />
                            <Text style={{ fontSize: 14, color: '#530D89', marginStart: 5 }}>{friendRequestText}</Text>
                        </TouchableOpacity>

                    </View>



                    <Field
                        src={require('../../../resources/images/ic_about.png')}
                        title={'See More About ' + userData.PostedByName}
                        onPress={() => this.props.navigation.navigate('AboutMeScreen', { userName: userData.PostedByName })}

                    />
                    <View style={{ flexDirection: 'row' }}>
                        {myFriendData.length == 0 ?
                            <Text style={[styles.friendNum, { flex: 1 }]}>{'No Friend Found'}</Text>
                            :
                            <Text style={[styles.friendNum, { flex: 1 }]}>{'Friends List'}</Text>
                        }
                        {myFriendData.length > 0 &&
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendScreen')}>
                                <Text style={[styles.friendNum, { marginEnd: 15 }]}>{'See All'}</Text>
                            </TouchableOpacity>}
                    </View>
                    {myFriendData.length > 0 && <View style={{ minHeight: 110 }}>
                        <FlatList
                            style={{ marginStart: 15, marginEnd: 15, marginTop: 15, }}
                            data={myFriendData}
                            extraData={myFriendData}
                            renderItem={this.renderItem}
                            horizontal={true} />
                    </View>}
                    <View style={{ minHeight: width / 3.40, }}>
                        {postData.map((item, index) => {
                            return (
                                <View style={{ marginTop: 10, backgroundColor: "white", borderRadius: 8, padding: 5, marginStart: 10, marginEnd: 10, }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ height: width / 9.8, width: width / 9.8 }} source={{ uri: item.ProfileImage ? 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + item.ProfileImage : 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />
                                        <View style={{ marginStart: 8 }}>
                                            <Text style={{ fontSize: 16, color: '#707070', marginTop: 5, fontWeight: 'bold' }}>{item.PostedByName}</Text>
                                            <Text style={{ fontSize: 12, color: '#BABDC9', marginTop: 1 }}>{moment(item.PostedOn).format('LL')}</Text>

                                        </View>

                                    </View>
                                    <Text style={{ fontSize: 13, color: '#444D6E', marginTop: 10, }}>{item.PostDescription}</Text>

                                    {/* <Image style={{ height: width / 1.44, width: width / 1.07, marginTop: 10, borderRadius: 10 }} source={item.post_image} /> */}
                                    {
                                        item.ContentType == 'Image' ?
                                            <Image style={styles.postImg} source={{ uri: GLOBAL.BASE_URL + '/UploadedImages/' + item.PostedObjectsm }} />
                                            :
                                            <Video source={{ uri: GLOBAL.BASE_URL + "/UploadedVideos/" + item.PostedObjectsm }}   // Can be a URL or a local file.
                                                ref={(ref) => {
                                                    this.player = ref
                                                }}
                                                playInBackground={false}
                                                // Store reference
                                                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                                // onError={this.videoError}               // Callback when video cannot be loaded
                                                style={{
                                                    width: width - 50,
                                                    height: 300
                                                }} />
                                    }

                                    <View style={styles.dataBottomLeftContainer}>
                                        <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => this.tapOnLike(item, index)}>
                                                <Image style={{ height: 18, width: 18, }} source={require('../../../resources/images/ic_like.png')} />
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 16, color: '#747EA0', marginStart: 8 }}>{item.Likes == null ? 0
                                                : (item.Likes == 1 ? item.Likes.toString()
                                                    : item.Likes.toString())}</Text>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CommentScreen', { id: item.Id, goBack: this._updateRecipients.bind(this) })
                                            } >
                                                <Image style={{ height: 18, width: 18, marginStart: width / 7.5 }} source={require('../../../resources/images/ic_comment.png')} />
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 16, color: '#747EA0', marginStart: 8 }}>{
                                                item.Reviews == null ? 0
                                                    : (item.Reviews == 1 ? item.Reviews.toString()
                                                        : item.Reviews.toString())}</Text>
                                        </View>

                                        <View style={{ flex: 0.55, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            {/* <Text style={{ fontSize: 16, color: '#747EA0' }}>{
                                item.Reviews == null ? 0 + " Comments"
                                    : (item.Reviews == 1 ? item.Reviews.toString() + ' Comment'
                                        : item.Reviews.toString() + ' Comments')}<Text>{item.Likes == null ? 0
                                            : (item.Likes == 1 ? item.Likes.toString()
                                                : item.Likes.toString())}</Text></Text> */}
                                            {/* <Image style={{ height: 22, width: 22, marginStart: 10 }} source={require('../../../resources/images/ic_like.png')} />
                            <Image style={{ height: 22, width: 22, }} source={require('../../../resources/images/ic_heart.png')} /> */}
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                    {/* <Toast ref="toast" position={position} /> */}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const Field = ({ src, onPress, title }) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginStart: 20, marginEnd: 20 }} onPress={() => onPress()}>
            <Image style={{ height: 15, width: 14, }} source={src} />
            <Text style={{ color: '#3B4C84', fontSize: 12, marginStart: 8 }}>{title}</Text>
        </TouchableOpacity>
    )
}