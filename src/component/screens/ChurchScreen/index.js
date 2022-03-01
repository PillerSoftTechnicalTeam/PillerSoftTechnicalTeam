import React, { Component } from 'react'
import { Text, View, Dimensions, SafeAreaView, TextInput, Image, Platform, Alert, PermissionsAndroid, } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const { width, height } = Dimensions.get('window');
const navigation = require('../../../resources/images/ic_church_nav.png');

export default class ChurchScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: ['', '', '', '', '', ''],
            region: undefined,
            churchesData: []

        }
    }

    componentDidMount() {

        if (Platform.OS === 'android') {
            this._requestPermission();
        } else {
            this._fetchLocation();
        }

        this._sub = this.props.navigation.addListener(
            'didFocus',
            this.refreshScreen
        );
    }


    _requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'GodConnect',
                    'message': 'GodConnect needs access to your location ',
                    buttonPositive: 'Access'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location", granted)
                this._fetchLocation();
            } else {
                console.log("location permission denied", granted)
                Alert.alert(`Alert`, `Location permission denied.`)
            }
        } catch (err) {
            console.warn(err)
        }
    }

    _fetchLocation = () => {
        // Geolocation.getCurrentPosition(position => this.setState({ region: this.regionFrom(position.coords.latitude, position.coords.longitude, position.coords.accuracy) }, () => {
        //   console.log('info----->>>>>>>>', JSON.stringify(position))
        // }));
        Geolocation.getCurrentPosition(
            position => {
                console.log(`Location is : ${JSON.stringify(position)}`);

                this.setState({
                    region: this.regionFrom(position.coords.latitude, position.coords.longitude, position.coords.accuracy)
                }, function () {

                    console.log(`Region _fetchLocation is : ${JSON.stringify(this.state.region)}`);
                    this._getPostalAddress(this.state.region)

                });
            },
            error => {
                console.log(`error _fetchLocation:${JSON.stringify(error)}`)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = Geolocation.watchPosition(position => {
            console.log(`Location is watchID : ${JSON.stringify(position)}`);
            this.setState({
                region: this.regionFrom(position.coords.latitude, position.coords.longitude,)

            }, () => {
                console.log(`Region _fetchLocation2 is : ${JSON.stringify(this.state.region)}`);
                this._getPostalAddress(this.state.region)
            });
        });

    }


    regionFrom = (lat, lon, accuracy) => {
        // const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        // const circumference = (40075 / 360) * 1000;

        // const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        // const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

        return {
            latitude: lat,
            longitude: lon,
            // latitudeDelta: Math.max(0, latDelta),
            // longitudeDelta: Math.max(0, lonDelta)
        };
    }


    _getPostalAddress = (region) => {

        console.log('region.latitude:', region.latitude);
        console.log('region.longitude:', region.longitude);

        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=2000&type=churches&keyword=Church&key=${"AIzaSyCceRTsiY-2UPVwytF6wytwaGmonWjvTHo"}`
        console.log('url--->>>', url);

        fetch(url
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success _getPostalAddress:', data.results);
                this.setState({ churchesData: data.results })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }

    renderItem = ({ item }) => {
        console.log("TEST item", JSON.stringify(item));

        return (<View style={{ flexDirection: 'row', padding: 8, marginStart: 10, marginEnd: 10, marginTop: 10 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>{item.vicinity}</Text>
                <View>
                    <Text style={{ fontSize: 16, marginTop: 5 }}>{item.rating}</Text>
                    {/* <Image /> */}
                </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../../resources/images/ic_web.png')} />
                    <Text style={{ fontSize: 12, marginTop: 8 }}>Website</Text>
                </View>
                <View style={{ marginStart: 10, alignItems: 'center' }}>
                    <Image source={require('../../../resources/images/ic_direction.png')} />
                    <Text style={{ fontSize: 12, marginTop: 8 }}>Direction</Text>
                </View>
            </View>

        </View>)
    }
    render() {
        const { data, region,churchesData } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <TitleHeader title={true} title={'CHURCHES NEARBY'} tapOnBack={() => this.props.navigation.goBack()} />
                <View style={{ marginStart: 15, marginEnd: 15, }}>
                    <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center', height: 52, width: width / 1.1, borderRadius: 12, borderColor: '#CEBFDA', borderWidth: 1 }}>
                        <TextInput
                            style={{ flex: 1 }}
                            placeholder={'Search here...'} />
                        <Image style={{ marginEnd: 5 }} source={require('../../../resources/images/ic_loc.png')} />
                    </View>
                </View>


                <MapView
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                    style={{
                        // position: 'absolute',
                        top: 15,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        minHeight: 272
                    }}
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                    zoomControlEnabled={true}
                    pitchEnabled={true}
                    minZoomLevel={1}
                    maxZoomLevel={15}
                    region={region && {
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {/* {region && <Marker coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                        image={navigation}
                    />
                    } */}
                    {churchesData.map((host, i) => {
                            console.log("TEST host", host);

                        if (host.geometry.location.lat && host.geometry.location.lng) {
                            console.log("TEST qwertyuiosdfghjm", host.name);
                            return (<Marker
                                key={i}
                                coordinate={{
                                    latitude: host.geometry.location.lat,
                                    longitude: host.geometry.location.lng
                                }}
                                title={host.name}
                                // pinColor={"red"}
                                // image={navigation}
                                // width={0.3}
                                // height={0.3}
                           >
                               {/* <Text style={{fontSize:14}}>{host.name}</Text> */}
                              <Image source={navigation} style={{width:30,height:30}}/> 
                               </Marker>)
                        }
                    })}
                </MapView>


                <FlatList
                    data={churchesData}
                    extraData={churchesData}
                    renderItem={this.renderItem} />


            </SafeAreaView>
        );
    }
}