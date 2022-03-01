import React, { Component } from 'react'
import { Text, View, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import HeaderComponent from '../../Common/HeaderComponent';
import styles from './styles';
import Button from '../../Common/Button';
import SettingsModal from '../../Modal/SettingsModal';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import StringConstants from '../../../constants/StringConstants';
import { isTSEnumMember } from '@babel/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCategoryModal from '../../Modal/ItemCategoryModal';

const { width } = Dimensions.get('window');

export default class MarketPlaceScreen extends Component {

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
            ],
            isNearForYou: false,
            userDetails: '',
            rowsperpage: 2,
            data: [],
            catId: '',
            categoryData: [],
            myAddsData: [],

        }
    }

    componentDidMount() {

        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getData(false)
                    this.getCategories()
                    this.getMyAdds();

                })
            }
        });
    }


    getCategories = () => {
        this.setState({ isLoading: true }, () => {
            fetch(GLOBAL.BASE_URL + 'api/MarektPlaceAPI/GetMktCategories',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },

                }).then((response) => response.json())
                .then((respData) => {
                    this.setState({ isLoading: false, categoryData: [...this.state.categoryData, ...respData.response] }, () => {
                        // console.log('categoryData-->>', JSON.stringify(this.state.categoryData))
                        // console.log('categoryData-->>',respData)
                    });
                }).catch((error) => {
                    console.log(error);
                });
        });
    }


    getData = (cat) => {
        this.offset = 1;
        const { userDetails, catId } = this.state;

        this.setState({ isLoading: true }, () => {
            fetch(GLOBAL.BASE_URL + 'api/MarektPlaceAPI/GetListing',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pagenumber: 1,
                        rowsperpage: 100,
                        mktCatId: cat == true ? catId : '',
                        // Id: userDetails.Id,
                        // UserId: userDetails.Id,
                        // Message: this.state.type,
                        // src: this.state.source,
                    })
                }).then((response) => response.json())
                .then((respData) => {
                    this.offset = this.offset + 1;
                    console.log('data respData-->>', (cat))

                    this.setState({ isLoading: false, data: respData.response }, () => {
                        console.log('data-->>', JSON.stringify(this.state.data))
                    });
                }).catch((error) => {
                    console.log(error);
                });
        });
    }


    getMyAdds = () => {
        this.offset = 1;

        const { userDetails } = this.state;
        // let body = {
        //     pagenumber: this.offset,
        //     rowsperpage: this.state.rowsperpage,
        //     Id: userDetails.Id,
        //     UserId: userDetails.Id,
        //     Message: this.state.description,
        //     src: this.state.profilePic
        // }
        // console.log('onPressNext body-->>', JSON.stringify(body))

        this.setState({ isLoading: true }, () => {
            fetch(GLOBAL.BASE_URL + 'api/MarektPlaceAPI/GetMyAdds',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pagenumber: 1,
                        rowsperpage: 10,
                        // GroupId: this.state.GroupId,
                        Id: userDetails.Id,
                        // UserId: userDetails.Id,
                        // Message: this.state.type,
                        // src: this.state.source
                    })
                }).then((response) => response.json())
                .then((respData) => {
                    this.offset = this.offset + 1;
                    this.setState({ isLoading: false, myAddsData: respData.response }, () => {
                        console.log('myAddsData-->>', JSON.stringify(this.state.myAddsData))
                        console.log('myAddsData-->>', respData)
                    });
                }).catch((error) => {
                    console.log(error);
                });
        });

    }


    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }

    // renderData = ({ item }) => {
    //     return (
    //         <View style={{ flexDirection: 'row', marginTop: 18 }}>
    //             <Image style={{ width: width / 5, height: width / 5 }} source={item.image} />
    //             <View style={{ marginStart: 25 }}>
    //                 <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
    //                 <Text style={{ color: '#6C6C6C', fontSize: 12, marginTop: 4 }}>{item.numOfFriend}</Text>

    //                 <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
    //                     <Button
    //                         title={StringConstants.BUTTON_CONFIRM}
    //                         onPress={() => alert('Under Development')}
    //                         customStyle={[styles.publishContainer, { width: width / 3.75, borderRadius: 10, height: 30, backgroundColor: '#530D89' }]}
    //                         titleStyle={{ fontSize: 12 }} />
    //                     <Button
    //                         title={StringConstants.BUTTON_DELETE}
    //                         onPress={() => alert('Under Development')}
    //                         customStyle={[styles.publishContainer, { backgroundColor: '#CEBFDA', marginStart: 10, width: width / 3.75, borderRadius: 10, height: 30, backgroundColor: '#CEBFDA' }]}
    //                         titleStyle={{ fontSize: 12, color: '#530D89' }} />
    //                 </View>
    //             </View>
    //         </View>
    //     )
    // }

    renderItem = ({ item }) => {
        var isError = false
        return (
            <TouchableOpacity
                style={{
                    marginTop: 10,
                    marginHorizontal: 2,
                    width: '47%',
                    marginRight: 8,
                    borderRadius: 10,
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                }}
                onPress={() => {
                    this.props.navigation.navigate('MarketPlaceDetailScreen', { id: item.ClassifiedId })
                }}>
                <View>
                    <Image
                        style={{ width: '100%', height: width / 2.41, borderRadius: 5 }}
                        source={
                            isError ?
                                require('../../../resources/images/no_image.png') :
                                {
                                    uri: 'https://godconnect.online/staging/UploadedImages/' + item.PostedImage
                                }
                        }
                        onError={(error) => {
                            isError = true
                        }}
                    />
                    <View style={{ paddingHorizontal: 8, paddingBottom: 10 }}>
                        <Text style={{ width: '95%', marginTop: 10 }}>{`$ ${item.ActualPrice == null ? 0 : item.ActualPrice}`}</Text>
                        <Text style={{ width: '95%', color: '#A592C5', fontSize: 12 }}>{item.AdTitle}</Text>
                        <Text style={{ width: '95%', color: '#828282', fontSize: 12 }}>{item.Location}</Text>
                    </View>
                    {/* <Button
                        title={`$ ${item.ActualPrice == null ? 0 : item.ActualPrice}`}
                        onPress={() => this.props.navigation.navigate('MarketPlaceDetailScreen', { id: item.ClassifiedId })}
                        customStyle={[{ width: '40%', height: 26, backgroundColor: '#530D89', borderRadius: 0, }]}
                        titleStyle={{ fontSize: 12, color: 'white' }} /> */}
                </View>
            </TouchableOpacity>
        )
    }
    setItem = (id, name) => {
        this.setState({ item: name, catId: id }, () => {
            this.getData(true)
        })
    }


    renderData = ({ item }) => {
        return (
            <View
                style={{
                    marginTop: 10, marginStart: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: width / 4.6, height: 70, borderRadius: 15,
                    elevation: 5, shadowColor: '#000',
                    shadowOffset: { width: 1, height: 1 },
                    // backgroundColor: 'white',
                    shadowOpacity: 0.2,
                    shadowRadius: 2, marginBottom: 5
                }}>
                {/* <Image style={{ width: 25, height: 25 }} source={require('../../../resources/images/ic_event_art.png')} /> */}
                <Text style={{ marginTop: 10, marginStart: 8, marginEnd: 8, color: '#707070', fontSize: 12 }}>{item.AdTitle}</Text>

            </View>
        )
    }

    render() {
        const { data, categoryData, myAddsData } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <HeaderComponent
                    title={true}
                    title={'MARKETPLACE'}
                    tapOnBack={() => this.props.navigation.goBack()} />

                <ScrollView refreshControl={
                    <RefreshControl
                        enabled={true}
                        refreshing={this.state.isLoading}
                        onRefresh={() => {
                            this.setState({ data: [] }, function () {
                                this.getData(false)
                            })
                        }} />
                }>
                    <View style={{ marginStart: 15, marginEnd: 15,marginTop:15 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <ItemCategoryModal 
                                countryList={categoryData}
                                containerStyle={[styles.inputContainer, {
                                    height: width / 9
                                }]}
                                showHeader={this.props.showHeader}
                                onRef={ref => (this.parentReference = ref)}
                                parentReference={this.setItem.bind(this)} />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ItemSaleScreen')}>
                                <Image style={styles.search} source={require('../../../resources/images/ic_add_mp.png')} />
                            </TouchableOpacity>
                        </View>
                        <View>

                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Text style={{ flex: 1, color: '#707070', fontSize: 14, fontWeight: 'bold', }}>My Adds</Text>
                                {myAddsData.length > 0 && <TouchableOpacity onPress={() => this.props.navigation.navigate('MarketPlaceNearYouScreen')}>
                                    <Text style={{ fontSize: 14, color: '#530D89' }}>See All</Text>
                                </TouchableOpacity>}
                            </View>
                            {myAddsData.length > 0 ? <View style={{ marginStart: 3, marginEnd: 3 }}>
                                <FlatList
                                    data={myAddsData}
                                    extraData={myAddsData}
                                    renderItem={this.renderData}
                                    horizontal={true}
                                />
                            </View> :
                                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 15 }}>No Adds Found!</Text>
                            }
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Text style={{ flex: 1, color: '#707070', fontSize: 14 }}>Today's Picks</Text>

                            </View>

                            {data.length > 0 ? <FlatList
                                style={{}}
                                data={data}
                                extraData={data}
                                contentContainerStyle={{ paddingBottom: 40 }}
                                renderItem={this.renderItem}
                                numColumns={2}
                            /> :
                                <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 15 }}>No Data Found</Text>
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}