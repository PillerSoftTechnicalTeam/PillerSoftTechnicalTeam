import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native'
import styles from './styles';
import Header from '../../Common/Header';
import Toast, { DURATION } from 'react-native-easy-toast'
import Field from '../../Common/Field';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import { Content } from 'native-base';
import FieldContainer from '../../Common/FieldContainer';
import Loading from '../../Common/Loader';
import Validator from 'validator';
import GLOBAL from '../../../constants/ApiConstants';

const { width } = Dimensions.get('window');
// const selected = require('../resources/images/check_box.png')
// const unselected = require('../resources/images/check_box_blue.png')

export default class ForgetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isLoading: false

        }
    }

    componentDidMount() {

    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }

    tapOnLogin = () => {

        const { email, password } = this.state
        if (email.trim() == '') {
            alert('Please enter Email');
            return;
        } else if (email.trim() != '') {
            if (!Validator.isEmail(email)) {
                alert('Please enter valid email.');
                return;
            }
        }
        // this.setState({ isLoading: true });

        // fetch(GLOBAL.BASE_URL + '/api/UserMgmtAPI/ForgetPassword', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body:
        //         { emailId: this.state.email }
        // }).then((response) => response.json())
        //     .then((responseData) => {
        //         console.log('responseData', JSON.stringify(responseData));
        //         alert(responseData)

        //         if (responsedata.response.SuccessCode == 0) {
        //             this.setState({ isLoading: false });
        //             alert(responsedata.response.Message);
        //         }
        //         else {
        //             alert('vsdv')
        //             this.setState({ isLoading: false });
        //             Alert.alert(responsedata.response.Message);
        //             this.props.navigation.navigate("LoginScreen");
        //         }
        //     }).catch((error) => {
        //         console.log('error', error);
        //     });

        fetch(GLOBAL.BASE_URL + 'api/UserMgmtAPI/ForgotPassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailId: this.state.email,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.response.SuccessCode == 0) {
                    this.setState({ isLoading: false });
                    alert(responseData.response.Message);
                }
                else {
                    this.setState({ isLoading: false });
                    Alert.alert(responseData.response.Message);
                    this.props.navigation.navigate("ResetPasswordScreen");

                }
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Content>
                    <Header title={StringConstants.FORGOT_PASSWORD}
                        headerStyle={{ width: width }}
                        titleStyle={{ left: '5%' }}
                        isAuth={true} />
                    <Loading loading={this.state.isLoading} loaderColor={'white'} />

                    <FieldContainer
                        children={
                            <View style={{ marginTop: width / 5.35, marginBottom: 180 }}>
                                <Field title={StringConstants.REGISTERED_EMAIL} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ email: text })} />
                                <Button
                                    title={StringConstants.RESET}
                                    onPress={() => this.tapOnLogin()}
                                    customStyle={{ marginTop: 35 }} />

                                <TouchableOpacity style={styles.accountContainer} onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                    <Text style={styles.accountLabel}>{StringConstants.HAVE_ACCOUNT}<Text style={{ color: '#F4A50C', fontWeight: '600' }}>{' Log In'}</Text></Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.accountContainer} onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                                    <Text style={styles.accountLabel}>{StringConstants.DONT_HAVE_ACCOUNT}<Text style={{ color: '#F4A50C', fontWeight: '600' }}>{StringConstants.REGISTER_NOW}</Text></Text>
                                </TouchableOpacity>
                            </View>} />
                    {/* <Toast ref="toast" position={position} /> */}
                </Content>
            </View>
        );
    }
}