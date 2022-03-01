import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, ScrollView, Image, ImageBackground, FlatList, Alert, alert } from 'react-native'
import styles from './styles';
import Header from '../../Common/Header';
import Toast, { DURATION } from 'react-native-easy-toast'
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import { Content } from 'native-base';
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

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            password: '',
            friendData: [
                { img: require('../../../resources/images/ic_friend_profile.png'), title: 'James' },
                { img: require('../../../resources/images/ic_friend_profile.png'), title: 'James' },
                { img: require('../../../resources/images/ic_friend_profile.png'), title: 'James' },
                { img: require('../../../resources/images/ic_friend_profile.png'), title: 'James' },
                { img: require('../../../resources/images/ic_friend_profile.png'), title: 'James' }
            ],
            data: [{
                image: require('../../../resources/images/ic_home_post.png'),
                title: 'Daniela Fernandez Remos', date: '2 September 2021 at 8:00 PM',
                description: 'Tata Nexon is a 5 seater Compact SUV available',
                post_image: require('../../../resources/images/ic_car.png'),
                like: require('../../../resources/images/ic_like.png'),
                comment: require('../../../resources/images/ic_comment.png'),
                likeBg: require('../../../resources/images/ic_like_withBg.png'),
                heart: require('../../../resources/images/ic_heart.png'),
                advertise: require('../../../resources/images/ic_advertise.png'),
            },
            {
                image: require('../../../resources/images/ic_home_post.png'),
                title: 'Daniela Fernandez Remos', date: '2 September 2021 at 8:00 PM',
                description: 'Tata Nexon is a 5 seater Compact SUV available',
                post_image: require('../../../resources/images/ic_car.png'),
                like: require('../../../resources/images/ic_like.png'),
                comment: require('../../../resources/images/ic_comment.png'),
                likeBg: require('../../../resources/images/ic_like_withBg.png'),
                heart: require('../../../resources/images/ic_heart.png'),
                advertise: require('../../../resources/images/ic_advertise.png'),

            },
            {
                image: require('../../../resources/images/ic_home_post.png'),
                title: 'Daniela Fernandez Remos', date: '2 September 2021 at 8:00 PM',
                description: 'Tata Nexon is a 5 seater Compact SUV available',
                post_image: require('../../../resources/images/ic_car.png'),
                like: require('../../../resources/images/ic_like.png'),
                comment: require('../../../resources/images/ic_comment.png'),
                likeBg: require('../../../resources/images/ic_like_withBg.png'),
                heart: require('../../../resources/images/ic_heart.png'),
                advertise: require('../../../resources/images/ic_advertise.png'),

            }],
            coverPhoto: '',
            userDetails: '',
            selectedImageBase64: '',
            profilePhoto: '',
            selectedProfileBase64: '',
            imageName: '',
            myFriendData: [],
            postData: [],
            userData: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getMyFriendData()
                    this.getPostData()
                    this.getUserById()
                })
            }
        });
    }

    getPostData = () => {
        this.offset = 1;
        const { userDetails } = this.state;
        let body = {
            pagenumber: 1,
            rowsperpage: 10,
            // GroupId: 0,
            Id: userDetails.Id,
            // UserId: userDetails.Id,
        }
        console.log('postDta body-->>', JSON.stringify(body))
        // console.log('postDta userDetails-->>', JSON.stringify(userDetails))



        this.setState({ isLoading: true }, () => {
            fetch(GLOBAL.BASE_URL + '/api/PostMgmtAPI/GetPosts_Mobile',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pagenumber: 1,
                        rowsperpage: 10,
                        GroupId: 0,
                        Id: userDetails.Id,
                        UserId: userDetails.Id,
                        type: "S"

                    })
                }).then((response) => response.json())
                .then((respData) => {
                    this.offset = this.offset + 1;
                    this.setState({ isLoading: false, postData: respData.response }, () => {
                        console.log('postDta-->>', JSON.stringify(respData.response))
                    });
                }).catch((error) => {
                    // console.log(error);
                });
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

    onChangeProfilePhoto = () => {
        var buttons = [
            {
                text: 'Camera',
                onPress: () => {
                    this.setState({ loading: true }, function () {

                        setTimeout(() => {
                            ImagePicker.openCamera({
                                cropping: true,
                                width: 500,
                                height: 500,
                                includeBase64: true,

                            })
                                .then((response) => {
                                    console.log("userImage _saveImageUri --> ", JSON.stringify(response))
                                    let source = { uri: 'data:image/jpeg;base64,' + response.path }

                                    this.setState({ profilePhoto: response.path, selectedProfileBase64: source.uri, imageName: response.mime })
                                    ImgToBase64.getBase64String(this.state.profilePhoto)
                                        .then(base64String =>
                                            this.hitApiProfilePhoto(base64String)
                                        )
                                        .catch(err => doSomethingWith(err));
                                })
                        }, 1000);
                    });
                }
            },
            {
                text: 'Choose from Library',
                onPress: () => {


                    setTimeout(() => {
                        ImagePicker.openPicker({
                            width: 500,
                            height: 500,
                            cropping: true,
                            includeBase64: true,

                        }).then(response => {
                            console.log("_tapOnGallery ImagePicker image ", response);
                            // let source = {
                            //     uri: response.path,
                            //     imageName: response.filename
                            // }
                            let source = { uri: 'data:image/jpeg;base64,' + response.path }
                            this.setState({ profilePhoto: response.path, selectedProfileBase64: source.uri, imageName: response.mime }, () => {
                                console.log("_tapOnGallery profilePic ", this.state.profilePhoto);
                                ImgToBase64.getBase64String(this.state.profilePhoto)
                                    .then(base64String =>
                                        this.hitApiProfilePhoto(base64String)
                                    )
                                    .catch(err => doSomethingWith(err));
                            })
                        })

                    }, 1000);
                }
            },
            {
                text: 'Cancel',
                onPress: () => {
                    // this._updateOrder('Complete');
                }
            },
        ];
        Alert.alert("Alert!", `Select option how you want to upload image.`, buttons, { cancelable: false });


    }


    hitApiProfilePhoto = (base64) => {
        let uriParts = this.state.profilePhoto.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let d = {
            base64Image: base64,
            imageType: `image/${fileType}`,
            uri: this.state.profilePhoto,
            userId: this.state.userDetails.Id
        }

        console.log('hitApiProfilePhoto body--->>>>', d)
        fetch(GLOBAL.BASE_URL + 'api/UploadMobile/UploadImage_expo_Profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                base64Image: base64,
                imageType: `image/${fileType}`,
                uri: this.state.profilePhoto,
                userId: this.state.userDetails.Id
            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData hitApiProfilePhoto', responseData);
                if (responseData) {
                    this.setState({ isLoading: false });
                    this.getUserById()
                }
                else {
                    this.setState({ isLoading: false });
                    alert(responseData.Message);
                }
            }).catch((error) => {
                console.log(error);
            });
    }


    onChangeCoverPhoto = () => {

        var buttons = [
            {
                text: 'Camera',
                onPress: () => {
                    this.setState({ loading: true }, function () {

                        setTimeout(() => {
                            ImagePicker.openCamera({
                                cropping: true,
                                width: 500,
                                height: 500,
                                includeBase64: true,

                            })
                                .then((response) => {
                                    console.log("userImage _saveImageUri --> ", JSON.stringify(response))
                                    let source = { uri: 'data:image/jpeg;base64,' + response.path }

                                    this.setState({ coverPhoto: response.path, selectedImageBase64: source.uri, imageName: response.mime })

                                    ImgToBase64.getBase64String(this.state.coverPhoto)
                                        .then(base64String =>
                                            this.hitApiCoverPhoto(base64String)
                                        )

                                        .catch(err => doSomethingWith(err));
                                })
                        }, 1000);
                    });
                }
            },
            {
                text: 'Choose from Library',
                onPress: () => {


                    setTimeout(() => {
                        ImagePicker.openPicker({
                            width: 500,
                            height: 500,
                            cropping: true,
                            base64: true,

                        }).then(response => {
                            console.log("_tapOnGallery ImagePicker image ", response);
                            // let source = {
                            //     uri: response.path,
                            //     imageName: response.filename
                            // }
                            let source = { uri: 'data:image/jpeg;base64,' + response.path }

                            // window.plugins.Base64.encodeFile(source.uri, function(base64){
                            //     // Save images in Base64
                            //     this.setState({selectedImageBase64: base64})
                            //  });
                            this.setState({ coverPhoto: response.path, selectedImageBase64: source.uri, imageName: response.mime }, () => {
                                console.log("_tapOnGallery profilePic ", this.state.selectedImageBase64);
                                ImgToBase64.getBase64String(this.state.coverPhoto)
                                    .then(base64String =>
                                        this.hitApiCoverPhoto(base64String)
                                    )

                                    .catch(err => doSomethingWith(err));
                            })
                        })

                    }, 1000);
                }
            },
            {
                text: 'Cancel',
                onPress: () => {
                    // this._updateOrder('Complete');
                }
            },
        ];
        Alert.alert("Alert!", `Select option how you want to upload image.`, buttons, { cancelable: false });

    }



    hitApiCoverPhoto = (base64) => {
        let uriParts = this.state.coverPhoto.split('.');
        let fileType = uriParts[uriParts.length - 1];


        let d = {
            base64Image: this.state.coverPhoto,
            imageType: `image`,
            uri: this.state.imageName,
            userId: this.state.userDetails.Id
        }

        console.log('fileType--->>>>', JSON.stringify(base64))
        console.log('this.state.coverPhoto--->>>>', JSON.stringify(this.state.coverPhoto))
        console.log('ddddd--->>>>', d)

        fetch(GLOBAL.BASE_URL + 'api/UploadMobile/UploadImage_expo_CoverPage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                base64Image: base64,
                imageType: `image/${fileType}`,
                uri: this.state.coverPhoto,
                userId: this.state.userDetails.Id

            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData CoverPage', responseData);
                if (responseData) {
                    this.setState({ isLoading: false });
                    this.getUserById()
                }
                else {
                    this.setState({ isLoading: false });
                    alert(responseData.Message);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    getUserById = () => {
        fetch(GLOBAL.BASE_URL + 'api/UserMgmtAPI/GetUserById', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // userId: this.state.userDetails.Id,
                Id: this.state.userDetails.Id,
                "pagenumber": 1,
                "rowsperpage": 10,
                "type": "S"

            })
        }).then((response) => response.json())

            .then((responseData) => {
                console.log('--------------------------',this.state.userDetails.Id)
                console.log('responseData getUserById', responseData);
                if (responseData) {
                    this.setState({ isLoading: false, userData: responseData.response });
                }
                else {
                    this.setState({ isLoading: false });
                    alert(responseData.response.Message);
                }
            }).catch((error) => {
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
        const { userDetails } = this.state;
        // console.log('item tapOnLike-->>', JSON.stringify(item));

        if (item.IsPostedLikedByYou == true) {
            this.hitDislikeApi(item, index)
        } else {

            let body = JSON.stringify({
                PostId: item.Id,
                LikedBy: userDetails.Id
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
                        LikedBy: userDetails.Id
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

    render() {
        const { userDetails, userData, coverPhoto, myFriendData, postData } = this.state;
        console.log('userData-->>', JSON.stringify(userData))
        let url = userData.ProfileImage != null ? 'http://staging.godconnect.online/UploadedImages/ProfileImages' + userData.ProfileImage : require('../../../resources/images/ic_dummy_user.png')
        console.log('userData url-->>', JSON.stringify(url))

        let uri = userData.CoverImg != null ? 'http://staging.godconnect.online/UploadedImages/CoverIMages/' + userData.CoverImg : require('../../../resources/images/ic_cover_profile.png')
        let uriProfileImg = userData.ProfileImage
        console.log('userData uri-->>', JSON.stringify(uri))

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <ScrollView nestedScrollEnabled={true}>
                    <TitleHeader
                        title={'Your Profile'}
                        tapOnBack={() => this.props.navigation.goBack()} />

                    <View style={{ minHeight: width / 1.2, }}>
                        <ImageBackground resizeMode='stretch' style={{ width: width, height: width / 1.65, padding: 10, alignSelf: 'center' }} source={{ uri: userData.CoverImg != null ? 'http://staging.godconnect.online/UploadedImages/CoverIMages/' + userData.CoverImg : 'http://staging.godconnect.online/UploadedImages/CoverIMages/dummy.png' }}>
                            <TouchableOpacity onPress={() => this.onChangeCoverPhoto()}>
                                <Image style={{ height: width / 8.33, width: width / 8.33, }} source={require('../../../resources/images/ic_camera_profile.png')} />
                            </TouchableOpacity>
                            <Image style={styles.user} source={{ uri: userData.ProfileImage != null ? 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + userData.ProfileImage : 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />
                            <TouchableOpacity style={styles.camera} onPress={() => this.onChangeProfilePhoto()}>

                                <Image source={require('../../../resources/images/ic_camera_profile.png')} />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <Text style={styles.name}>{userDetails.Username}</Text>
                    {/* <Text style={styles.job}> UI/UX Designer |  Developer </Text> */}

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.msgContainer} onPress={() => this.props.navigation.navigate('ChatScreen', { senderId: userDetails.Id })}>
                            <Image style={{ height: 15, width: 15, }} source={require('../../../resources/images/ic_message_profile.png')} />
                            <Text style={{ fontSize: 14, color: 'white', marginStart: 8 }}>{StringConstants.MESSAGE}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editContainer} onPress={() => this.props.navigation.navigate('AboutMeScreen')}>
                            <Image style={{ height: 15, width: 15, }} source={require('../../../resources/images/ic_edit.png')} />
                            <Text style={{ fontSize: 14, color: '#530D89', marginStart: 5 }}>{StringConstants.EDIT_PROFILE}</Text>
                        </TouchableOpacity>
                       
                    </View>

                    {/* <Field
                        src={require('../../../resources/images/ic_profile_home.png')}
                        title={'Lorem ipsum dolor sit amet'}
                        onPress={() => alert('Under development')} /> */}

                    {/* <Field
                        src={require('../../../resources/images/ic_clock.png')}
                        title={'DOB'}
                        onPress={() => alert('Under development')} /> */}

                    <Field
                        src={require('../../../resources/images/ic_about.png')}
                        title={'See More About You'}
                        onPress={() => this.props.navigation.navigate('AboutMeScreen')} />
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