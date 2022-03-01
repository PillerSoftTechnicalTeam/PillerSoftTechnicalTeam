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

import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import moment from 'moment';

export default class GroupSuggestions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isSeeAll: false,
            showModal: false,
            serverDataMyGroups: [],
            isLoading: false,
            serverDataGroupSuggestions: [],
            serverDataGroupsJoined: [],
            serverDataGroupsInvites: [],
            userDetails: '',
            isSelected: false,
            searchModal: false,
            searchList: [],
            searchItem: '',

        }
    }

    discoverTab() {
        // Alert.alert("hsbsncns")
        this.props.discoverTab()
    }




    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            // console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getSuggestedGroups()
                })
            }
        });

    }

    getSuggestedGroups = () => {
        const { userDetails } = this.state;

        // this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetGroupSuggestions',
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
                this.setState({ serverDataGroupSuggestions: respData.response }, () => {
                    console.log('serverDataGroupSuggestions-->>', JSON.stringify(this.state.serverDataGroupSuggestions))

                });
            }).catch((error) => {
                console.log(error);
            });
    }

    joinGroup = (Id) => {
        const { userDetails } = this.state;
        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/JoinGroup',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    GroupId: Id,
                    UserId: userDetails.Id,
                })
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false }, () => {
                    console.log('Group Joining Response-->>', JSON.stringify(respData.response))
                    this.getSuggestedGroups()
                });


            }).catch((error) => {
                console.log(error);
            });
    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }

    renderData = ({ item }) => {
        return (
            <Pressable>
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
            </Pressable>


        )
    }


    renderSeeAllData = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 15, marginStart: 8, marginEnd: 8 }}>
                <Image style={{ marginStart: 8 }} source={require('../../../resources/images/ic_home_post.png')} />

                <View style={{ marginStart: 10, flex: 1 }}>
                    <Text style={{ fontSize: 10, color: '#707070', marginEnd: 40 }}>Vinit Patil posted in Tata Owners India</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        <Image style={{ height: 8, width: 8 }} source={require('../../../resources/images/ic_small_dot.png')} />
                        <Text style={{ fontSize: 8, color: '#707070', marginStart: 3 }}>3 Days ago</Text>
                    </View>
                </View>



            </View>
        )
    }



    onChangeSearch = (text) => {

        const { searchList, serverDataGroupSuggestions } = this.state;
        const newData = serverDataGroupSuggestions.filter(function (item) {
            const itemData = item.GroupName ? item.GroupName.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        // newData.sort((a, b) => { return a.name.localeCompare(b.name); });
        this.setState({ searchList: newData, searchItem: text }, () => {
            this.onSearchGroup()
        });
    }

    onSearchGroup = () => {
        const { userDetails, searchItem } = this.state;
        this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/SearchGroups',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Id: userDetails.Id,
                    // pagenumber: 0,
                    // rowsperpage: 10,
                    Message: searchItem,
                    GroupOwner: userDetails.Id,
                    // src: "string",
                    search: searchItem,
                })
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false, searchList: respData.response, searchModal: false }, () => {
                    console.log('searchList-->>', JSON.stringify(this.state.searchList))
                });
            }).catch((error) => {
                console.log(error);
            });
    }


    render() {
        const { searchList, searchModal, isSeeAll, showModal, serverDataGroupSuggestions, buttonData, serverDataGroupsInvites } = this.state;

        return (
            <>
                <Loading loading={this.state.isLoading} loaderColor={'white'} />

                {/* {
                    showModal &&
                    <SettingsModal
                        dismissModalCallback={() => this.setState({ showModal: false })}
                        customStyle={{ marginTop: width / 8.94 }} />
                } */}

                {
                    searchModal &&
                    <SearchModal
                        onChangeSearch={(text) => this.onChangeSearch(text)}
                        dismissModalCallback={() => this.setState({ searchModal: false })}
                        customStyle={{ marginTop: width / 3.94 }} />
                }
                {/* <TitleHeader title={false} title={'GROUPS'} tapOnBack={() => this.props.navigation.goBack()}
                    tapOnEdit={() => this.props.navigation.navigate('EditInfoScreen')}
                    isGroups={true}
                    // tapOnSetting={() => this.setState({ showModal: true })}
                    tapOnSearch={() => this.setState({ searchModal: true })}
                    tapOnAdd={() => this.props.navigation.navigate('CreateGroupScreen')}
                    customTitleStyle={{ marginStart: 22, width: width / 3.59, }}
                    customHeaderStyle={{ width: width / 2.6, }}

                /> */}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            enabled={true}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.setState({ serverDataMyGroups: [] }, function () {
                                    this.getSuggestedGroups()
                                })
                            }} />
                    }>
                    {/* <View style={{marginStart: 8, marginEnd: 8 }}>

                        <FlatList
                            data={serverDataGroupSuggestions}
                            extraData={serverDataGroupSuggestions}
                            renderItem={this.renderItem}
                            horizontal={true}
                        />

                    </View> */}
                    {!isSeeAll ?

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
                        // <View style={{ flexDirection: 'row', }}>
                        //     <Image style={{ marginStart: 8 }} source={require('../../../resources/images/ic_home_post.png')} />

                        //     <View style={{ marginStart: 10, flex: 1 }}>
                        //         <Text style={{ fontSize: 10, color: '#707070', marginEnd: 40 }}>Vinit Patil posted in Tata Owners India</Text>
                        //         <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        //             <Image style={{ height: 8, width: 8 }} source={require('../../../resources/images/ic_small_dot.png')} />
                        //             <Text style={{ fontSize: 8, color: '#707070', marginStart: 3 }}>3 Days ago</Text>
                        //         </View>
                        //     </View>



                        // </View>
                    }
                </ScrollView>
                {/* </Content> */}
            </>

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