import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, SafeAreaView, RefreshControl, ScrollView } from 'react-native'
import styles from './styles';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import SearchModal from '../../Modal/SearchModal';
import GroupHeader from '../../Common/GroupHeader';

import SettingsModal from '../../Modal/SettingsModal';
import Loading from '../../Common/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import moment from 'moment';

export default class RecentActivity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },

            ],

            dataSource: [{
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
            buttonData: [{ title: 'New for you', isSelected: true }, { title: 'Your Group', isSelected: false }, { title: 'Discover', isSelected: false }, { title: 'Notifications', isSelected: false }, { title: 'Your Feeds', isSelected: false }]

        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            // console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                   
                    this.getGroupInvite();
                })
            }
        });

    }

    getAllGroupInfo = () => {
        const { userDetails } = this.state;

        // this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetMyGroups',
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
                this.setState({ serverDataMyGroups: respData.response }, () => {
                    console.log('serverDataMyGroups-->>', JSON.stringify(this.state.serverDataMyGroups))

                });


            }).catch((error) => {
                console.log(error);
            });

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
                // this.handleGroupSuggestions(respData.response);
                this.setState({ serverDataGroupSuggestions: respData.response }, () => {
                    console.log('serverDataGroupSuggestions-->>', JSON.stringify(this.state.serverDataGroupSuggestions))

                });
            }).catch((error) => {
                console.log(error);
            });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetJoinedGroups',
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
                // this.handleGroupJoined(respData.response);
                this.setState({ isLoading: false, serverDataGroupsJoined: respData.response }, () => {
                    console.log('serverDataGroupsJoined-->>', JSON.stringify(this.state.serverDataGroupsJoined))

                });
            }).catch((error) => {
                console.log(error);
            });
    }

    getGroupInvite = () => {
        const { userDetails } = this.state;
        this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetGroupInvitesList',
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
                this.setState({ isLoading: false, serverDataGroupsInvites: respData.response }, () => {
                    console.log('serverDataGroupsInvites-->>', JSON.stringify(this.state.serverDataGroupsInvites))
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }



    renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: 10, marginStart: 5 }}>
                <Image style={{ width: width / 4.26, height: width / 4.26, borderRadius: 8 }} source={{ uri: 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />
                <Text style={{ fontSize: 12, position: 'absolute', top: width / 6, color: 'white', fontWeight: 'bold', left: 9 }}>{item.GroupName}</Text>
                {/* <Button
                    title={item.price}
                    onPress={() => alert('Under Development')}
                    customStyle={[{ width: width / 2.17, height: 26, backgroundColor: '#530D89', borderRadius: 0, }]}
                    titleStyle={{ fontSize: 12 }} /> */}
            </View>
        )
    }



    renderData = ({ item }) => {
        return (
            <View style={styles.dataContainer}>
                <View style={{ flexDirection: 'row' }}>
                    {/* <Image style={{ height: width / 9.8, width: width / 9.8 }} source={{ uri: item.GroupOwnerPicture != null ? 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + item.GroupOwnerPicture : 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} /> */}
                    <Image style={{ height: width / 9.8, width: width / 9.8 }} source={{ uri: 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />

                    <View style={{ marginStart: 8 }}>
                        <Text style={styles.dataTitleLabel}>{item.GroupOwnerName}</Text>
                        <Text style={{ fontSize: 12, color: '#BABDC9', marginTop: 1 }}>{moment(item.CreatedOn).format('LL')}</Text>

                    </View>

                </View>
                <Text style={{ fontSize: 13, color: '#444D6E', marginTop: 10, }}>{item.GroupDescription}</Text>

                {/* <Image style={styles.postImg} source={{ uri: item.GroupImage != null ? 'http://staging.godconnect.online/UploadedImages/' + item.GroupImage : 'http://staging.godconnect.online/UploadedImages/dummy.png' }} /> */}
                <Image style={styles.postImg} source={{ uri: 'http://staging.godconnect.online/UploadedImages/dummy.png' }} />

                {/* <View style={styles.dataBottomLeftContainer}> */}
                {/* <View style={{ flex: 0.5, flexDirection: 'row', }}>
                        <Image style={{ height: 18, width: 18, }} source={require('../../../resources/images/ic_like.png')} />
                        <Image style={{ height: 18, width: 18, marginStart: width / 7.5 }} source={require('../../../resources/images/ic_comment.png')} />
                    </View> */}

                {/* <View style={{ flex: 0.55, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}> */}
                {/* <Text style={{ fontSize: 12, color: '#747EA0' }}>{'30 Comments 50'}</Text> */}
                {/* <Image style={{ height: 22, width: 22, marginStart: 5 }} source={item.like} /> */}
                {/* <Image style={{ height: 22, width: 22, }} source={item.heart} /> */}
                {/* </View> */}
                {/* </View> */}
                <TouchableOpacity style={{width:'100%', height:35, backgroundColor:'#530D89', borderRadius:5, alignSelf:'flex-end', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'white'}}>Join</Text>
                </TouchableOpacity>

            </View>


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
                                    this.getAllGroupInfo()
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

                        <View style={{ backgroundColor: 'white', borderTopRightRadius: 15, borderTopLeftRadius: 15, marginTop: 10, padding: 8, marginStart: 8, marginEnd: 8, flex: 1 }}>
                            <View style={{ flexDirection: 'row', }}>
                                {/* <Image style={{}} source={require('../../../resources/images/ic_home_post.png')} />

                        <View style={{ marginStart: 10, flex: 1 }}>
                            <Text style={{ fontSize: 10, color: '#707070', marginEnd: 40 }}>Vinit Patil posted in Tata Owners India</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                <Image style={{ height: 8, width: 8 }} source={require('../../../resources/images/ic_small_dot.png')} />
                                <Text style={{ fontSize: 8, color: '#707070', marginStart: 3 }}>3 Days ago</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => this.setState({ isSeeAll: true })}>
                            <Text style={{ fontSize: 12, color: '#530D89' }}>See All</Text>
                        </TouchableOpacity> */}
                                {/* {
                                    serverDataGroupsInvites.map(() => {
                                        return (
                                            <View>
                                                <Image style={{}} source={require('../../../resources/images/ic_home_post.png')} />

                                                <View style={{ marginStart: 10, flex: 1 }}>
                                                    <Text style={{ fontSize: 10, color: '#707070', marginEnd: 40 }}>Vinit Patil posted in Tata Owners India</Text>
                                                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                                        <Image style={{ height: 8, width: 8 }} source={require('../../../resources/images/ic_small_dot.png')} />
                                                        <Text style={{ fontSize: 8, color: '#707070', marginStart: 3 }}>3 Days ago</Text>
                                                    </View>
                                                </View>

                                                <TouchableOpacity onPress={() => this.setState({ isSeeAll: true })}>
                                                    <Text style={{ fontSize: 12, color: '#530D89' }}>See All</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                } */}
                            </View>



                            <Text style={{ color: '#707070', fontSize: 14, marginTop: 10 }}>Recent Activity</Text>


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