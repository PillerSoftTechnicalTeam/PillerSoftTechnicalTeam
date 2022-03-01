import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import styles from './styles';
import Header from '../../Common/Header';
import Toast, { DURATION } from 'react-native-easy-toast'
import Field from '../../Common/Field';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import { Content } from 'native-base';
import FieldContainer from '../../Common/FieldContainer';
import GLOBAL from '../../../constants/ApiConstants';
import Validator from 'validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../../../constants/AppConstants';

const { width } = Dimensions.get('window');
// const selected = require('../resources/images/check_box.png')
// const unselected = require('../resources/images/check_box_blue.png')
import Loading from '../../Common/Loader';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isLoading:false
        }
    }

    componentDidMount() {

    }

    // _showToast = (message) => {
    //     this.refs.toast.show(message, DURATION.LENGTH_LONG)
    // }

    onChangedText = (id) => { this.setState({ id: id }) }

    tapOnLogin = () => {
        const {email,password } = this.state
        if (email.trim() == '') {
            alert('Please enter Email');
            return;
        } else if (password.trim() == '') {
            alert('Please enter password');
            return;
        } else if (email.trim() != '') {
            if (!Validator.isEmail(email)) {
                alert('Please enter valid email.');
                return;
            }
        }
        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/UserMgmtAPI/LoginCheck', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailId: this.state.email,
                pword: this.state.password,
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
                    AsyncStorage.setItem(AppConstants.USER_DETAILS, JSON.stringify(responseData.response));
                    this.props.navigation.navigate("HomeScreen");

                }
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { } = this.state;

        return (
            // <SafeAreaView>
            <Content>

                <Header title={StringConstants.LOGIN}
                    titleStyle={{ left: '20%' }}
                    isAuth={true}
                />
                    <Loading loading={this.state.isLoading} loaderColor={'white'} />

                <FieldContainer
                    children={
                        <View style={{ marginTop: width / 6.35, marginBottom: 100 }}>
                            <Field title={StringConstants.EMAIL} placeholder={'Type Here...'}
                                onChangeText={(text) => this.setState({ email: text })} />

                            <Field title={StringConstants.PASSWORD} placeholder={'Type Here...'}
                                onChangeText={(text) => this.setState({ password: text })} />

                            <TouchableOpacity style={styles.forgetContainer} onPress={() => this.props.navigation.navigate('ForgetPasswordScreen')}>
                                <Text style={styles.forgetLabel}>{StringConstants.FORGOT_PASSWORD_LOGIN}</Text>
                            </TouchableOpacity>

                            <Button
                                title={StringConstants.LOG_IN}
                                onPress={() => this.tapOnLogin()}
                                customStyle={{ marginTop: width / 15 }} />

                            <TouchableOpacity style={styles.policyContainer} onPress={() => alert('Under development')}>
                                <Text style={styles.policyLabel}>{StringConstants.PRIVACY_POLICY}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.accountContainer} onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                                <Text style={styles.accountLabel}>{StringConstants.DONT_HAVE_ACCOUNT}<Text style={{ color: '#F4A50C', fontWeight: '600' }}>{StringConstants.REGISTER_NOW}</Text></Text>
                            </TouchableOpacity>
                        </View>} />
            </Content>
            // {/* <Toast ref="toast" position={position} /> */}
            // </SafeAreaView>
        );
    }
}