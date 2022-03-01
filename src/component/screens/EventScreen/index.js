import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView, RefreshControl } from 'react-native'
import styles from './styles';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import Button from '../../Common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import GroupHeader from '../../Common/GroupHeader';
import AllEventScreen from '../AllEventScreen'
import moment from 'moment';
import InviteEventModal from '../../Modal/InviteEventModal';
import EventStaticsModal from '../../Modal/EventStaticsModal';

const { width } = Dimensions.get('window');

export default class EventScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                { image: require('../../../resources/images/ic_event_art.png'), title: 'Art' },
                { image: require('../../../resources/images/ic_event_art.png'), title: 'Art' },
                { image: require('../../../resources/images/ic_event_art.png'), title: 'Art' },
                { image: require('../../../resources/images/ic_event_art.png'), title: 'Art' },
                { image: require('../../../resources/images/ic_event_art.png'), title: 'Art' },
                { image: require('../../../resources/images/ic_event_art.png'), title: 'Art' },
                { image: require('../../../resources/images/ic_event_art.png'), title: 'Art' },
                { image: require('../../../resources/images/ic_event_art.png'), title: 'Art' },

            ],
            dataSource: [
                { image: require('../../../resources/images/ic_event_post.png'), title: 'Thailand Party Planners', description: 'Happening Now', createdBy: 'John', EventDate: '11/26/2021' },
                { image: require('../../../resources/images/ic_event_post.png'), title: 'Thailand Party Planners', description: 'Happening Now', createdBy: 'John', EventDate: '11/26/2021' },
                { image: require('../../../resources/images/ic_event_post.png'), title: 'Thailand Party Planners', description: 'Happening Now', createdBy: 'John', EventDate: '11/26/2021' },
                { image: require('../../../resources/images/ic_event_post.png'), title: 'Thailand Party Planners', description: 'Happening Now', createdBy: 'John', EventDate: '11/26/2021' },


            ],
            isLoading: false,
            userDetails: '',
            pastEventData: [],
            futureEventData: [],
            futureEventDataToShow: [],
            eventCategoryData: [],
            showInviteModal: false,
            EventId: '',
            intrested: false,
            showStatics: false, EventItem: '',
            isRefreshing: false,
            buttonData: [{ title: 'All', tab: false }, { title: 'Today', tab: false }, { title: 'Tommorow', tab: false }, { title: 'This Week', tab: false }, { title: 'This Weekened', tab: false }],
            selectedTab: -1,

        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    // this.getAllPastEventInfo();
                    this.getAllFutureEventInfo();
                    this.getEventCategories();

                })
            }
        });
    }


    // getAllPastEventInfo = () => {
    //     const { userDetails } = this.state;

    //     this.setState({ isLoading: true });

    //     fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetAllPastEvents',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 Id: userDetails.Id,
    //                 pagenumber: 0,
    //                 rowsperpage: 99999,
    //             })
    //         }).then((response) => response.json())
    //         .then((respData) => {
    //             this.setState({ isLoading: false, pastEventData: respData.response }, () => {
    //                 // console.log('pastEventData-->>', JSON.stringify(this.state.pastEventData))

    //             });


    //         }).catch((error) => {
    //             console.log(error);
    //         });
    // }

    // getAllPastEventInfo = () => {
    //     const { userDetails } = this.state;

    //     this.setState({ isLoading: true });

    //     fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetAllPastEvents',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 Id: userDetails.Id,
    //                 pagenumber: 0,
    //                 rowsperpage: 99999,
    //             })
    //         }).then((response) => response.json())
    //         .then((respData) => {
    //             this.setState({ isLoading: false, pastEventData: respData.response }, () => {
    //                 console.log('pastEventData-->>', JSON.stringify(this.state.pastEventData))

    //             });


    //         }).catch((error) => {
    //             console.log(error);
    //         });
    // }

    getAllFutureEventInfo = () => {
        const { userDetails } = this.state;

        this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetAllFutureEvents',
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
                this.setState({ isLoading: false, futureEventData: respData.response.reverse(), futureEventDataToShow: respData.response.reverse() }, () => {
                    console.log('futureEventData-->>', JSON.stringify(this.state.futureEventData))

                });
            }).catch((error) => {
                console.log(error);
            });
    }

    getEventCategories = () => {
        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetEventCategoris',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: undefined
            }).then((response) => response.json())
            .then((respData) => {
                console.log('eventCategoryData respData-->>', JSON.stringify(respData))

                this.setState({ isLoading: false, eventCategoryData: respData.response }, () => {
                    // console.log('eventCategoryData-->>', JSON.stringify(this.state.eventCategoryData))

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
        // onPress={() => this.props.navigation.navigate('BrowseEventScreen', { CategoryName: item.CategoryName })}
        return (
            <TouchableOpacity
                onPress={() => this.filter(item.CategoryName)}
                style={{
                    marginTop: 10, marginStart: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: width / 4.6, height: 90, borderRadius: 15,
                    elevation: 5, shadowColor: '#000',
                    shadowOffset: { width: 1, height: 1 },
                    // backgroundColor: 'white',
                    shadowOpacity: 0.2,
                    shadowRadius: 2, marginBottom: 5
                }}>
                <Image style={{ width: 25, height: 25 }} source={require('../../../resources/images/ic_event_art.png')} />
                <Text style={{ marginTop: 10, marginStart: 8, marginEnd: 8, color: '#707070', fontSize: 12 }}>{item.CategoryName}</Text>

            </TouchableOpacity>
        )
    }

    filter = (catName) => {
        console.log('CatName', catName)
        let tempArray = [...this.state.futureEventData];
        const filterArray = tempArray.filter((item) => item?.EventCategory?.CategoryName === catName);
        console.log('test =====', filterArray)
        this.setState({ futureEventDataToShow: filterArray })
    }

    onPressInterested = (id, type, index) => {
        const { userDetails } = this.state;

        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/SaveEventInterest',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: id,
                    UserId: userDetails.Id,
                    Message: type,
                })
            }).then((response) => response.json())
            .then((respData) => {
                console.log('respData Interested-->>', JSON.stringify(respData))
                console.log('body Interested-->>', JSON.stringify({
                    Id: id,
                    pagenumber: 0,
                    rowsperpage: 10,
                    Message: type,
                }))
                if (respData.response.StatusCode == 0) {
                    this.setState({ isLoading: false }, () => {
                        // console.log('eventCategoryData-->>', JSON.stringify(this.state.eventCategoryData))
                        let data = this.state.futureEventData
                        data[index].IsInterested = true
                        this.setState({ futureEventData: data, futureEventDataToShow: data })
                        this.getAllFutureEventInfo()
                        alert(respData.response.Message)

                    });
                }
            }).catch((error) => {
                console.log(error);
            });

    }



    onPressDelete = (id, type) => {
        const { userDetails } = this.state;

        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/DeleteEevent',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: id,
                    pagenumber: 0,
                    rowsperpage: 10,
                    Message: type,
                })
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false, }, () => {
                    console.log('respData delete-->>', JSON.stringify(respData.response))
                    alert(respData.response.Message)
                    this.getAllFutureEventInfo()
                });


            }).catch((error) => {
                console.log(error);
            });

    }


    onPressInvite = (id) => {
        const { userDetails } = this.state;

        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + `api/CommonAPI/InviteToEvent?userId=${userDetails.Id}&emailIds=${userDetails.Email}&eventId=${id}`,
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
                    console.log('respData invite-->>', JSON.stringify(respData.response))
                    alert(respData.response.Message)

                    this.getAllFutureEventInfo()
                });


            }).catch((error) => {
                console.log(error);
            });

    }


    renderDataSource = ({ item, index }) => {
        // console.log('==================================', item)
        return (
            <TouchableOpacity style={{
                marginTop: 15, backgroundColor: 'white', justifyContent: 'center', borderRadius: 15,
                marginBottom: 5, marginStart: 8, marginEnd: 8
            }} onPress={() => this.props.navigation.navigate('EventDetailScreen', { id: item.EventId })}>
                <Image style={{ width: width / 1.04, height: width / 1.9, alignSelf: 'center' }} source={{ uri: 'http://staging.godconnect.online/UploadedImages/EventImages/' + item.ImageUrl }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 8, marginEnd: 8, justifyContent: 'space-between', }}>

                    <Text style={{ color: '#530D89', fontWeight: '300', fontSize: 14 }}>{item.EventTitle}</Text>
                    <TouchableOpacity onPress={() => this.setState({ EventItem: item, showStatics: true })}>
                        <Text style={{ color: '#530D89', fontWeight: '300', fontSize: 14 }}>{'Event Statics'}</Text>
                        {/* <Image style={{ width: 25, height: 25, marginEnd: 10 }} source={require('../../../resources/images/ic_dot.png')} /> */}
                    </TouchableOpacity>
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

                <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: 10, marginStart: 8 }}>
                    <Button
                        title={'Invite'}
                        // onPress={() => this.onPressInvite(item.EventId)}
                        onPress={() => this.setState({ EventId: item.EventId, showInviteModal: true, })}
                        customStyle={[{ width: '45%', height: 45, backgroundColor: '#0D891E', marginTop: 10, borderRadius: 10 }]}

                        titleStyle={{ fontSize: 12 }} />
                    {item.PostedBy == this.state.userDetails.Id &&
                        <Button
                            title={'Delete'}
                            onPress={() => this.onPressDelete(item.EventId, 'delete')}
                            customStyle={[{ width: 100, height: 26, backgroundColor: '#E91C05', borderRadius: 8, marginStart: 8 }]}
                            titleStyle={{ fontSize: 12 }} />}
                    <Button
                        title={item.IsInterested == true ? 'You are interested in this event' : 'Interested'}
                        onPress={() => this.onPressInterested(item.EventId, 'save', index)}
                        customStyle={[{ width: '45%', height: 45, backgroundColor: '#530D89', marginTop: 10, borderRadius: 10 }]}
                        titleStyle={{ fontSize: 12 }} />
                </View>

            </TouchableOpacity>
        )
    }

    renderPastEvent = ({ item }) => {
        return (
            <View style={{
                marginTop: 10, marginStart: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: 88, height: 70, borderRadius: 15,
                elevation: 5, shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                // backgroundColor: 'white',
                shadowOpacity: 0.2,
                shadowRadius: 2, marginBottom: 5
            }}>
                <Image style={{ width: 25, height: 25 }} source={{ uri: 'http://staging.godconnect.online/UploadedImages/EventImages/' + item.ImageUrl }} />
                <Text style={{ marginTop: 10, marginStart: 8, marginEnd: 8, color: '#707070', }}>{item.EventTitle}</Text>

            </View>
        )
    }

    _updateRecipients = () => {
        this.getAllFutureEventInfo();
        this.getEventCategories();
    }

    onRefresh = () => {
        //set isRefreshing to true
        this.setState({ isRefreshing: true })
        this.getAllFutureEventInfo()
        // and set isRefreshing to false at the end of your callApiMethod()
    }

    onPressTab = (index) => {
        console.log(index)
        let data = [...this.state.buttonData];
        for (let i in data) {
            data[i].tab = false
        }
        data[index].tab = true
        this.setState({ selectedTab: index })
        this.setState({ buttonData: data })
    }

    renderTab = ({ item, index }) => {
        return (
            <GroupHeader
                title={item.title}
                onPress={() => this.onPressTab(index)}
                customStyle={[{ width: 125, height: 30, backgroundColor: item.tab ? '#530D89' : '#CEBFDA', borderRadius: 5, marginStart: 4 }]}
                titleStyle={{ fontSize: 18 }}
            // isSelected={item.isSelected}
            />
        )
    }
    onSelectedTab = (index) => {
        switch (index) {
            case 0:
                return (
                    <AllEventScreen />
                )

                break;
            case 1:
                return (
                    console.log('1')

                )
                break;
            case 2:

                return (
                    console.log('2')

                )
                break;
            case 3:

                return (
                    console.log('3')

                )
                break;
            case 4:

                return (
                    console.log('4')

                )

                break;
        }
    }
    render() {
        const { EventId, eventCategoryData, buttonData, selectedTab, pastEventData, futureEventData, showInviteModal, userDetails, showStatics, EventItem, futureEventDataToShow } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                {/* <Content> */}
                <TitleHeader title={true}
                    title={'EVENTS'}
                    tapOnBack={() => this.props.navigation.goBack()}
                    customHeaderStyle={{ width: width / 2.15 }}
                    tapOnEdit={() => this.props.navigation.navigate('EditInfoScreen')}
                    isEvent={true}
                    tapOnSearch={() => alert('Under Development')}
                    tapOnAdd={() => this.props.navigation.navigate('CreateEventScreen', { goBack: this._updateRecipients.bind(this) })}
                />
                {
                    showInviteModal &&
                    <InviteEventModal
                        showModal={showInviteModal}
                        userDetails={userDetails}
                        EventId={EventId}
                        dismissModalCallback={() => this.setState({ showInviteModal: false }, () => this.getAllFutureEventInfo())} />
                }
                {
                    showStatics &&
                    <EventStaticsModal
                        showModal={showInviteModal}
                        userDetails={userDetails}
                        EventItem={EventItem}
                        dismissModalCallback={() => this.setState({ showStatics: false }, () => this.getAllFutureEventInfo())} />
                }

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            enabled={true}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.setState({ futureEventData: [], futureEventDataToShow: [] }, function () {
                                    this.getAllFutureEventInfo()
                                })
                            }} />
                    }>
                    <View style={{ flex: 1, backgroundColor: '#FBFBF9' }}>

                        <View style={{ flexDirection: 'row', marginStart: 15, marginEnd: 8 }}>

                            <FlatList
                                ref={this.flatListRef}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={buttonData}
                                renderItem={this.renderTab}
                                keyExtractor={item => item.id}
                            />

                        </View>
                        {
                            (selectedTab != 0 && selectedTab != 1 && selectedTab != 2 && selectedTab != 3 && selectedTab != 4) ?
                                <>
                                    <Text style={{ marginTop: 10, marginStart: 10, marginEnd: 8, color: '#707070', fontWeight: 'bold' }}>Browse Events</Text>
                                    <View style={{ marginStart: 10, marginEnd: 10 }}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            data={eventCategoryData}
                                            extraData={eventCategoryData}
                                            renderItem={this.renderItem}
                                            horizontal={true}
                                        />
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', marginTop: 10, marginStart: 10, marginEnd: 10 }}>
                        <Text style={{ color: '#707070', fontWeight: 'bold', flex: 1 }}>Past Events</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PastEventScreen')}>
                            <Text style={{ color: '#707070', fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginStart: 10, marginEnd: 10 }}>
                        <FlatList
                            data={pastEventData}
                            extraData={pastEventData}
                            renderItem={this.renderPastEvent}
                            horizontal={true}
                        />
                    </View> */}
                                    <Text style={{ marginTop: 10, marginStart: 8, marginEnd: 8, color: '#707070', fontWeight: 'bold' }}>Future Events</Text>

                                    <View style={{ marginStart: 10, marginEnd: 10, marginBottom: 20 }}>
                                        {futureEventDataToShow.length > 0 ?
                                            <FlatList
                                                data={futureEventDataToShow}
                                                extraData={futureEventDataToShow}
                                                renderItem={this.renderDataSource}
                                            //  onRefresh={this.onRefresh}
                                            // refreshing={this.state.isRefreshing}
                                            />
                                            :
                                            <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 150 }}>No Events Found!</Text>}
                                    </View>
                                </>
                                :
                                <>
                                    {this.onSelectedTab(this.state.selectedTab)}
                                </>

                        }

                    </View>

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