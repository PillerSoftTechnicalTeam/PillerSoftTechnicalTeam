import React, { Component, useRef } from 'react'
import { Text, View, Dimensions, RefreshControl, TouchableOpacity, Image, SafeAreaView, FlatList, Alert, alert, ScrollView, Modal } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import StringConstants from '../../../constants/StringConstants';
import HomeBottomHeader from '../../Common/HomeBottomHeader';
import HomeHeader from '../../Common/HomeHeader';
import LanguageModal from '../../Modal/LanguageModal';
import ClickPostModal from '../../Modal/ClickPostModal'
import { SignalingChannel } from '../../../component/SignalingChannel';
import Menu from '../../Common/Menu';
import ImageComponent from '../../Common/ImageComponent';
// import VideoComponent from '../../Common/VideoComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
const { width } = Dimensions.get('window');
import PrayerModal from '../../Modal/PrayerModal';
import SearchModal from '../../Modal/SearchModal'
import NotificationModal from '../../Modal/NotificationModal';
import Loading from '../../Common/Loader';
import CreatePostModal from '../../Modal/CreatePostModal';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';
import { LivePlayer } from "react-native-live-stream";
import { LivestreamView } from '@api.video/react-native-livestream';
import moment from 'moment';
// import {
//     RTCPeerConnection,
//     RTCIceCandidate,
//     RTCSessionDescription,
//     RTCView,
//     MediaStream,
//     MediaStreamTrack,
//     mediaDevices,
//     registerGlobals
//   } from 'react-native-webrtc';
import { mediaDevices, RTCView } from 'react-native-webrtc';
import { TextInput } from 'react-native-gesture-handler';
export default class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            streamData: [{ image: require('../../../resources/images/ic_stream.png'), title: 'Crear' },
            { image: require('../../../resources/images/ic_stream.png'), title: 'Crear' },
            { image: require('../../../resources/images/ic_stream.png'), title: 'Crear' },
            { image: require('../../../resources/images/ic_stream.png'), title: 'Crear' },
            { image: require('../../../resources/images/ic_stream.png'), title: 'Crear' },
            { image: require('../../../resources/images/ic_stream.png'), title: 'Crear' },
            { image: require('../../../resources/images/ic_stream.png'), title: 'Crear' }],
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
            friendData: [{ friend: require('../../../resources/images/ic_suggestion.png') },
            { friend: require('../../../resources/images/ic_suggestion.png') },
            { friend: require('../../../resources/images/ic_suggestion.png') },
            { friend: require('../../../resources/images/ic_suggestion.png') },],
            showMenu: false,
            showPrayer: false,
            isLoading: false,
            rowsperpage: 10,
            GroupId: 0,
            Id: 0,
            type: 'H',
            sct: 'H',
            Source: '',
            showPostModal: false,
            postData: [],
            userDetails: '',
            showCommentsModal: false,
            serverDataMyFriends: [],
            showLanguageModal: false,
            items: [
                { label: 'EN', value: 'English' },
                { label: 'FR', value: 'French' },
                { label: 'SP', value: 'Spanish' },
            ],
            postItems: [
                { label: 'Send Request' },
                { label: 'Report' },
                { label: 'Cancel' }
            ],
            lang: '',
            liveUsersData: [''],
            // started:false,
            // isFrontCamera:true,
            // audiMuted:false,
            // videoMuted:false,
            // localStream:MediaStream,
            stream: null,
            searchModal: false,
            notificationModal: false,
            postModal: false,
            anchorY: 0
        }
    }

    componentDidMount() {

        console.log('================================', AsyncStorage.getItem(AppConstants.USER_DETAILS))
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getPostData()
                    this.getFriendSuggestions()
                    // this.getLiveUsers()

                })
            }
        });


        // const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
        // const pc = new RTCPeerConnection(configuration);

        // let isFront = true;
        // mediaDevices.enumerateDevices().then(sourceInfos => {
        //     console.log(sourceInfos);
        //     let videoSourceId;
        //     for (let i = 0; i < sourceInfos.length; i++) {
        //         const sourceInfo = sourceInfos[i];
        //         if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
        //             videoSourceId = sourceInfo.deviceId;
        //         }
        //     }
        //     mediaDevices.getUserMedia({
        //         audio: true,
        //         video: {
        //             width: 640,
        //             height: 480,
        //             frameRate: 30,
        //             facingMode: (isFront ? "user" : "environment"),
        //             deviceId: videoSourceId
        //         }
        //     })
        //         .then(stream => {
        //             // Got stream!
        //         })
        //         .catch(error => {
        //             // Log error
        //         });
        // });

        // pc.createOffer().then(desc => {
        //     pc.setLocalDescription(desc).then(() => {
        //       // Send pc.localDescription to peer
        //     });
        //   });

        //   pc.onicecandidate = function (event) {
        //     // send event.candidate to peer
        //   };

    }

    getPostData = () => {
        this.offset = 1;
        const { userDetails } = this.state;
        let body = {
            pagenumber: 1,
            rowsperpage: 10,
            GroupId: 0,
            Id: 0,
            UserId: 0,

        }
        // console.log('postDta body-->>', JSON.stringify(body))
        // console.log('postDta userDetails-->>', JSON.stringify(userDetails))



        this.setState({ isLoading: false }, () => {
            fetch(GLOBAL.BASE_URL + 'api/PostMgmtAPI/GetPosts_Mobile',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pagenumber: 1,
                        GroupId: 0,
                        Id: 0,
                        UserId: 0,
                        rowsperpage: 3

                    })
                }).then((response) => response.json())
                .then((respData) => {
                    this.offset = this.offset + 1;
                    this.setState({ isLoading: false, postData: respData.response }, () => {
                        console.log('postDta-->>', JSON.stringify(respData.response))
                    });
                }).catch((error) => {
                    this.setState({ isLoading: false }, () => {
                        console.log('error-->>>>', JSON.stringify(error));
                    })
                });
        });
    }


    getFriendSuggestions = () => {
        const { userDetails } = this.state;
        // this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetFriendSuggestions',
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
                this.setState({ isLoading: false, serverDataMyFriends: respData.response }, () => {
                    // console.log('serverDataMyFriends-->>', JSON.stringify(this.state.serverDataMyFriends))

                });
            }).catch((error) => {
                // console.log(error);
            });
    }

    getLiveUsers = () => {
        const { userDetails } = this.state;
        this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetLiveStreamUser',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: undefined
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false, liveUsersData: respData.response }, () => {
                    console.log('liveUsersData-->>', JSON.stringify(this.state.liveUsersData))

                });
            }).catch((error) => {
                // console.log(error);
            });
    }


    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }


    tapOnLike = (item, index) => {
        const { userDetails } = this.state;
        // console.log('item tapOnLike-->>', JSON.stringify(item));

        if (item.IsPostedLikedByYou == true) {
            this.hitDislikeApi(item, index)
        } else {
            console.log('In else')
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

    hitDislikeApi = (item, index) => {
        const { userDetails } = this.state;
        var date = new Date().getDate();

        let body = JSON.stringify({
            PostId: item.Id,
            LikedBy: userDetails.Id,
            Id: userDetails.Id,
            DisLikedOn: date,
        })
        // console.log('body tapOnDisLike-->>', JSON.stringify(body));
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/DisLikePost',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PostId: item.Id,
                    LikedBy: userDetails.Id,
                    Id: userDetails.Id,
                    DisLikedOn: date,
                    IsDeleted: true
                })

            }).then((response) => response.json())
            .then((responsedata) => {
                if (responsedata.response.StatusCode == 1) {
                    this.getPostData()
                    return
                    console.log('index ' + index);
                    console.log(this.state.postData);
                    const posts = this.state.postData;
                    console.log(' from duplicate ' + posts);
                    const targetpost = posts[index];
                    targetpost.IsPostedUnLikedByYou = true;
                    targetpost.Likes += 1;
                    posts[index] = targetpost;
                    this.setState({ postData: posts }, () => {
                        console.log('this.state.postData', JSON.stringify(this.state.postData));
                        this.getPostData()
                    });

                }
            }).catch(error => {
                setTimeout(() => {
                    // Alert.alert("Alert!", `Error : ${error}`);
                }, 100);
            });
    }

    start = async () => {
        console.log('start');
        if (!this.state.stream) {
            let s;
            try {
                s = await mediaDevices.getUserMedia({ video: true });
                // setStream(s);
                this.setState({ setStream: s })
            } catch (e) {
                console.error(e);
            }
        }
    };
    stop = () => {
        console.log('stop');
        if (this.state.stream) {
            this.state.stream.release();
            //   setStream(null);
            this.setState({ setStream: null })

        }
    };

    onPressJoin = async (link) => {
        // this.props.navigation.navigate('Publisher')
        alert('under development')
        // return
        // const localStreamRef = useRef(MediaStream)

        // const peerConnection = useRef(RTCPeerConnection)

        // if (!this.state.started) {
        //     // setStarted(true);
        //     this.setState({started:true})
        //     await startStreaming();
        //     SignalingChannel.current?.open();
        //     return;
        //   }

        //   setStarted(false);
        //   peerConnection.current?.close();
        //   SignalingChannel.current?.close();


        return (
            <View>
                {
                    this.state.stream &&
                    // <RTCView
                    //     streamURL={stream.toURL()}
                    //     style={{ flex: 1 }} />
                    <RTCView style={{ height: 150, width: 150 }} zOrder={20} objectFit={"cover"} mirror={true} streamURL={link.toURL()} />
                }
                <View
                    style={{ alignSelf: 'flex-end' }}>
                    <TouchableOpacity

                        // title="Start"
                        onPress={this.start()} >
                        <Text>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // title="Stop"
                        onPress={this.stop} >
                        <Text>Stop</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // <LivePlayer source={{ uri: link }}
            //     ref={(ref) => {
            //         this.player = ref
            //     }}
            //     style={{ height: 600, width: 360 }}
            //     paused={false}
            //     muted={false}
            //     bufferTime={300}
            //     maxBufferTime={1000}
            //     resizeMode={"contain"}
            //     onLoading={() => { }}
            //     onLoad={() => { }}
            //     onEnd={() => { }}
            // />
            //     <LivestreamView
            //     style={{ flex: 1, backgroundColor: 'black', alignSelf: 'stretch' }}
            //          ref={(ref) => {
            //         this.player = ref
            //     }}
            //     video={{
            //       fps: 30,
            //       resolution: '720p',
            //       camera: 'front',
            //       orientation: 'portrait',
            //     }}
            //     liveStreamKey={link}
            //     onConnectionSuccess={() => {
            //       //do what you want
            //     }}
            //     onConnectionFailed={(e) => {
            //       //do what you want
            //     }}
            //     onDisconnect={() => {
            //       //do what you want
            //     }}
            //   />
        )
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ marginStart: 8, alignItems: 'center', marginTop: 10 }}>
                {/* <Image style={{ height: width / 7.3, width: width / 7.3 }} source={{ uri:item.CreatedByImage? GLOBAL.BASE_URL + 'UploadedImages/' + item.CreatedByImage: 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} /> */}
                {/* <Image style={{ height: width / 7.3, width: width / 7.3 }} source={{uri:'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png'}} /> */}
                <Image style={{ height: width / 7.3, width: width / 7.3 }} source={require('../../../resources/images/ic_dummy_user.png')} />

                <Image style={{ height: 12, width: 12, position: 'absolute', left: width / 8.4, top: 40 }} source={require('../../../resources/images/ic_online.png')} />

                {/* <Text style={{ fontSize: 12, color: '#444D6E', marginTop: 5 }}>{item.CreatedByName}</Text> */}
                <Text style={{ fontSize: 12, color: '#444D6E', marginTop: 5 }}>{'John Due'}</Text>


                {/* <TouchableOpacity style={styles.joinContainer} onPress={() => this.onPressJoin(item.StreamLink)}> */}
                {/* <TouchableOpacity style={styles.joinContainer} onPress={() => this.onPressJoin(item.StreamLink)}> */}
                <TouchableOpacity style={styles.joinContainer} onPress={() => alert('Coming Soon')}>


                    {/* <Text style={{ fontSize: 12, color: '#530D89' }}>{StringConstants.JOIN}</Text> */}
                    <Text style={{ fontSize: 12, color: '#530D89' }}>{'Chat'}</Text>

                </TouchableOpacity>
            </View>
        )
    }


    _updateRecipients = () => {
        this.getPostData();
    }


    sendFriendRequest = (Id) => {
        const { userDetails } = this.state;
        this.setState({ isLoading: true });

        console.log(Id);
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/SaveFriendRequest',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserId: userDetails.Id,
                    FriendId: Id,
                    RequestedBy: userDetails.Id
                })
            }).then((response) => response.json())
            .then((respData) => {

                console.log('respData SaveFriendRequest', JSON.stringify(respData));
                if (respData.response.StatusCode == 1) {
                    // console.log(this.state.serverDataMyFriends);
                    const FilterData = this.state.serverDataMyFriends.filter(item => item.FriendId != Id);
                    // console.log(FilterData);
                    this.setState({ serverDataMyFriends: FilterData });

                }
                this.setState({ isLoading: false });

            }).catch((error) => {
                console.log(error);

                this.setState({ isLoading: false });

            });
    }


    renderData = ({ item, index }) => {
        // console.log('item link-->>>>', JSON.stringify(item))
        const { postModal, postItems, anchorY } = this.state
        // let link = item.PostTitle.split('!\n\n')[1]
        // console.log('User Image======-->>>>', JSON.stringify(item))


        return (
            <View >
                <View style={styles.dataContainer}>


                    {postModal &&
                        <ClickPostModal
                            postList={postItems}
                            showModal={postModal}
                            containerStyle={{ width: 300, marginStart: 20, marginTop: 5 }}
                            onRef={ref => (this.parentReference = ref)}
                            // parentReference={this.setLanguage.bind(this)}
                            toggleSelect={() => this.setState({ postModal: false })}

                        />
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.9, flexDirection: 'row', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('OthersProfileScreen', { Item: item })}>
                                <Image style={{ height: width / 9.8, width: width / 9.5, borderRadius: width / 9.5 }} source={{ uri: item.ProfileImage ? 'http://staging.godconnect.online/UploadedImages/' + item.ProfileImage : 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('OthersProfileScreen', { Item: item })}
                                style={{ marginStart: 8 }}>
                                <Text style={styles.dataTitleLabel}>{item.PostedByName}</Text>

                                {/* <Text style={styles.dataTitleLabel}>{item.PostTitle.split('!\n\n')[0]}<Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={() => Linking.openURL(link)}>{item.PostTitle.split('!\n\n')[1]}</Text></Text> */}
                                {/* <Text style={styles.dataTitleLabel} onPress={() => Linking.openURL(link)}>{link}</Text> */}

                                <Text style={{ fontSize: 12, color: '#BABDC9', marginTop: 1 }}>{moment(item.PostedOn).format('LL')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.1, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ postModal: true })}
                                style={{ marginRight: 0 }}>
                                <Image source={require('../../../resources/images/dots.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>



                    </View>
                    <Text style={{ fontSize: 13, color: '#444D6E', marginTop: 10, }}>{item.PostDescription}</Text>

                    {item.ContentType != '' &&
                        (item.ContentType === 'Image' ?
                            <Image style={styles.postImg} source={{ uri: GLOBAL.BASE_URL + '/UploadedImages/' + item.PostedObjectsm }} />
                            :
                           
                            <Video
                                source={{ uri: GLOBAL.BASE_URL + "/UploadedVideos/" + item.PostedObjectsm }}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                resizeMode='cover'
                                playInBackground={false}
                                // controls={true}    
                                paused={true}                                // Store reference
                                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                // onError={this.videoError}               // Callback when video cannot be loaded
                                style={{
                                    width: '100%',
                                    height: 300
                                }} />)}




                    {/* {
                        item.ContentType == 'Image' &&
                            <Image style={styles.postImg} source={{ uri: 'https://godconnect.online/UploadedImages/' + item.PostedObjectsm }} />
                            
                    } */}

                    <View style={styles.dataBottomLeftContainer}>
                        <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                this.tapOnLike(item, index)
                                console.log(item)
                            }}>
                                <Image style={{ height: 18, width: 18, tintColor: item.IsPostedLikedByYou == true ? '#530D89' : 'grey' }} source={require('../../../resources/images/ic_like.png')} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, color: '#747EA0', marginStart: 8 }}>{item.Likes == null ? 0
                                : (item.Likes == 1 ? item.Likes.toString()
                                    : item.Likes.toString())}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CommentScreen', { id: item.Id, goBack: this._updateRecipients.bind(this) })
                            } >
                                <Image style={{ height: 18, width: 18, marginStart: width / 7.5, tintColor: item.IsPostedLikedByYou == true ? '#530D89' : 'grey' }} source={require('../../../resources/images/ic_comment.png')} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, color: '#747EA0', marginStart: 8 }}>{
                                item.Reviews == null ? 0
                                    : (item.Reviews == 1 ? item.Reviews.toString()
                                        : item.Reviews.toString())}</Text>
                        </View>


                    </View>
                </View>

                <Text style={styles.advertiseLabel}>{StringConstants.ADVERTISE}</Text>
                <Image style={styles.adver} source={require('../../../resources/images/ic_advertise.png')} />
                <Text style={styles.suggestionLabel}>{StringConstants.FRIEND_SUGGESTION}</Text>


                <FlatList
                    style={{ marginTop: 10, }}
                    data={this.state.serverDataMyFriends}
                    extraData={this.state.serverDataMyFriends}
                    renderItem={this.renderFriendData}
                    horizontal={true}
                />
            </View>
        )
    }

    renderFriendData = ({ item }) => {
        return (
            <View style={{}}>
                <View style={{ width: width / 1.79, }}>
                    <Image style={{ height: width / 2.5, width: width / 2.5, borderRadius: 22, alignSelf: 'center' }} source={{ uri: item.PostedObjectsm != null ? 'https://godconnect.online/UploadedImages/ProfileImages/' + item.PostedObjectsm : 'https://godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />
                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', marginTop: 8 }}>{item.UserName}</Text>

                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={styles.addFriendContainer} onPress={() => this.sendFriendRequest(item.FriendId)}>
                            <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{StringConstants.ADD_FRIEND}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.removeContainer}>
                            <Text style={{ fontSize: 12, color: '#530D89', fontWeight: 'bold' }}>{StringConstants.REMOVE}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    tapOnMenu = () => {
        this.setState({ showMenu: true })
    }

    closeDrawer = () => {
        this.setState({ showMenu: false })
    };

    openDrawer = () => {
        this.setState({ showMenu: true })
    };


    onMenuItemSelected = (item) => {
        // console.log('Item is menuItemClick ::: ' + item)
        switch (item) {
            case 'Profile':
                this.props.navigation.navigate('ProfileScreen');
                break;
            case 'Cart':
                this.props.navigation.navigate('MarketPlaceScreen');
                break;
            case 'Friend':
                this.props.navigation.navigate('FriendScreen');
                break;
            case 'Group':
                this.props.navigation.navigate('GroupsTabs');
                break;
            case 'Event':
                this.props.navigation.navigate('EventScreen');
                break;
            case 'Chat':
                this.props.navigation.navigate('ChatListScreen');

                break;
            case 'Invite':
                this.props.navigation.navigate('InviteFriendScreen');
                break;
            case 'Prayer':
                this.setState({ showMenu: true, showPrayer: true })
                break;
            case 'Church':
                this.props.navigation.navigate('ChurchScreen');

                break;
            case 'Logout':
                setTimeout(() => {
                    var buttons = [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Logout',
                            onPress: () => this._onAlertClick()
                        }
                    ];
                    Alert.alert(
                        'Alert!',
                        'Are you certain, you want to logout?',
                        buttons,
                        { cancelable: false }
                    );
                }, 100);
                break;
        }
        this.closeDrawer()
    }


    _onAlertClick = (clicked) => {
        // alert("Under development")
        AsyncStorage.removeItem(AppConstants.USER_DETAILS);
        this.props.navigation.navigate("LoginScreen")
    }


    postToServer = async (post, type, selectedImage, postType, selectedVideo) => {
        console.log('imageUrl post-->>>', JSON.stringify(selectedImage))
        console.log('postType post-->>>', JSON.stringify(postType))
        console.log('selectedVideo post-->>>', JSON.stringify(selectedVideo))
        console.log('selectedVideo selectedImage == null && selectedVideo == null-->>>', JSON.stringify(selectedImage == '' && selectedVideo == ''))




        if (selectedImage == '' && selectedVideo == '') {
            if (post != null) {
                this.setState({ isLoading: true });
                // await this.setPost(post, 'image', "dummy.png",);
                await this.setPost(post, '', "",);

            }
        }
        else {

            if (post == null) {
                alert('Please enter description')
                return
            }
            else {
                this.setState({ isLoading: true });
                if (selectedImage == '' || selectedImage == '') {
                    console.log('no image selected');
                    if (selectedVideo != null || selectedVideo != '') {
                        const uri = selectedVideo;
                        const finalResult = await this.uploadImageAsync(uri);
                        const uploadResult = await finalResult.json();
                        // console.log(uploadResult);
                        await this.setPost(post, "Video", uploadResult,);
                        return
                    }
                    return

                }
                else {

                    const uri = selectedImage;
                    const finalResult = await this.uploadImageAsync(uri);
                    const uploadResult = await finalResult.json();
                    // console.log(uploadResult);
                    await this.setPost(post, "Image", uploadResult,);

                }
                // if (selectedVideo == null) {

                //     console.log('no video selected');
                //     return

                // }
                // else {
                //     const uri = selectedVideo;
                //     const finalResult = await this.uploadImageAsync(uri);
                //     const uploadResult = await finalResult.json();
                //     // console.log(uploadResult);
                //     await this.setPost(post, "Video", uploadResult,);
                //     return

                // }
            }

        }
    }

    uploadImageAsync = (uri) => {
        let apiUrl = "http://staging.godconnect.online/api/Files/Upload";
        console.log(uri);
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        console.log('fileType fileType-->>>', JSON.stringify(fileType))
        console.log('uriParts uriParts-->>>', JSON.stringify(uriParts))
        console.log('uri uri-->>>', JSON.stringify(uri))


        let formData = new FormData();
        formData.append('photo', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });
        console.log('formData formData-->>>', JSON.stringify(formData))

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };
        return fetch(apiUrl, options);
    }

    setPost = (post, type, imageUrl) => {
        const { userDetails } = this.state;

        let body = {
            PostedBy: userDetails.Id,
            ApprovedBy: userDetails.Id,
            GroupId: this.state.GroupId,
            PostDescription: post,
            PostType: type,
            ContentType: 'check',
            PostTarget: 'public',
            ObjectUrl: imageUrl,



        }
        console.log('body post-->>>', JSON.stringify(body))
        this.setState({ isLoading: true })

        fetch(GLOBAL.BASE_URL + '/api/PostMgmtAPI/PostData',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PostedBy: userDetails.Id,
                    ApprovedBy: userDetails.Id,
                    GroupId: this.state.GroupId,
                    PostDescription: post,
                    PostType: type,
                    ContentType: 'check',
                    PostTarget: 'public',
                    ObjectUrl: imageUrl,
                })
            }).then((response) => response.json())
            .then((respData) => {
                if (respData) {
                    console.log('respData set post-->>>', JSON.stringify(respData))

                    this.setState({ isLoading: false, showPostModal: !this.state.showPostModal }, () =>

                        this.getPostData()
                    );

                }
            }).catch(error => {
                setTimeout(() => {
                    // Alert.alert("Alert!", `Error : ${error}`);
                }, 100);
            });
    }

    setLanguage = (lang) => {
        this.setState({ showLanguageModal: false, lang: lang.value, label: lang.label });
    }

    onSubmitPrayer = (prayer, name, email) => {
        const { userDetails } = this.state;
        console.log('prayer onSubmitPrayer-->>>', JSON.stringify(prayer))

        console.log('name onSubmitPrayer-->>>', JSON.stringify(name))
        console.log('email onSubmitPrayer-->>>', JSON.stringify(email))

        if (prayer == undefined) {
            alert('Please enter prayer description')
            return
        } else if (name == undefined) {
            alert('Please enter name')
            return

        } else if (email == undefined) {
            alert('Please enter email')
            return

        }
        let body = {
            prayer: prayer,
            name: name,
            email: email,
        }
        console.log('body onSubmitPrayer-->>>', JSON.stringify(body))
        return
        this.setState({ isLoading: true })

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/SavePrayer',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prayer: prayer,
                    name: name,
                    email: email,
                })
            }).then((response) => response.json())
            .then((respData) => {
                if (respData) {
                    console.log('respData set prayer-->>>', JSON.stringify(respData))

                    this.setState({ isLoading: false, showPrayer: !this.state.showPrayer }, () =>

                        this.getPostData()
                    );

                }
            }).catch(error => {
                setTimeout(() => {
                    // Alert.alert("Alert!", `Error : ${error}`);
                }, 100);
            });
    }

    // searchModal = () => {
    //     return (
    //         <View style={{ flex: 1 }}>
    //             <Modal animationType='fade'
    //                 transparent
    //                 visible={this.state.searchModal}
    //                 // presentationStyle="overFullScreen"
    //                 onRequestClose={() => this.setState({ searchModal: false })}>
    //                 <View style={styles.viewWrapper}>
    //                     <Animatable.View animation={'bounceInRight'} style={styles.modalView}>
    //                         <View style={{ width: '90%' }}>
    //                             <TextInput placeholder='Search...'>

    //                             </TextInput>
    //                         </View>
    //                         <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
    //                             <Image source={require('../../../resources/images/search.png')}
    //                                 style={{ height: 22, width: 22 }}
    //                                 resizeMode='contain'
    //                             />
    //                         </View>
    //                     </Animatable.View>



    //                 </View>
    //             </Modal>


    //         </View>
    //     )
    // }

    render() {
        const { searchModal, notificationModal, postModal, isLoading, liveUsersData, userDetails, showMenu, showPrayer, showPostModal, postData, showLanguageModal, items, postItems } = this.state;
        console.log('userDetails in render', userDetails)
        return (
            <SafeAreaView style={{ flex: 1 }}>

                {
                    searchModal &&
                    <SearchModal
                        // onChangeSearch={(text) => this.onChangeSearch(text)}
                        dismissModalCallback={() => this.setState({ searchModal: false })}
                        customStyle={{ marginTop: width / 3.94 }} />
                }
                {
                    notificationModal &&
                    <NotificationModal
                        dismissModalCallback={() => this.setState({ notificationModal: false })}
                    />
                }
                <HomeHeader
                    onPressNotification={() => this.setState({ notificationModal: true })}
                    onPressSearch={() => { this.setState({ searchModal: true }) }}
                    onPressMessage={() => this.props.navigation.navigate('ChatListScreen')}
                    onPressUser={() => this.props.navigation.navigate('ProfileScreen', { userData: userDetails })}
                    onPressLanguage={() => this.setState({ showLanguageModal: true })}
                    user={{ uri: userDetails.UserImage ? 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + userDetails.UserImage : 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }}
                />

                <HomeBottomHeader
                    tapOnHome={() => this.setState({ showMenu: false })}
                    tapOnMenu={() => this.tapOnMenu()}
                    // tapOnAdd={() => this.props.navigation.navigate('CreatePostScreen')}
                    tapOnAdd={() => this.setState({ showPostModal: true })}
                    tapOnProfile={() => this.props.navigation.navigate('FriendScreen')}
                    // tapOnNet={() => this.props.navigation.navigate('Publisher')}
                    tapOnNet={() => this.props.navigation.navigate('LiveStreamScreen')}

                />

                <Loading loading={this.state.isLoading} loaderColor={'white'} />

                {showMenu && <Menu
                    onItemSelected={this.onMenuItemSelected}
                    showModal={showMenu}
                    dismissModalCallBack={this.closeDrawer}
                />}

                {showLanguageModal &&
                    <LanguageModal
                        countryList={items}
                        showModal={showLanguageModal}
                        containerStyle={{ width: 300, marginStart: 20, marginTop: 5 }}
                        onRef={ref => (this.parentReference = ref)}
                        parentReference={this.setLanguage.bind(this)}
                        toggleSelect={() => this.setState({ showLanguageModal: false })}
                    />

                }



                {showPrayer &&
                    <PrayerModal
                        dismissModalCallback={() => this.setState({ showPrayer: false })}
                        customStyle={{ marginTop: 200 }}
                        onPressSubmit={() => this.onSubmitPrayer()}
                        userDetails={userDetails} />
                }

                {showPostModal &&
                    <CreatePostModal
                        dismissModalCallback={() => this.setState({ showPostModal: false })}
                        // customStyle={{ marginTop: 200 }}
                        onRef={ref => (this.parentReference = ref)}
                        parentReference={this.postToServer.bind(this)}
                    />
                }

                <ScrollView refreshControl={
                    <RefreshControl
                        enabled={true}
                        refreshing={this.state.isLoading}
                        onRefresh={() => {
                            this.setState({ postData: [] }, function () {
                                this.getPostData()
                            })
                        }}
                    />
                }>

                    <View style={styles.headerContainer}>
                        <View style={styles.headerInnerContainer}>
                            <Image style={styles.userImg} source={{ uri: userDetails.UserImage ? 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + userDetails.UserImage : 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />
                            <TouchableOpacity style={styles.createPostContainer}
                                // onPress={() => this.props.navigation.navigate('CreatePostScreen')}>
                                onPress={() => this.setState({ showPostModal: true })}>

                                <Text style={styles.createLabel}>Create New Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.streamingLabelContainer}>
                        <Image style={{ height: 16, width: 22 }} source={require('../../../resources/images/ic_net_home.png')} />
                        {/* <Text style={styles.streamLabel}>{'Live Streaming'}</Text> */}
                        <Text style={styles.streamLabel}>{'Online Users'}</Text>

                    </View>

                    {liveUsersData.length > 0 ? <View style={{ minHeight: 130 }}>
                        <FlatList
                            style={styles.streamFlatlistContainer}
                            data={liveUsersData}
                            extraData={liveUsersData}
                            renderItem={this.renderItem}
                            horizontal={true} />
                    </View> :
                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }}>{isLoading ? '' : 'No Users Found!'}</Text>}
                    {postData.length > 0 ?
                        <View>

                            <FlatList
                                style={{ marginStart: 8, marginEnd: 8, }}
                                data={postData}
                                extraData={postData}
                                renderItem={this.renderData}
                            />
                        </View>
                        :
                        <Text style={{ fontSize: 22, textAlign: 'center', marginTop: 150 }}>{isLoading ? '' : 'No Posts Found!'}</Text>}
                    {/* <FlatList
                        style={{ marginTop: 10, }}
                        data={this.state.serverDataMyFriends}
                        extraData={this.state.serverDataMyFriends}
                        renderItem={this.renderFriendData}
                        horizontal={true}
                    /> */}

                </ScrollView>
            </SafeAreaView>
        );
    }
}