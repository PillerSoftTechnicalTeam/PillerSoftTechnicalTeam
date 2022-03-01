import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import Loading from '../../Common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import PrivacyModal from '../../Modal/PrivacyModal';
import InviteGroupModal from '../../Modal/InviteGroupModal';


export default class CreatePostScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            password: '',
            userDetails: '',
            isLoading: false,
            groupName: '',
            selectedImage: '',
            desc: '',
            typeList: ['Public', 'Private', 'Friends'],
            privacyValue: '',
            base64: '',
            showInviteModal: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                this.setState({ userDetails: JSON.parse(user_details) })
            }
        });

    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onPressCreate = () => {
        const { userDetails, groupName, desc, base64, selectedImage } = this.state;
        var date = new Date().getDate();
        let s = {
            Id: userDetails.Id,
            pagenumber: 0,
            rowsperpage: 99999,
            GroupName: groupName,
            GroupDescription: desc,
            CreatedOn: date,
            GroupOwner: userDetails.Id,
            GroupType: "Public",
            CurrentStatus: "Active",
            IsDeleted: false,
            GroupImage: selectedImage,
            base64Image: base64
        }
        console.log('respData s s-->>', JSON.stringify(s))

        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/SaveGroupNew',
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
                    GroupName: groupName,
                    GroupDescription: desc,
                    CreatedOn: date,
                    GroupOwner: userDetails.Id,
                    GroupType: "Public",
                    CurrentStatus: "Active",
                    IsDeleted: false,
                    GroupImage: selectedImage,
                    base64Image: base64
                })
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false, groupName: '', desc: '' })
                console.log('respData create grop-->>', JSON.stringify(respData))
                alert(respData.Message)
                this.props.navigation.goBack()

                // this.setState({ isLoading: false, serverDataMyGroups: respData.response }, () => {
                //     console.log('serverDataMyGroups-->>', JSON.stringify(this.state.serverDataMyGroups))

                // });


            }).catch((error) => {
                console.log(error);
            });
    }

    onChangeGroupName = (text) => { this.setState({ groupName: text }) }
    onChangeDescription = (text) => { this.setState({ desc: text }) }



    onPressChooseFile = (type) => {
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
                                    console.log("userImage _saveImageUri --> ", JSON.stringify(response))
                                    let source = { uri: response.path, imageName: response.mime }
                                    this.setState({ selectedImage: response.path, selectedImageBase64: response.base64, postType: 'Image' }, () => {
                                        ImgToBase64.getBase64String(this.state.selectedImage)
                                            .then(base64String =>
                                                // this.onPressCreate(response.path, base64String)
                                                this.setState({ base64: base64String })
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
                            includeBase64: true,

                        }).then(response => {
                            console.log("_tapOnGallery ImagePicker image ", response);
                            let source = {
                                uri: response.path,
                                imageName: response.filename
                            }
                            this.setState({ selectedImage: response.path, selectedImageBase64: response.base64, postType: 'Image' }, () => {
                                ImgToBase64.getBase64String(this.state.selectedImage)
                                    .then(base64String =>
                                        // this.onPressCreate(response.path, base64String)
                                        this.setState({ base64: base64String })

                                    )
                                    .catch(err => console.log("err", err));
                            })
                        })

                    }, 1000);
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

    setType = (item) => {
        this.setState({ privacyValue: item })
    }


    render() {
        const { value, userDetails, typeList, showInviteModal } = this.state;
        let userName = userDetails.FirstName + userDetails.LastName
        return (
            <View style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <Loading loading={this.state.isLoading} loaderColor={'white'} />

                <Content>
                    <TitleHeader title={true} title={'CREATE GROUP'} tapOnBack={() => this.props.navigation.goBack()} />

                    {
                        showInviteModal &&
                        <InviteGroupModal
                            showModal={showInviteModal}
                            userDetails={userDetails}
                            dismissModalCallback={() => this.setState({ showInviteModal: false })} />
                    }
                    <View style={{ marginStart: 15, marginEnd: 15, }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1,
                            marginTop: 8
                            , marginBottom: 24

                        }}>
                            <View>
                                <Image source={{ uri: userDetails.UserImage ? 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + userDetails.UserImage : 'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png' }} />
                            </View>
                            <View style={{ flex: 0.8, marginLeft: 16, justifyContent: 'center' }}>
                                <Text style={{
                                    color: '#707070',
                                    fontWeight: '600', lineHeight: 24,
                                    fontSize: 14
                                }}>{userDetails.Username}</Text>
                                <Text style={{ color: '#707070', fontSize: 12 }}>{userDetails.Email}</Text>
                            </View>

                        </View>


                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 8, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.onChangeGroupName(text)}
                                placeholder={"Group Name"}
                                placeholderTextColor={'#707070'} />

                        </View>


                        <View style={{
                            height: width / 2.3, marginTop: 15,
                            width: width / 1.09,
                            borderRadius: 15,
                            padding: 12,
                            // alignItems: 'flex-start',
                            elevation: 5, shadowColor: '#000',
                            shadowOffset: { width: 1, height: 1 },
                            backgroundColor: 'white',
                            shadowOpacity: 0.2,
                            shadowRadius: 2, justifyContent: 'center'
                        }}>
                            <TextInput
                                style={{ height: width / 2.8, width: 335, textAlignVertical: 'top' }}
                                placeholder={"Group Description"}
                                onChangeText={(text) => this.onChangeDescription(text)}
                                placeholderTextColor={'#707070'} />
                        </View>

                        {/* <View style={[styles.inputContainer, { height: width / 7.5, width: width / 1.09, marginTop: 15, alignItems: 'center' }]}>
                            {value ? <Text style={{ flex: 1 }}>{value}</Text> :
                                <Text style={[{
                                    color: '#707070', flex: 1,
                                    fontSize: 12
                                }]}>{'Choose Privacy'}</Text>}
                            <Image source={require('../../../resources/images/ic_dropdown.png')} style={{ height: 7, width: 14 }} />
                        </View> */}


                        <PrivacyModal countryList={typeList}
                            containerStyle={[styles.inputContainer, { height: width / 7.5, width: width / 1.09, marginTop: 15, alignItems: 'center' }]}
                            showHeader={this.props.showHeader}
                            onRef={ref => (this.parentReference = ref)}
                            parentReference={this.setType.bind(this)}
                        />

                        <TouchableOpacity style={[styles.inputContainer, {
                            height: width / 7.5,
                            marginTop: 25, alignItems: 'center'
                        }]} onPress={() => this.setState({ showInviteModal: true })}>
                            {/* <TextInput
                                style={{ height: width / 7.5, width: 330 }}

                                placeholder={"Invite Friends (Optional)"}
                                placeholderTextColor={'#707070'} /> */}
                            <Text style={{fontSize:14}}>{'Invite Friends (Optional)'}</Text>
                        </TouchableOpacity>


                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, alignItems: 'center', marginStart: 10 }}>
                            <Text style={{ fontSize: 12, color: '#707070' }}>Upload Images</Text>
                            <TouchableOpacity style={styles.fileContainer} onPress={() => this.onPressChooseFile()}>
                                <Text style={{ fontSize: 12, color: '#707070' }}>Choose File</Text>
                            </TouchableOpacity>


                        </View>


                        {/* <Text style={{ color: '#530D89', fontWeight: 'bold', fontSize: 12, marginTop: 10, marginStart: 3 }}>Suggested:<Text style={{ color: '#530D89', fontWeight: '300', fontSize: 12, marginTop: 10, marginStart: 3 }}> John Doe, Vikrant Shinde, Prachi Patil</Text></Text> */}
                        <Button
                            title={'CREATE'}
                            onPress={() => this.onPressCreate()}
                            customStyle={styles.publishContainer}
                            titleStyle={{ fontSize: 14 }} />
                    </View>

                </Content>
            </View>
        );
    }
}