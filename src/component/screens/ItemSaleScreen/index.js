import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import HeaderComponent from '../../Common/HeaderComponent';
import SingleItemModal from '../../Modal/SingleItemModal';
import Loading from '../../Common/Loader';

import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import ImagePicker from 'react-native-image-crop-picker';
import ItemCategoryModal from '../../Modal/ItemCategoryModal';
import ItemCondition from '../../Modal/ItemCondition';
import ImgToBase64 from 'react-native-image-base64';
import Validator from 'validator';

export default class CreatePostScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            price: '',
            userDetails: '',
            category: '',
            condition: '',
            description: '',
            sku: '', value: '',
            profilePic: '',
            itemList: ['item1', 'item2', 'item3', 'item4'],
            item: '',
            isLoading: false,
            categoryData: [],
            catId: '',
            city: '',
            country: '',
            state: '',
            email: '',
            number: '',
            person: '',


        }
    }

    componentDidMount() {

        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    // this.getMyAdds()
                    this.getCategories()
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
                        console.log('categoryData-->>', JSON.stringify(this.state.categoryData))
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
                                // includeBase64: true,

                            })
                                .then((response) => {
                                    console.log("userImage _saveImageUri --> ", JSON.stringify(response.path))
                                    let source = { uri: response.path, imageName: response.mime }
                                    this.setState({ profilePic: response.path }, () => {
                                        ImgToBase64.getBase64String(response.path)
                                            .then(base64String =>
                                                this.setState({ base64: base64String }, () => {
                                                    console.log("base64String base64String --> ", JSON.stringify(base64String))

                                                })

                                                // this.onPressCreate(response.path, base64String)
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
                            this.setState({ profilePic: response.path, selectedImageBase64: response.base64 }, () => {
                                console.log("_tapOnGallery profilePic ", this.state.profilePic);
                                ImgToBase64.getBase64String(response.path)
                                    .then(base64String =>
                                        this.setState({ base64: base64String })

                                        // this.onPressCreate(response.path, base64String)
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


    onPressNext = () => {
        const { userDetails } = this.state;

        if (this.state.title == '') {
            alert('Please enter title')
            return
        }
        if (this.state.desc == '') {
            alert('Please enter description')
            return
        }
        if (this.state.email == '') {
            alert('Please enter email')
            return
        }
        if (this.state.person == '') {
            alert('Please enter contact person')
            return
        } if (this.state.number == '') {
            alert('Please enter contact number')
            return
        } if (this.state.catId == '') {
            alert('Please select category')
            return
        } if (this.state.state == '') {
            alert('Please enter state')
            return
        } if (this.state.city == '') {
            alert('Please enter city')
            return
        } if (this.state.country == '') {
            alert('Please enter country')
            return
        } if (this.state.email != '') {
            if (!Validator.isEmail(this.state.email)) {
                alert('Please enter valid email.');
                return;
            }
        }
        let body = JSON.stringify({
            AdTitle: this.state.title,
            AdDescription: this.state.description,
            CategoryId: this.state.catId,
            PostedBy: userDetails.Id,
            ContactEmailId: this.state.email,
            ExpectedPrice: this.state.price,
            CityName: this.state.city,
            StateName: this.state.state,
            CountryName: this.state.country,
            ContactPerson: this.state.person,
            // base64Image:this.state.base64,
            ImageUrl: this.state.profilePic

        })
        console.log('body body body-->>', body)

        this.setState({ isLoading: true }, () => {
            fetch(GLOBAL.BASE_URL + 'api/MarektPlaceAPI/PostProduct',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        AdTitle: this.state.title,
                        AdDescription: this.state.description,
                        CategoryId: this.state.catId,
                        PostedBy: userDetails.Id,
                        ContactEmailId: this.state.email,
                        ExpectedPrice: this.state.price,
                        CityName: this.state.city,
                        StateName: this.state.state,
                        CountryName: this.state.country,
                        ContactPerson: this.state.person,
                        // base64Image:this.state.base64,
                        ImageUrl: this.state.profilePic
                    })
                }).then((response) => response.json())
                .then((respData) => {
                    this.setState({ isLoading: false, }, () => {
                        console.log('user_details respData respData-->>', respData)

                        alert(respData.response.Message)

                        setTimeout(() => {
                            this.props.navigation.goBack()
                        }, 3000);

                    });
                }).catch((error) => {
                    console.log(error);
                });
        });

    }

    // onPressNext = () => {
    //     this.offset = 1;

    //     const { userDetails } = this.state;
    //     let body = {
    //         pagenumber: this.offset,
    //         rowsperpage: this.state.rowsperpage,
    //         GroupId: this.state.GroupId,
    //         Id: userDetails.Id,
    //         UserId: userDetails.Id,
    //         Message: this.state.description,
    //         src: this.state.profilePic
    //     }
    //     console.log('onPressNext body-->>', JSON.stringify(body))

    //     this.setState({ isLoading: true }, () => {
    //         fetch(GLOBAL.BASE_URL + 'api/MarektPlaceAPI/GetMyAdds',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     pagenumber: this.offset,
    //                     rowsperpage: this.state.rowsperpage,
    //                     GroupId: this.state.GroupId,
    //                     Id: userDetails.Id,
    //                     UserId: userDetails.Id,
    //                     Message: this.state.type,
    //                     src: this.state.source
    //                 })
    //             }).then((response) => response.json())
    //             .then((respData) => {
    //                 this.offset = this.offset + 1;
    //                 this.setState({ isLoading: false, postData: [...this.state.postData, ...respData.response] }, () => {
    //                     console.log('postDta-->>', JSON.stringify(this.state.postData))
    //                 });
    //             }).catch((error) => {
    //                 console.log(error);
    //             });
    //     });

    // }

    setItem = (id, name) => { this.setState({ item: name, catId: id }) }

    render() {
        const { profilePic, userDetails, itemList, categoryData } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <Loading loading={this.state.isLoading} loaderColor={'white'} />
                <HeaderComponent
                        title={true}
                        title={'ITEM FOR SALE'}
                        tapOnBack={() => this.props.navigation.goBack()} />
                <Content>
                    <View style={{ marginStart: 15, marginEnd: 15,paddingTop:10 }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1,
                            marginTop: 8
                            , marginBottom: 24, alignItems: 'center'

                        }}>
                            <View>
                                <Image style={{ height: 32, width: 32 }} source={{ uri: userDetails.UserImage ? 'https://godconnect.online/UploadedImages/ProfileImages/' + userDetails.UserImage : 'https://godconnect.online/UploadedImages/ProfileImages/dummu.png' }} />
                            </View>
                            <View style={{ flex: 0.8, marginLeft: 10, justifyContent: 'center' }}>
                                <Text style={{
                                    color: '#707070',
                                    fontWeight: '600', lineHeight: 24,
                                    fontSize: 14
                                }}>{userDetails.Username}</Text>
                                <Text style={{ color: '#707070', fontSize: 12 }}>{userDetails.Email}</Text>
                            </View>

                        </View>
                        <TouchableOpacity style={[styles.inputContainer, {
                            justifyContent: 'center', alignItems: 'center',
                            flexDirection: 'column'
                        }]} onPress={() => this.browseClick()}>
                            {/* <TouchableOpacity onPress={() => this.browseClick()}> */}
                            {profilePic ?
                                <Image style={{
                                    height: width / 2.3,
                                    width: width / 1.09,
                                }} source={{ uri: profilePic }} /> :
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={require('../../../resources/images/ic_camera_purple.png')} />
                                    <Text style={{
                                        color: '#707070',
                                        fontSize: 12,
                                        paddingTop: 8,

                                    }}>Add Photo / Drag & Drop Here</Text>
                                </View>
                            }

                        </TouchableOpacity>
                        <View style={{
                            paddingTop: 8
                        }}>
                            {/* <Text style={{ color: '#707070', fontSize: 12 }}>Photos · 0 / 10 - You can add up to 10 photos.</Text> */}
                        </View>
                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ title: text })}
                                placeholder={"Title"}
                                placeholderTextColor={'#707070'} />

                        </View>
                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ price: text })}
                                placeholder={"Pricing"}
                                placeholderTextColor={'#707070'} />

                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ email: text })}
                                placeholder={"Email"}
                                placeholderTextColor={'#707070'} />

                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ number: text })}
                                placeholder={"Contact Number"}
                                placeholderTextColor={'#707070'} />
                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ person: text })}
                                placeholder={"Contact Person"}
                                placeholderTextColor={'#707070'} />
                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ state: text })}
                                placeholder={"State"}
                                placeholderTextColor={'#707070'} />
                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ country: text })}
                                placeholder={"Country"}
                                placeholderTextColor={'#707070'} />
                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ city: text })}
                                placeholder={"City"}
                                placeholderTextColor={'#707070'} />
                        </View>

                        {/* <View style={[styles.inputContainer, { height: width / 7.5, width: width / 1.09, marginTop: 15, alignItems: 'center' }]}>
                            {value ? <Text style={{ flex: 1 }}>{value}</Text> :
                                <Text style={[{
                                    color: '#707070', flex: 1,
                                    fontSize: 12
                                }]}>{'List of single item'}</Text>}
                            <Image source={require('../../../resources/images/ic_dropdown.png')} style={{ height: 7, width: 14 }} />
                        </View> */}

                        {/* <SingleItemModal countryList={itemList}
                            containerStyle={[styles.inputContainer, {
                                // backgroundColor: '#9C5EC6',
                                height: width / 7.5,
                                // borderRadius: 8,
                                marginTop: 25,
                                alignSelf: 'center'
                            }]}
                            showHeader={this.props.showHeader}
                            onRef={ref => (this.parentReference = ref)}
                            parentReference={this.setItem.bind(this)} /> */}


                        <ItemCategoryModal countryList={categoryData}
                            containerStyle={[styles.inputContainer, {
                                // backgroundColor: '#9C5EC6',
                                height: 45,
                                // borderRadius: 8,
                                marginTop: 25,
                                alignSelf: 'center'
                            }]}
                            showHeader={this.props.showHeader}
                            onRef={ref => (this.parentReference = ref)}
                            parentReference={this.setItem.bind(this)} />

                        {/* <ItemCondition countryList={itemList}
                            containerStyle={[styles.inputContainer, {
                                // backgroundColor: '#9C5EC6',
                                height: width / 7.5,
                                // borderRadius: 8,
                                marginTop: 25,
                                alignSelf: 'center'
                            }]}
                            showHeader={this.props.showHeader}
                            onRef={ref => (this.parentReference = ref)}
                            parentReference={this.setItem.bind(this)} /> */}
                        <View style={[styles.inputContainer, {
                            marginTop: 15,
                            paddingTop: 16
                        }]}>
                            <TextInput
                                style={{ height: width / 3, width: 330, textAlignVertical: 'top' }}
                                onChangeText={(text) => this.setState({ description: text })}
                                placeholder={"Description"}
                                placeholderTextColor={'#707070'}
                                multiline={true}
                                maxLength={120} />

                        </View>
                        {/* <View style={[styles.inputContainer, {
                            height: width / 7.5,
                            marginTop: 25, alignItems: 'center'
                        }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330 }}
                                onChangeText={(text) => this.setState({ sku: text })}
                                placeholder={"SKU"}
                                placeholderTextColor={'#707070'} />

                        </View> */}
                        <Button
                            title={'NEXT'}
                            onPress={() => this.onPressNext()}
                            customStyle={[styles.publishContainer, { marginBottom: 10 }]}
                            titleStyle={{ fontSize: 14 }} />
                    </View>

                </Content>
            </View>
        );
    }
}