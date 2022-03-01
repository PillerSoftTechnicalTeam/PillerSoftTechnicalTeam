import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, SafeAreaView } from 'react-native'
import styles from './styles';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import Button from '../../Common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import moment from 'moment';
const { width } = Dimensions.get('window');
import Loading from '../../Common/Loader';

export default class AllEventScreen extends Component {

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
            eventCategoryData: []
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            // console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    // this.getAllPastEventInfo();
                    // this.getAllFutureEventInfo();
                    // this.getEventCategories();

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
                this.setState({ isLoading: false, futureEventData: respData.response }, () => {
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
                    console.log('eventCategoryData-->>', JSON.stringify(this.state.eventCategoryData))

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
            <TouchableOpacity onPress={() =>this.props.navigation.navigate('BrowseEventScreen')}
                style={{
                    marginTop: 10, marginStart: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: 88, height: 70, borderRadius: 15,
                    elevation: 5, shadowColor: '#000',
                    shadowOffset: { width: 1, height: 1 },
                    // backgroundColor: 'white',
                    shadowOpacity: 0.2,
                    shadowRadius: 2, marginBottom: 5
                }}>
                <Image style={{ width: 25, height: 25 }} source={require('../../../resources/images/ic_event_art.png')} />
                <Text style={{ marginTop: 10, marginStart: 8, marginEnd: 8, color: '#707070', }}>{item.CategoryName}</Text>

            </TouchableOpacity>
        )
    }

    onPressInterested = (id, type) => {
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
                    pagenumber: 0,
                    rowsperpage: 10,
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


                this.setState({ isLoading: false, }, () => {
                    // console.log('eventCategoryData-->>', JSON.stringify(this.state.eventCategoryData))

                });


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


    renderDataSource = ({ item }) => {
        return (
            <View style={{
                marginTop: 15, backgroundColor: 'white', justifyContent: 'center', borderRadius: 15,
                marginBottom: 5, marginStart: 8, marginEnd: 8
            }}>
                <Image style={{ width: width / 1.04, height: width / 1.9, alignSelf: 'center' }} source={{ uri: 'http://staging.godconnect.online/UploadedImages/EventImages/' + item.ImageUrl }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 8, marginEnd: 8 }}>
                    <Text style={{ marginTop: 10, color: '#530D89', fontWeight: '300', flex: 1, fontSize: 14 }}>{item.EventTitle}</Text>
                    <Image style={{ width: 25, height: 25, marginEnd: 10 }} source={require('../../../resources/images/ic_dot.png')} />
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

                <View style={{ flexDirection: 'row', marginTop: 10, marginStart: 8 }}>
                    <Button
                        title={'Invite'}
                        onPress={() => this.onPressInvite(item.EventId)}
                        customStyle={[{ width: width / 3.75, height: 26, backgroundColor: '#0D891E', borderRadius: 8, }]}
                        titleStyle={{ fontSize: 12 }} />
                    <Button
                        title={'Delete'}
                        onPress={() => this.onPressDelete(item.EventId, 'delete')}
                        customStyle={[{ width: 100, height: 26, backgroundColor: '#E91C05', borderRadius: 8, marginStart: 8 }]}
                        titleStyle={{ fontSize: 12 }} />

                </View>
                <Button
                    title={'Interested'}
                    onPress={() => this.onPressInterested(item.EventId, 'save')}
                    customStyle={[{ width: width / 1.04, height: 26, backgroundColor: '#530D89', marginStart: 8, marginTop: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderRadius: 0 }]}
                    titleStyle={{ fontSize: 12 }} />
            </View>
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

    render() {
        const { data, eventCategoryData, pastEventData, futureEventData,isLoading } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <Loading loading={this.state.isLoading} loaderColor={'white'} />

                {/* <TitleHeader title={true} title={'EVENTS'} tapOnBack={() => this.props.navigation.goBack()}
                    customHeaderStyle={{ width: width / 2.5 }}
                    tapOnEdit={() => this.props.navigation.navigate('EditInfoScreen')}
                    // isEvent={true}
                    tapOnSearch={() => alert('Under Development')}
                    tapOnAdd={() => this.props.navigation.navigate('CreateEventScreen')}
                /> */}

                <View style={{ backgroundColor: 'white' ,flex:1}}>
                   
                    

                    <View style={{ flexDirection: 'row', marginTop: 10, marginStart: 10, marginEnd: 10 }}>
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
                    </View>


                    <Text style={{ marginTop: 10, marginStart: 8, marginEnd: 8, color: '#707070', fontWeight: 'bold' }}>Future Events</Text>


                    <FlatList
                        data={futureEventData}
                        extraData={futureEventData}
                        renderItem={this.renderDataSource}
                    />
                </View>

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