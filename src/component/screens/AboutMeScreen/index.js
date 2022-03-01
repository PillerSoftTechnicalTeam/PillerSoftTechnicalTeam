import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native'
import styles from './styles';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import HeaderComponent from '../../Common/HeaderComponent';
import AppConstants from '../../../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import GLOBAL from '../../../constants/ApiConstants';

export default class AboutMeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: this.props?.route?.params?.userName,
            value: '',
            password: '',
            data: '',
            userDetails: '',
            isLoading: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getData()
                })
            }
        });
    }

    getData = () => {
        this.setState({ isLoading: true }, () => {
            fetch(GLOBAL.BASE_URL + `api/UserMgmtAPI/GetUserAbout?uId=${this.state.userDetails.Id}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then((response) => response.json())
                .then((respData) => {
                    this.setState({ isLoading: false, data: respData.response }, () => {
                        console.log('data dvdv-->>', JSON.stringify(this.state.data))
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


    _updateRecipients = () => {
        this.getData();
    }


    render() {
        const { data, isLoading, userName } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <Content>
                    

                    <HeaderComponent
                        title={true}
                        isEdit={userName ? false : true}
                        title={userName ? `About ${userName}` : 'ABOUT YOU'}
                        tapOnBack={() => this.props.navigation.goBack()}
                        tapOnEdit={() => this.props.navigation.navigate('EditInfoScreen', { goBack: this._updateRecipients.bind(this) })}
                    />
                    <View style={{ marginStart: 15, marginEnd: 15 }}>

                        {data != '' ? <View>
                            <Field
                                src={require('../../../resources/images/ic_designer.png')}
                                title={'About Me'}
                                description={data.AboutMe != null ? data.AboutMe : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_heart_about.png')}
                                title={'Religion'}
                                description={data.Religion != null ? data.Religion : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_mobile.png')}
                                title={'Church'}
                                description={data.Church != null ? data.Church : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_location.png')}
                                title={'AgeGroup'}
                                description={data.AgeGroup != null ? data.AgeGroup : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_live_insta.png')}
                                title={'Education'}
                                description={data.Education != null ? data.Education : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_add_about.png')}
                                title={'Location'}
                                description={data.Location != null ? data.Location : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_add_about.png')}
                                title={'Language'}
                                description={data.Language != null ? data.Language : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_add_about.png')}
                                title={'Skills'}
                                description={data.Skills != null ? data.Skills : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_add_about.png')}
                                title={'Intersts'}
                                description={data.Intersts != null ? data.Intersts : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_add_about.png')}
                                title={'VolunteerIntersts'}
                                description={data.VolunteerIntersts != null ? data.VolunteerIntersts : ''}
                                onPress={() => alert('Under development')} />

                            <Field
                                src={require('../../../resources/images/ic_add_about.png')}
                                title={'MyLinks'}
                                description={data.MyLinks != null ? data.MyLinks : ''}
                                onPress={() => alert('Under development')} />
                        </View> :
                            <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 100 }}>{isLoading ? 'Loading.....' : 'No Data Found'}</Text>}
                    </View>


                </Content>
            </View>
        );
    }
}

const Field = ({ src, onPress, title, img, description }) => {
    return (
        <View style={styles.container}>
            {/* <Image style={{ height: width / 7.5, width: width / 7.5, }} source={src} /> */}
            <View style={{ marginStart: 20 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}