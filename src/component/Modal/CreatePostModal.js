import React, { PureComponent } from 'react';
import {
    Modal, Alert, Keyboard,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image, TextInput, StyleSheet
} from 'react-native';
const { width } = Dimensions.get('window');
import Button from '../Common/Button';
import TitleHeader from '../Common/TitleHeader';
import TypeModal from '../Modal/TypeModal';
import ImagePicker from 'react-native-image-crop-picker';
// import * as ImagePicker from 'expo-image-picker';

export default class CreatePostModal extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            typeList: ['Public', 'Private', 'Friends'],
            type: '',
            post: '',
            selectedImage: '',
            selectedImageType: '',
            postType:'',
            selectedVideo:''
        }
    }

    setType = (item) => {
        this.setState({ type: item })
    }


    onChangePost = (text) => {
        this.setState({ post: text })
    }


    // onPressChooseFile = async () => {
    //     let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    //     if (permissionResult.granted === false) {
    //         alert("Permission to access camera roll is required!");
    //         return;
    //     }

    //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     });

    //     if (pickerResult.cancelled === true) {
    //         return;
    //     }
    //     try
    //     {
    //         this.setState({ selectedFile: pickerResult.uri });
    //         console.log(this.state.selectedFile);
    //         this.setState({ selectedImageType: pickerResult.type });
    //     }catch(e)
    //     {
    //         this.setState({ selectedFile:null });
    //     }

    //     //console.log(this.state.selectedImage);
    //     // console.log(this.state.selectedImageBase64);


    //     //setSelectedImage({ localUri: pickerResult.uri });
    // }


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
                                    this.setState({ selectedImage: response.path, selectedImageBase64: response.base64,postType:'Image' })
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
                            this.setState({ selectedImage: response.path, selectedImageBase64: response.base64,postType:'Image' }, () => {
                                console.log("_tapOnGallery selectedFile ", this.state.selectedImage);

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

    onPressChooseVideo = async (type) => {
        var buttons = [
            {
                text: 'Camera',
                onPress: () => {
                    this.setState({ loading: true }, function () {

                        setTimeout(() => {
                            ImagePicker.openCamera({
                                // cropping: true,
                                // width: 500,
                                // height: 500,
                                mediaType: "video",
                                includeBase64: true
                            })
                                .then((response) => {
                                    console.log("userImage _saveImageUri --> ", JSON.stringify(response))
                                    let source = { uri: response.path, imageName: response.mime }
                                    this.setState({ selectedVideo: response.path, selectedImageBase64: response.base64,postType:type })
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
                            // width: 500,
                            // height: 500,
                            // cropping: true,
                            includeBase64: true,
                            mediaType: "video",

                        }).then(response => {
                            console.log("_tapOnGallery ImagePicker video ", response);
                            let source = {
                                uri: response.path,
                                imageName: response.filename
                            }
                            this.setState({ selectedVideo: response.path, selectedImageBase64: response.base64 ,postType:type}, () => {
                                console.log("_tapOnGallery selectedVideo ", this.state.selectedVideo);

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
        Alert.alert("Alert!", `Select option how you want to upload Video.`, buttons, { cancelable: false });
    }

    render() {
        const { visible, dismissModalCallback, customStyle, value } = this.props;
        const { typeList, post, type,postType, selectedImage,selectedVideo } = this.state;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={visible}
                onRequestClose={() => { console.log('close modal') }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#00000080', }} activeOpacity={1}
                    onPress={() => Keyboard.dismiss()}>
                    <View style={[{ backgroundColor: 'white', width: '100%', flex: 1 }, customStyle]} >
                        <TitleHeader title={true} title={'CREATE NEW POST'} tapOnBack={() => dismissModalCallback()} />
                        <View style={{ marginStart: 15, marginEnd: 15, }}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={{ color: 'black' }}
                                    placeholder={"What's in your Mind?"}
                                    placeholderTextColor={'#707070'}
                                    multiline={true}
                                    maxLength={120}
                                    onChangeText={(text) => this.onChangePost(text)}
                                />
                                <Image source={require('../../resources/images/ic_emoji.png')} style={styles.emoji} />
                            </View>

                            {/* <View style={[styles.inputContainer, { height: width / 7.5, width: width / 1.09, marginTop: 15, alignItems: 'center' }]}>
                            {value ? <Text style={{ flex: 1 }}>{value}</Text> :
                                <Text style={[{ flex: 1 }]}>{'Type'}</Text>}
                            <Image source={require('../../resources/images/ic_dropdown.png')} style={{ height: 7, width: 14 }} />
                        </View> */}

                            <TypeModal countryList={typeList}
                                containerStyle={[styles.inputContainer, { height: width / 7.5, width: width / 1.09, marginTop: 15, alignItems: 'center' }]}
                                showHeader={this.props.showHeader}
                                onRef={ref => (this.parentReference = ref)}
                                parentReference={this.setType.bind(this)}
                            />


                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                                <TouchableOpacity style={[styles.fileContainer, { marginStart: 0 }]} onPress={() => this.onPressChooseFile('Image')}>
                                    <Text style={{ fontSize: 12, color: '#707070' }}>Upload Images</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.fileContainer} onPress={() => this.onPressChooseVideo('Video')}>
                                    <Text style={{ fontSize: 12, color: '#707070' }}>Upload Video</Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                title={StringConstants.PUBLISH}
                                // onPress={() => alert('Under Development')}
                                onPress={() => this.props.parentReference(post, type, selectedImage,postType,selectedVideo)}
                                customStyle={styles.publishContainer}
                                titleStyle={{ fontSize: 14 }} />
                        </View>

                    </View>
                </TouchableOpacity>
            </Modal >
        );
    }


}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 632,
        justifyContent: 'center',
    },
    inputContainer: {
        height: width / 2.3,
        width: width / 1.09,
        borderRadius: 15,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    emoji: {
        height: 16,
        width: 16,
        position: 'absolute',
        end: 20,
        top: 20
    },
    fileContainer: {
        marginStart: 20,
        backgroundColor: '#CEBFDA',
        width: width / 3,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#530D89',
        borderWidth: 0.2
    },
    publishContainer: {
        backgroundColor: '#530D89',
        width: width / 2.04,
        height: width / 9.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#530D89',
        borderWidth: 0.2,
        alignSelf: 'center',
        marginTop: 30
    }
});