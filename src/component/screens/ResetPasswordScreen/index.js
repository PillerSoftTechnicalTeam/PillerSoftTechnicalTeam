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
import GLOBAL from '../../../constants/ApiConstants';

const { width } = Dimensions.get('window');

export default class ResetPasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            code: '',
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

        const { code, password } = this.state
        if (code.trim() == '') {
            alert('Please enter Activation Code');
            return;
        } else if (password.trim() == '') {
            alert('Please enter Password.');
            return;
        }
        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/ChangPassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: this.state.code,
                pword: this.state.password,
                confpword: this.state.password,
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
                    this.props.navigation.navigate("LoginScreen");

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
                    <Header title={StringConstants.RESET_PASSWORD}
                        headerStyle={{ width: width / 1.18, }}
                        titleStyle={{ left: '5%' }}
                        isAuth={true} />
                    <Loading loading={this.state.isLoading} loaderColor={'white'} />

                    <FieldContainer
                        children={
                            <View style={{ marginTop: width / 5.35, marginBottom: 180 }}>
                                <Field title={StringConstants.ACTIVATION_CODE} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ code: text })} />
                                <Field title={StringConstants.PASSWORD} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ password: text })} />
                                <Button
                                    title={StringConstants.UPDATE}
                                    onPress={() => this.tapOnLogin()}
                                    customStyle={{ marginTop: 35 }} />

                                {/* <TouchableOpacity style={styles.accountContainer} onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                    <Text style={styles.accountLabel}>{StringConstants.HAVE_ACCOUNT}<Text style={{ color: '#F4A50C', fontWeight: '600' }}>{' Log In'}</Text></Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.accountContainer} onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                                    <Text style={styles.accountLabel}>{StringConstants.DONT_HAVE_ACCOUNT}<Text style={{ color: '#F4A50C', fontWeight: '600' }}>{StringConstants.REGISTER_NOW}</Text></Text>
                                </TouchableOpacity> */}
                            </View>} />
                    {/* <Toast ref="toast" position={position} /> */}
                </Content>
            </View>
        );
    }
}