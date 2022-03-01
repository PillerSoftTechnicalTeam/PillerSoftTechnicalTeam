import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, SafeAreaView } from 'react-native'
import styles from './styles';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import Button from '../../Common/Button';
import SettingsModal from '../../Modal/SettingsModal';
import Loading from '../../Common/Loader';
import GroupHeader from '../../Common/GroupHeader';

import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import moment from 'moment';

export default class DiscoverScreen extends Component {

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
            userDetails: '',
            isSelected: false,
            buttonData: [{ title: 'New for you', isSelected: false }, { title: 'Your Group', isSelected: false }, { title: 'Discover', isSelected: true }, { title: 'Notifications', isSelected: false }, { title: 'Your Feeds', isSelected: false }]


        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            // console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getMyGroupInfo();
                })
            }
        });

    }

    getMyGroupInfo = () => {
        const { userDetails } = this.state;

        this.setState({ isLoading: true });

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
                this.setState({ isLoading: false, serverDataGroupSuggestions: respData.response }, () => {
                    console.log('serverDataGroupSuggestions-->>', JSON.stringify(this.state.serverDataGroupSuggestions))

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
                <Image style={{ width: 98, height: 76, borderRadius: 8 }} source={item.image} />
                <Text style={{ fontSize: 10, position: 'absolute', top: 60, color: 'white', textAlign: 'center' }}>Buy and Sell Group</Text>
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




    render() {
        const { isLoading, dataSource, isSeeAll, showModal, serverDataGroupSuggestions, isSelected, buttonData } = this.state;

        return (
            <>
                <Loading loading={this.state.isLoading} loaderColor={'white'} />

                {/* <Content> */}


                {/* <TitleHeader title={false} title={'DISCOVER'} tapOnBack={() => this.props.navigation.goBack()}
                    tapOnEdit={() => this.props.navigation.navigate('EditInfoScreen')}
                    isGroups={true}
                    tapOnSetting={() => this.setState({ showModal: true })}
                    tapOnSearch={() => alert('Under Development')}
                    tapOnAdd={() => this.props.navigation.navigate('CreateGroupScreen')}
                    customTitleStyle={{ marginStart: 22, width: width / 3.57 }}
                    customHeaderStyle={{ width: width / 2.6, }}

                /> */}
                <View style={{ marginStart: 18, marginEnd: 18 }}>


                </View>

                {serverDataGroupSuggestions.length > 0 ? <FlatList
                    style={{ marginBottom: 12, marginStart: 20, marginEnd: 20 }}
                    data={serverDataGroupSuggestions}
                    extraData={serverDataGroupSuggestions}
                    renderItem={this.renderData}
                /> :
                    <Text style={{ fontSize: 16, marginTop: 150, fontWeight: '900', textAlign: 'center' }}>{isLoading ? '' : 'No Groups Found'}</Text>}

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