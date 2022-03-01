import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator, SafeAreaView, RefreshControl, ScrollView, Alert, Pressable } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import SearchModal from '../../Modal/SearchModal';
import GroupHeader from '../../Common/GroupHeader';
import styles from './styles'

import SettingsModal from '../../Modal/SettingsModal';
import Loading from '../../Common/Loader';
import CreatePostModal from '../../Modal/CreatePostModal';
import InviteFriendModal from '../../Modal/InviteFriendsModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import moment from 'moment';

export default class GroupDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            groupID: this.props.route.params.groupID,
            groupDetail: [],
            groupMembers: [],
            groupPosts: [],
            isSeeAll: false,
            showModal: false,
            serverDataMyGroups: [],
            isLoading: false,
            userDetails: '',
            isSelected: false,
            searchModal: false,
            searchList: [],
            searchItem: '',
            tab: 0,
            createPostModal: false,
            inviteFriendModal: false

        }
    }


    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            // console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getGroupDetail()
                    console.log("Group ID ================>", this.state.groupID)
                    console.log("User ID ================>", this.state.userDetails.Id)
                })

            }

        });

    }

    getGroupDetail = () => {
        const { userDetails } = this.state;

        // this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + `api/CommonAPI/GetGroupsDetails?groupId=${this.state.groupID}&userId=${this.state.userDetails.Id}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ groupDetail: respData.response }, () => {
                    console.log('Group Detail-->>', JSON.stringify(respData.response))

                });
                this.setState({ groupMembers: respData.response.memberList })
                this.setState({ groupPosts: respData.response.postList })

            }).catch((error) => {
                console.log(error);
            });
    }

    leaveGroup = () => {

        // this.setState({ isLoading: true }); 

        fetch(GLOBAL.BASE_URL + `api/CommonAPI/DeleteGroup`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: this.state.groupID
                })
            }).then((response) => response.json())
            .then((respData) => {
                console.log('Leave Group Api Response-->>', JSON.stringify(respData.response))
                this.props.navigation.goBack()

            }).catch((error) => {
                console.log(error);
            });
    }
    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }



    renderData = ({ item }) => {
        return (
            <View style={styles.dataContainer}>
                <Image style={styles.postImg} source={{ uri: 'http://staging.godconnect.online/UploadedImages/' + item.GroupImage }} />

                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 16, color: '#444D6E', marginTop: 5 }}>{item.GroupName}</Text>
                    <Text style={{ fontSize: 14, color: '#BABDC9' }}>{item.memberList.length + '  ' + 'Member(s)'}</Text>

                </View>

                <TouchableOpacity
                    onPress={() => this.joinGroup(item.id)}
                    style={{ marginTop: 10, width: '95%', alignSelf: 'center', height: 35, backgroundColor: '#530D89', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    {
                        this.state.isLoading ?
                            <ActivityIndicator size={'small'} color={'#530D89'} ></ActivityIndicator>
                            :
                            <Text style={{ color: 'white' }}>Join</Text>

                    }
                </TouchableOpacity>

            </View>


        )
    }

    switchTab = () => {
        switch (this.state.tab) {
            case 0:
                return this.about(this.state.groupDetail.GroupDescription);
            case 1:
                return this.posts(this.state.groupPosts);
            case 2:
                return this.members(this.state.groupMembers);

            default:
                break;
        }
    };

    about = (desc) => {
        return (
            <Text style={styles.groupDesc}>{desc}</Text>
        )
    }

    members = (membersList) => {
        return (
            <FlatList style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                data={membersList}
                extraData={membersList}
                renderItem={this.renderGroupMembers}
            />
        )
    }
    renderGroupMembers = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={{ uri: 'http://staging.godconnect.online/UploadedImages/' + item.MemberPicture }}
                    style={styles.memberPicture}
                />
                <View style={{ marginStart: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.MemberName}</Text>
                    <Text style={{ fontSize: 13, color: 'grey' }}>{item.MutualFriends}</Text>
                </View>
            </View>
        )
    }
    posts = (postList) => {
        return (
            <FlatList style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                data={postList}
                extraData={postList}
                renderItem={this.renderGroupPosts}
            />
        )
    }
    renderGroupPosts = ({ item }) => {
        return (
            <View style={styles.groupPost}>
                <Pressable onPress={() => this.setState({ createPostModal: true })}>
                    <View style={styles.createPostField}>
                        <Image source={require('../../../resources/images/sendMsg.png')} style={{ height: 17, width: 17, tintColor: '#737373' }} resizeMode='contain' />

                        <Text style={{ marginStart: 10, color: 'grey' }}>{'Write something'}</Text>
                    </View>
                </Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: 'http://staging.godconnect.online/UploadedImages/' + item.ProfileImage }}
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                    />
                    <View style={{ marginStart: 10 }}>
                        <Text style={styles.userName} >{item.PostedByName}</Text>
                        <Text style={{ color: 'grey' }}>{moment(item.PostedOn).format('LL')}</Text>
                    </View>
                </View>
                <Text style={styles.postTitle} >{item.PostTitle}</Text>
                <Image source={{ uri: 'http://staging.godconnect.online/UploadedImages/' + item.PostedObjectsm }}
                    style={{ height: 150, width: '100%', marginTop: 15 }}
                />

                <View style={styles.reactBox}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../resources/images/like.png')} style={{ height: 17, width: 17, tintColor: '#737373' }} resizeMode='contain' />
                        <Text style={{ marginStart: 10, color: '#737373' }} >{'Like'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../resources/images/comment.png')} style={{ height: 17, width: 17, tintColor: '#737373' }} resizeMode='contain' />
                        <Text style={{ marginStart: 10, color: '#737373' }} >{'Comment'}</Text>
                    </View>
                </View>
                <View style={styles.commentBox}>
                    <TextInput placeholder='Write public comments...'>

                    </TextInput>
                </View>
            </View>
        )
    }
    render() {
        const { searchList, searchModal, isSeeAll, showModal, serverDataGroupSuggestions, buttonData, serverDataGroupsInvites } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F5F8' }}>
                {/* <Loading loading={this.state.isLoading} loaderColor={'white'} /> */}
                <TitleHeader title={false}
                    title={'GROUP DETAIL'}
                    tapOnBack={() => this.props.navigation.goBack()}
                />
                {this.state.createPostModal &&
                    <CreatePostModal
                        dismissModalCallback={() => this.setState({ createPostModal: false })}
                    // customStyle={{ marginTop: 200 }}
                    // onRef={ref => (this.parentReference = ref)}
                    // parentReference={this.postToServer.bind(this)}
                    />
                }



                <ScrollView>
                    {
                        this.state.inviteFriendModal &&
                        <InviteFriendModal
                            dismissModalCallback={() => this.setState({ inviteFriendModal: false })}
                            groupID={this.state.groupID}
                        />
                    }
                    <Image
                        source={{ uri: 'http://staging.godconnect.online/UploadedImages/' + this.state.groupDetail.GroupImage }}
                        style={{ height: 250, width: '100%' }}
                        resizeMode={'stretch'}
                    />
                    <View style={{ flex: 1, backgroundColor: '#F7F5F8', paddingHorizontal: 15 }}>
                        <Text style={styles.groupName}>{this.state.groupDetail.GroupName}</Text>
                        <Text style={styles.groupType}>{this.state.groupDetail.GroupType + ' ' + 'Group' + '  ' + this.state.groupMembers.length + ' ' + 'Members'}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert(
                                        "Delete Post",
                                        "Are you sure you want to leave this group?",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            { text: "OK", onPress: () => this.leaveGroup() }
                                        ]
                                    );
                                }}
                            >
                                <View style={styles.joinBtn}>
                                    <Image source={require('../../../resources/images/multi-users.png')}
                                        style={{ height: 21, width: 21 }} resizeMode='contain'
                                    />
                                    <Text style={styles.join}>{'Joined'}</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ inviteFriendModal: true })}
                                style={styles.inviteBtn}>
                                <Image source={require('../../../resources/images/add.png')}
                                    style={{ height: 19, width: 19, tintColor: 'white' }} resizeMode='contain'
                                />
                                <Text style={styles.invite}>{'Invite'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.groupList}>

                                <Text style={styles.invite}>{'View Grouplist'}</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.tabView}>
                            <View
                                style={{ flex: 1, borderBottomWidth: this.state.tab == 0 ? 2 : 0, borderBottomColor: '#530D89', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.setState({ tab: 0 })}>
                                    <Text style={styles.tabText}>{'About'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{ flex: 1, borderBottomWidth: this.state.tab == 1 ? 2 : 0, borderBottomColor: '#530D89', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.setState({ tab: 1 })}>
                                    <Text style={styles.tabText}>{'Discussion'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{ flex: 1, borderBottomWidth: this.state.tab == 2 ? 2 : 0, borderBottomColor: '#530D89', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.setState({ tab: 2 })}>
                                    <Text style={styles.tabText}>{'Members'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {this.switchTab()}

                    </View>
                    {/* {!isSeeAll ?

                        <View style={{ backgroundColor: '#F7F5F8', borderTopRightRadius: 15, borderTopLeftRadius: 15, marginTop: 10, padding: 8, marginStart: 8, marginEnd: 8, flex: 1 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: '#707070', fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>{'Suggested For You'}</Text>

                                <TouchableOpacity onPress={() => { this.discoverTab() }} >
                                    <Text style={{ fontSize: 14, color: '#530D89' }}>See All</Text>
                                </TouchableOpacity>

                            </View>
                            <Text style={{ color: '#707070', fontSize: 14, marginTop: 5 }}>{'Groups You might be interested in'}</Text>

                            {searchList.length > 0 ?
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={searchList}
                                    extraData={searchList}
                                    renderItem={this.renderData}
                                /> :
                                <FlatList style={{ flex: 1 }}
                                    contentContainerStyle={{ paddingBottom: 120 }}
                                    data={serverDataGroupSuggestions}
                                    extraData={serverDataGroupSuggestions}
                                    renderItem={this.renderData}
                                />}
                        </View> :


                        <FlatList
                            data={serverDataGroupsInvites}
                            extraData={serverDataGroupsInvites}
                            renderItem={this.renderSeeAllData}
                        />
                      
                    } */}
                </ScrollView>
                {/* </Content> */}
            </SafeAreaView>

        );
    }
}

const Field = ({ src, onPress, title, img, description }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress}>
            <Image style={{ height: width / 7.5, width: width / 7.5, }} source={src} />
            <View style={{ marginStart: 10 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    )
}