import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native'
import styles from './styles';
import Header from '../../Common/Header';
import Toast, { DURATION } from 'react-native-easy-toast'
import Field from '../../Common/Field';
import Button from '../../Common/Button';
import GenderModal from '../../Modal/GenderModal';
import CountryModal from '../../Modal/CountryModal';
import StringConstants from '../../../constants/StringConstants';
import { Content } from 'native-base';
import FieldContainer from '../../Common/FieldContainer';
import GLOBAL from '../../../constants/ApiConstants';
import ImagePicker from 'react-native-image-crop-picker';
import Loading from '../../Common/Loader';
import Validator from 'validator';
import ImgToBase64 from 'react-native-image-base64';

const { width } = Dimensions.get('window');
// const selected = require('../resources/images/check_box.png')
// const unselected = require('../resources/images/check_box_blue.png')

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            genderList: ['Male', 'Female', 'Other'],
            countryList: [],
            fname: '',
            confirmPassword: '',
            profilePic: '',
            country: '',
            PhoneCode: '',
            isLoading: false,
            selectedImageBase64: '',
            lname: '',
            uploadedImage: ''
        }
    }

    componentDidMount() {
        this._getCountryList()
    }

    _getCountryList = () => {
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetCountries', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((responsedata) => responsedata.json()
        ).then((responsedata) => {
            console.log('responsedata.response country', JSON.stringify(responsedata));
            this.handleCountryResponse(responsedata.response)
        }).catch((error) => {
            console.log(error);
        });
    }

    handleCountryResponse(data) {
        this.setState({ countryList: data });
    }

    // _showToast = (message) => {
    //     this.refs.toast.show(message, DURATION.LENGTH_LONG)
    // }

    onChangedText = (id) => { this.setState({ id: id }) }

    onTapSignUp = () => {



        // var responseFromServer = 'dummy.png';
        if (this.state.password != this.state.confirmPassword) {
            alert('Passwords mismatch')
            return;
        };
        if (this.state.email == "" || this.state.email == null) {
            alert('email id required')
            return;

        }
        if (this.state.password == "" || this.state.password == null) {
            alert('password required')
            return;

        }
        if (this.state.confirmPassword == "" || this.state.confirmPassword == null) {
            alert('confirm password required')
            return;

        }
        // if (this.state.contact == "" || this.state.contact == null) {
        //     alert('Contact Number required ')
        //     return;

        // }
        if (this.state.fname == "" || this.state.fname == null) {
            alert('First Name required ')
            return;

        }
        if (this.state.lname == "" || this.state.lname == null) {
            alert('Last Name required ')
            return;

        } if (this.state.pickerGender == "" || this.state.pickerGender == null) {
            alert('Gender required ')
            return;
        }
        // if (this.state.country == "" || this.state.country == null) {
        //     alert('Country required ')
        //     return;
        // } 
        else if (this.state.email.trim() != '') {
            if (!Validator.isEmail(this.state.email)) {
                alert('Please enter valid email.');
                return;
            }
        }

        this.setState({ isLoading: true });
        // if (uploadedImage == '') {
        //     this.setState({ isLoading: false });

        //     console.log('nothing to display');
        //     Alert.alert('Profile Pic is Mandatory');
        //     return;

        // }
        // else {

        var regData = JSON.stringify({
            FirstName: this.state.fname,
            LastName: this.state.lname,
            EmailId: this.state.email,
            PWord: this.state.password,
            CurrentStatus: 'Draft',
            ProfileImage: this.state.uploadedImage != ''?this.state.uploadedImage:'dummy.png',
            CountryCode: this.state.PhoneCode,
            ContactNumber: this.state.contact,
            Gender: this.state.pickerGender,
            CountryId: this.state.pickerCountry
        });
        console.log('nothing to regData', regData);

        fetch(GLOBAL.BASE_URL + '/api/UserMgmtAPI/Register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: regData
        }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData', responseData);
                if (responseData.response.StatusCode == 0) {
                    this.setState({ isLoading: false });
                    //    if(responseData.response.Message == 'Emailid Not Available '){
                    //        alert('Email')
                    //    }
                    alert(responseData.response.Message)

                } else {
                    Alert.alert('Registration Successful ! An Activation Mail Sent.');
                    this.setState({ isLoading: false });
                    this.handleemail('');
                    this.handlefirstName('');
                    this.handlelastName('');
                    this.handlecontactNumber('');
                    this.handlephoneCode('');
                    this.handlePassword('');
                    this.handleConfPassword('');
                    this.props.navigation.navigate('LoginScreen');
                }
            }).catch((error) => console.log(error));
    }


    handleSelectedimage(image) {
        this.setState({ profilePic: image });
    }
    handlefirstName(text) {
        this.setState({ fname: text });
    }

    handlelastName(text) {
        this.setState({ lastName: text });
    }
    handlePassword(text) {
        this.setState({ password: text });
    }
    handleConfPassword(text) {
        this.setState({ confirmPassword: text });
    }
    handlecontactNumber(text) {
        this.setState({ contact: text });
    }
    handlephoneCode(text) {
        this.setState({ poneCode: text });
    }
    handleemail(text) {
        this.setState({ email: text });
    }
    handleGender(text) {
        this.setState({ pickerGender: text });
    }
    handleCountry(text) {
        this.setState({ pickerCountry: text });
        console.log('country selected ' + text);
    }


    browseClick = () => {
        console.log('imageData --->>>', JSON.stringify(this.state.profilePic))

        var buttons = [
            {
                text: 'Camera',
                onPress: () => {
                    this.setState({ loading: true }, function () {

                        setTimeout(() => {
                            ImagePicker.openCamera({
                                cropping: true,
                                width: 500,
                                height: 500,
                                includeBase64: true,

                            })
                                .then((response) => {
                                    // console.log("userImage _saveImageUri --> ", JSON.stringify(response))
                                    let source = { uri: response.path, imageName: response.mime }
                                    this.setState({ profilePic: response.path }, () => {
                                        ImgToBase64.getBase64String(this.state.profilePic)
                                            .then(base64String =>
                                                this.uploadProfilePic(response.path,base64String)

                                                // this.setState({ selectedImageBase64: base64String }, () => {
                                                //     this.uploadProfilePic(response.path.base64String)
                                                // })
                                            )
                                            .catch(err => console.log("err", err));
                                    })
                                })
                        }, 1000);
                    });
                }
            },
            {
                text: 'Choose from Library',
                onPress: () => {


                    setTimeout(() => {
                        ImagePicker.openPicker({
                            width: 500,
                            height: 500,
                            cropping: true,
                            base64: true,

                        }).then(response => {
                            console.log("_tapOnGallery ImagePicker image ", response);
                            let source = {
                                uri: response.path,
                                imageName: response.filename
                            }
                            this.setState({ profilePic: response.path }, () => {
                                ImgToBase64.getBase64String(this.state.profilePic)
                                    .then(base64String =>
                                        this.uploadProfilePic(response.path,base64String)

                                        // this.setState({ selectedImageBase64: base64String }, () => {
                                        //     this.uploadProfilePic(response.path.base64String)
                                        // })
                                    )
                                    .catch(err => console.log("err", err));
                            })
                        })

                    }, 1000);
                    // ImagePicker.launchImageLibrary(
                    //     {
                    //         mediaType: 'photo',
                    //         includeBase64: false,
                    //         maxHeight: 200,
                    //         maxWidth: 200,
                    //     },
                    //     (response) => {
                    //         let images = [...imageData];
                    //         let imagesName = [...this.state.imageName];
                    //         let source = { uri: response.uri, imageName: response.fileName }
                    //         let sourceName = { imageName: response.fileName }
                    //         images.push(source);
                    //         updateImageData(source)

                    //         // imagesName.push(sourceName);
                    //         // this.setState({
                    //         //     ImageSource: images.splice(0, 5), imageName: imagesName.splice(0, 5)
                    //         //     // ImageSource: images.slice(0,5), imageName: response
                    //         // }, function (this: HomeModal) {
                    //         //     console.log('picker --->>>', JSON.stringify(this.state.ImageSource))
                    //         //     console.log('imageName --->>>', JSON.stringify(this.state.imageName))

                    //         // });
                    //     },
                    // )

                }
            },
            {
                text: 'Cancel',
                onPress: () => {
                    // this._updateOrder('Complete');
                }
            },
        ];
        Alert.alert("Alert!", `Select option how you want to upload image.`, buttons, { cancelable: false });

    }

    uploadProfilePic = (profilePic, base64) => {
        this.setState({ isLoading: true });

        // let formData = new FormData();

        // formData.append('file', {
        //     name: `image1.JPG`,
        //     type: 'image/jpeg',
        //     uri: this.state.profilePic,
        // });
let b= {
    base64Image: base64,
                uri: profilePic,
}
console.log('b b b bb b', JSON.stringify(b));

        fetch(GLOBAL.BASE_URL + '/api/UploadMobile/UploadImage_expo_Profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                base64Image: base64,
                uri: profilePic,
            })
        }).then((responsedata) => responsedata.json()
        ).then((responsedata) => {
            console.log('responsedata upload', JSON.stringify(responsedata));
            if (responsedata.StatusCode == 1) {
                this.setState({ isLoading: false });
                this.setState({ uploadedImage: responsedata.genMessage })
            } else {
                console.log('responsedata else', JSON.stringify(responsedata));

            }
        }).catch((error) => {
            console.log(error);
        });
    }

    setCountryName = (item) => {
        this.setState({ country: item.CountryName, pickerCountry: item.Id, PhoneCode: item.PhoneCode }, () => {
        })
    }

    setGender = (item) => {
        this.setState({ pickerGender: item })
    }

    render() {
        const { genderList, countryList, profilePic } = this.state;
        console.log('profilePic', profilePic)
        return (
            <View style={{ flex: 1 }}>
                <Content>
                    <Header title={StringConstants.SIGNUP}
                        titleStyle={{ left: '20%' }}
                        isAuth={true}
                    />
                    <Loading loading={this.state.isLoading} loaderColor={'white'} />

                    {/* <View style={{flex:1,backgroundColor:'red'}}> */}
                    {/* <ImageBackground source={require('../../../resources/images/darkBg.png')} style={{height:200,width:'100%'}}>
                       <Field title={StringConstants.EMAIL} placeholder={'Type Here...'}
                                onChangeText={(text) => this.setState({ email: text })} />

                            <Field title={StringConstants.PASSWORD} placeholder={'Type Here...'}
                                onChangeText={(text) => this.setState({ password: text })} /> */}

                    {/* <TouchableOpacity style={styles.forgetContainer} onPress={() => alert('Under development')}>
                                <Text style={styles.forgetLabel}>{StringConstants.FORGOT_PASSWORD_LOGIN}</Text>
                            </TouchableOpacity> */}

                    {/* <Button
                                title={StringConstants.LOG_IN}
                                onPress={() =>this.props.navigation.navigate('ForgetPasswordScreen')}
                                customStyle={{ marginTop: width/15 }} />

                            <TouchableOpacity style={styles.policyContainer} onPress={() => alert('Under development')}>
                                <Text style={styles.policyLabel}>{StringConstants.PRIVACY_POLICY}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.accountContainer} onPress={() => alert('Under development')}>
                                <Text style={styles.accountLabel}>{StringConstants.DONT_HAVE_ACCOUNT}<Text style={{ color: '#F4A50C', fontWeight: '600' }}>{StringConstants.REGISTER_NOW}</Text></Text>
                            </TouchableOpacity> */}
                    {/* </ImageBackground> */}
                    {/* </View> */}
                    {/* <Content> */}
                    <FieldContainer
                        isReg={true}
                        children={
                            <View>
                                {/* <Image style={{ height: 80, width: 80, alignSelf: 'center' }} source={profilePic !=''?profilePic: require('../../../resources/images/user.png')} /> */}
                                {!profilePic ? <Image style={{ height: 80, width: 80, alignSelf: 'center' }} source={require('../../../resources/images/user.png')} /> :
                                    <Image style={{ height: 80, width: 80, alignSelf: 'center', borderRadius: 20 }} source={{ uri: profilePic }} />
                                }
                                <TouchableOpacity style={{ position: 'absolute', left: width / 1.88, width: 25, height: 25, top: 30 }} onPress={() => this.browseClick()}>
                                    <Image style={{ width: 35, height: 35, }} source={require('../../../resources/images/ic_add_pic.png')} />
                                </TouchableOpacity>
                                <Field title={StringConstants.FULL_NAME} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ fname: text })} />
                                <Field title={'Last Name'} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ lname: text })} />
                                <Field title={StringConstants.EMAIL} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    keyboardType={'email-address'} />

                                {/* <Field title={StringConstants.PASSWORD} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ password: text })} /> */}

                                <Field title={StringConstants.CONTACT_NO} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ contact: text })}
                                    keyboardType={'numeric'}
                                    maxLength={10} />

                                <Field title={StringConstants.PASSWORD} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ password: text })}
                                // keyboardType={'numeric'} 
                                />

                                <Field title={StringConstants.CONFIRM_PASSWORD} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                                // keyboardType={'numeric'}
                                />

                                {/* <Field title={StringConstants.SELECT_GENDER} placeholder={'Type Here...'}
                                    onChangeText={(text) => this.setState({ password: text })} /> */}
                                <Text style={{
                                    color: '#FFFFFF',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginTop: 10, marginStart: width / 12.5
                                }}>Select Gender</Text>
                                <GenderModal countryList={genderList}
                                    containerStyle={{
                                        backgroundColor: '#9C5EC6',
                                        height: width / 8.5,
                                        borderRadius: 8,
                                        marginTop: 10, alignSelf: 'center',

                                    }}
                                    showHeader={this.props.showHeader}
                                    onRef={ref => (this.parentReference = ref)}
                                    parentReference={this.setGender.bind(this)} />


                                <Text style={{
                                    color: '#FFFFFF',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginTop: 10, marginStart: width / 12.5
                                }}>Select Country</Text>


                                <CountryModal countryList={countryList}
                                    containerStyle={{
                                        backgroundColor: '#9C5EC6',
                                        height: width / 8.5,
                                        borderRadius: 8,
                                        marginTop: 10, alignSelf: 'center'
                                    }}
                                    onRef={ref => (this.parentReference = ref)}
                                    parentReference={this.setCountryName.bind(this)}
                                />

                                <Button
                                    title={StringConstants.SIGNUP}
                                    onPress={() => this.onTapSignUp()}
                                    customStyle={{ marginTop: width / 15 }} />

                                <TouchableOpacity style={styles.policyContainer} onPress={() => alert('Under development')}>
                                    <Text style={styles.policyLabel}>{StringConstants.PRIVACY_POLICY}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.accountContainer} onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                    <Text style={styles.accountLabel}>{StringConstants.HAVE_ACCOUNT}<Text style={{ color: '#F4A50C', fontWeight: '600' }}>{' Log In'}</Text></Text>
                                </TouchableOpacity>
                            </View>} />
                    {/* <Toast ref="toast" position={position} /> */}
                </Content >
            </View>
        );
    }
}