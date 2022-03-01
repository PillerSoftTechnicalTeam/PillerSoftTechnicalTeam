import React, { Component } from 'react';
import { BackHandler, ImageBackground, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
const { width } = Dimensions.get('window');
import AppConstants from '../../../constants/AppConstants';

export default class SplashScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            position: 'bottom',
            style: {},
        }
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.checkProfileCompleted()
        // setTimeout(() => {
        //     this.props.navigation.navigate('LoginScreen')
        // }, 200)
        //     AsyncStorage.getItem(DatabaseKey.isUserLogin).then((value) => {
        //         console.log("value", value)
        //         this.checkProfileCompleted()

        //     }).done();
        // }, 3000);
        this.splashTimeout();

        BackHandler.addEventListener('hardwareBackPress removeEventListener', this.handleBackButton);

    }

    splashTimeout = () => {
        setTimeout(() => {
            this._checkLogin()
            // this.props.navigation.navigate('LoginScreen')
        }, 3000);
    }

    _checkLogin = () => {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))

            if (user_details) {
        this.props.navigation.navigate('HomeScreen');

            } else {
        this.props.navigation.navigate('LoginScreen');
            }
        });
    }

    moveToScreensAccordingly(value) {
        this.props.navigation.navigate(value);
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress removeEventListener', this.handleBackButton);
    }

    moveToScreensAccordingly = (value) => {
        if (value == null || value == "false") {
            this.props.navigation.navigate("SignIn")
        } else if (value == "true") {
            this.checkProfileCompleted()
        }
    }

    checkProfileCompleted() {
        this.props.navigation.navigate("Home");

        // AsyncStorage.getItem(DatabaseKey.isProfileCompleted).then((value) => {
        //     console.log(value);
        //     if (value == null || value == "false") {
        //         this.props.navigation.navigate("Profile");
        //     } else if (value == "true") {
        //         this.props.navigation.navigate("Home");
        //     }
        // }).done();
    }


    handleBackButton() { return true }

    render() {
        return (
            <ImageBackground style={styles.splashImg} source={require('../../../resources/images/splash_bg.png')}>
            </ImageBackground>
        );
    }
}