import React, { Component } from 'react'
import { Text, View, Dimensions, Image, Alert, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';

import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import moment from 'moment';
const { width } = Dimensions.get('window');
import ImagePicker from 'react-native-image-crop-picker';
import EventCategoryModal from '../../Modal/EventCategoryModal';
import EventScheduleModal from '../../Modal/EventScheduleModal';

import ImgToBase64 from 'react-native-image-base64';

export default class FriendScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
                { image: require('../../../resources/images/ic_friend_profile.png'), name: 'John Deo', numOfFriend: '3 mutual friends' },
            ],
            isFriendRequestList: true,
            isLoading: false,
            userDetails: '',
            title: '',
            desc: '',
            date: '',
            contact: '',
            email: '',
            org: '',
            location: '',
            selectedImage: '',
            typeList: ['Arts', 'Causes', 'Entertainment', 'Food', 'Children', 'Marriage'],
            categoryValue: '',
            scheduleValue: '',
            scheduleList: ['No Recurring', 'Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual',],
            attendValue: '',
            base64:'',
            eventCategoryData: [],
            categoryId:''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            // console.log('user_details component-->>', JSON.parse(user_details))
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    // this.getAllPastEventInfo();
                    // this.getAllFutureEventInfo();
                    this.getEventCategories();

                })
            }
        });
    }

    getEventCategories = () => {
        this.setState({ isLoading: true });

        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetEventCategoris',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: undefined
            }).then((response) => response.json())
            .then((respData) => {
                console.log('eventCategoryData respData-->>', JSON.stringify(respData))

                this.setState({ isLoading: false, eventCategoryData: respData.response }, () => {
                    // console.log('eventCategoryData-->>', JSON.stringify(this.state.eventCategoryData))

                });


            }).catch((error) => {
                console.log(error);
            });
    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }

    renderData = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 18 }}>
                <Image style={{ width: width / 5, height: width / 5 }} source={item.image} />
                <View style={{ marginStart: 25 }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: '#6C6C6C', fontSize: 12, marginTop: 4 }}>{item.numOfFriend}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                        <Button
                            title={StringConstants.BUTTON_CONFIRM}
                            onPress={() => alert('Under Development')}
                            customStyle={[styles.publishContainer, { width: width / 3.75, borderRadius: 10, height: 30, backgroundColor: '#530D89' }]}
                            titleStyle={{ fontSize: 12 }} />
                        <Button
                            title={StringConstants.BUTTON_DELETE}
                            onPress={() => alert('Under Development')}
                            customStyle={[styles.publishContainer, { backgroundColor: '#CEBFDA', marginStart: 10, width: width / 3.75, borderRadius: 10, height: 30, backgroundColor: '#CEBFDA' }]}
                            titleStyle={{ fontSize: 12, color: '#530D89' }} />
                    </View>
                </View>
            </View>
        )
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 18, }}>
                <Image style={{ width: width / 5, height: width / 5 }} source={item.image} />
                <View style={{ marginStart: 25, justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: '#6C6C6C', fontSize: 12, marginTop: 4 }}>{item.numOfFriend}</Text>
                </View>
                <Button
                    title={StringConstants.BUTTON_UNFRIEND}
                    onPress={() => alert('Under Development')}
                    customStyle={[styles.publishContainer, { width: width / 3.75, borderRadius: 10, height: width / 12.5, backgroundColor: '#530D89', marginStart: 25 }]}
                    titleStyle={{ fontSize: 12 }} />
            </View>
        )
    }

    onChangeTitle = (text) => {
        // let d = this.state.data;
        // d.AboutMe = text
        // this.setState({ data: text })
        this.setState({ title: text })

    }

    onChangeDescription = (text) => {
        // let d = this.state.data;
        // d.AboutMe = text
        // this.setState({ data: text })
        this.setState({ desc: text })

    }

    onChangeDate = (text) => {
        // let d = this.state.data;
        // d.AboutMe = text
        // this.setState({ data: text })
        this.setState({ date: text })

    }

    onChangeContact = (text) => {
        // let d = this.state.data;
        // d.AboutMe = text
        // this.setState({ data: text })
        this.setState({ contact: text })

    }
    onChangeEmail = (text) => {
        // let d = this.state.data;
        // d.AboutMe = text
        // this.setState({ data: text })
        this.setState({ email: text })

    }
    onChangeOrg = (text) => {
        // let d = this.state.data;
        // d.AboutMe = text
        // this.setState({ data: text })
        this.setState({ org: text })

    }
    onChangeLocation = (text) => {
        // let d = this.state.data;
        // d.AboutMe = text
        // this.setState({ data: text })
        this.setState({ location: text })

    }

    onPressCreate = () => {
        const { userDetails, title, desc, isFriendRequestList, email, location, date, categoryValue,
             scheduleValue,org,attendValue,base64,selectedImage ,categoryId} = this.state;
        // var date = new Date().getDate();
        if(title ==''){
            alert('Please enter event title')
            return
        }
        if(desc ==''){
            alert('Please enter event description')
            return
        }
        if(email ==''){
            alert('Please enter email')
            return
        }
        if(location ==''){
            alert('Please enter location')
            return
        } if(date ==''){
            alert('Please enter date')
            return
        } if(org ==''){
            alert('Please enter organised by')
            return
        }if(attendValue==''){
            alert('Please enter approx attended')
            return
        }if(org ==''){
            alert('Please enter organised by')
            return
        }
        let b = JSON.stringify
            ({
                EventId: 0,
                EventTitle: title,
                EventDescription: desc,
                EventDate: date,
                PostedBy: userDetails.Id,
                PostedOn: date,
                IsDeleted: false,
                CurrentStatus: "Active",
                ImageUrl: selectedImage,
                base64Image: base64,
                EmailId: email,
                OrganizedBy: org,
                EventLocation: location,
                RecurringType: scheduleValue,
                ApproxAttend: attendValue,
                EventCategory:categoryId,
                    // CategoryName: categoryValue,
                    // EventMasters: [
                    //     {}
                    // ]
                // }
            })

        console.log('body body body body-->>>', b);

        this.setState({ isLoading: true });
        fetch(GLOBAL.BASE_URL + 'api/CommonAPI/SaveEventNew',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: isFriendRequestList ? JSON.stringify
                    ({
                        EventId: 0,
                        EventTitle: title,
                        EventDescription: desc,
                        EventDate: date,
                        PostedBy: userDetails.Id,
                        PostedOn: date,
                        IsDeleted: false,
                        CurrentStatus: "Active",
                        ImageUrl: selectedImage,
                        base64Image: base64,
                        EmailId: email,
                        OrganizedBy: org,
                        EventLocation: location,
                        RecurringType: scheduleValue,
                        ApproxAttend: attendValue,
                        EventCategory:categoryId,
                    })
                    : JSON.stringify({
                        EventId: 0,
                        EventTitle: title,
                        EventDescription: desc,
                        EventDate: date,
                        PostedBy: userDetails.Id,
                        PostedOn: date,
                        IsDeleted: false,
                        CurrentStatus: "Active",
                        ImageUrl: selectedImage,
                        base64Image: base64,
                        EmailId: email,
                        OrganizedBy: org,
                        EventLocation: location,
                        RecurringType: scheduleValue,
                        ApproxAttend: attendValue,
                        EventCategory:categoryId,
                    })
            }).then((response) => response.json())
            .then((respData) => {
                this.setState({ isLoading: false, }, () => {
        console.log('body respData respData respData-->>>',respData);

                    alert(respData.Message)
                        this.props.route.params.goBack()
                        this.props.navigation.goBack();
                });
            }).catch((error) => {
                console.log(error);
            });
    }


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
                                        this.setState({base64:base64String})

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
                                        this.setState({base64:base64String})
                                        // this.onPressCreate(response.path, base64String)
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


    setCategory = (name,id) => {
        // console.log("setCategory ====>>>>>", item);

        this.setState({ categoryValue: name,categoryId:id })
    }

    setSchedule = (item) => {
        this.setState({ scheduleValue: item })
    }

    onChangeAttended = (text) => {
        this.setState({ attendValue: text })
    }

    render() {
        const { typeList, isFriendRequestList, scheduleList,eventCategoryData } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                {/* <Content> */}
                <ScrollView>
                    <TitleHeader
                        customHeaderStyle={{ width: width / 2.6, }}
                        title={true} title={'CREATE EVENT'} tapOnBack={() => this.props.navigation.goBack()} />
                    <View style={{ marginStart: 15, marginEnd: 15, }}>
                        <View style={styles.buttonOuterContainer}>
                            <Button
                                title={StringConstants.ONE_TIME_EVENT}
                                onPress={() => this.setState({ isFriendRequestList: true })}
                                customStyle={[styles.publishContainer, { backgroundColor: isFriendRequestList ? '#530D89' : '#CEBFDA' }]}
                                titleStyle={{ fontSize: 14, color: isFriendRequestList ? 'white' : '#530D89' }} />
                            {/* <Button
                                title={StringConstants.SCHEDULE_EVENT}
                                onPress={() => this.setState({ isFriendRequestList: false })}
                                customStyle={[styles.publishContainer, { backgroundColor: isFriendRequestList ? '#CEBFDA' : '#530D89', marginStart: 10 }]}
                                titleStyle={{ fontSize: 14, color: isFriendRequestList ? '#530D89' : 'white' }} /> */}
                        </View>

                        {isFriendRequestList ?
                            <View>
                                <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        onChangeText={(text) => this.onChangeTitle(text)}
                                        placeholder={"Event Title / Name"}
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
                                        placeholder={"Event Description"}
                                        onChangeText={(text) => this.onChangeDescription(text)}
                                        placeholderTextColor={'#707070'} />
                                </View>

                                <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"MM/DD/YY"}
                                        onChangeText={(text) => this.onChangeDate(text)}
                                        placeholderTextColor={'#707070'} />

                                </View>

                                <View style={[styles.inputContainer, { height: width / 7, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Contact Number"}
                                        placeholderTextColor={'#707070'}
                                        onChangeText={(text) => this.onChangeContact(text)}
                                    />

                                </View>

                                <View style={[styles.inputContainer, { height: width / 7, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Email ID"}
                                        placeholderTextColor={'#707070'}
                                        onChangeText={(text) => this.onChangeEmail(text)}
                                    />

                                </View>

                                <View style={[styles.inputContainer, { height: width / 7, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Organized By Name"}
                                        placeholderTextColor={'#707070'}
                                        onChangeText={(text) => this.onChangeOrg(text)}
                                    />

                                </View>

                                <View style={[styles.inputContainer, { height: width / 7, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Event Location"}
                                        placeholderTextColor={'#707070'}
                                        onChangeText={(text) => this.onChangeLocation(text)}
                                    />

                                </View>

                                <EventCategoryModal countryList={eventCategoryData}
                                    containerStyle={[styles.inputContainer, { height: width / 7.5, width: width / 1.09, marginTop: 15, alignItems: 'center' }]}
                                    showHeader={this.props.showHeader}
                                    onRef={ref => (this.parentReference = ref)}
                                    parentReference={this.setCategory.bind(this)}
                                />

                                <EventScheduleModal countryList={scheduleList}
                                    containerStyle={[styles.inputContainer, { height: width / 7.5, width: width / 1.09, marginTop: 15, alignItems: 'center' }]}
                                    showHeader={this.props.showHeader}
                                    onRef={ref => (this.parentReference = ref)}
                                    parentReference={this.setSchedule.bind(this)}
                                />

                                <View style={[styles.inputContainer, { height: width / 7, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Approx Attended"}
                                        placeholderTextColor={'#707070'}
                                        onChangeText={(text) => this.onChangeAttended(text)}
                                    />

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, alignItems: 'center', marginStart: 10 }}>
                                    <Text style={{ fontSize: 12, color: '#707070' }}>Upload Images</Text>
                                    <TouchableOpacity style={styles.fileContainer} onPress={() => this.onPressChooseFile()}>
                                        <Text style={{ fontSize: 12, color: '#707070' }}>Choose File</Text>
                                    </TouchableOpacity>


                                </View>
                                <Button
                                    title={'CREATE'}
                                    onPress={() => this.onPressCreate()}
                                    customStyle={styles.publishContainer}
                                    titleStyle={{ fontSize: 14 }} />
                            </View>
                            :
                            <View>
                                <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Event Title / Name"}
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
                                    shadowRadius: 2,
                                }}>
                                    <TextInput
                                        style={{ height: width / 2.8, width: 335, textAlignVertical: 'top' }}
                                        placeholder={"Event Description"}
                                        placeholderTextColor={'#707070'} />
                                </View>

                                <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"MM/DD/YY"}
                                        placeholderTextColor={'#707070'} />

                                </View>

                                <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Contact Number"}
                                        placeholderTextColor={'#707070'} />

                                </View>

                                <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Email ID"}
                                        placeholderTextColor={'#707070'} />

                                </View>

                                <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}
                                        placeholder={"Organized By Name"}
                                        placeholderTextColor={'#707070'} />

                                </View>

                                <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 15, alignItems: 'center' }]}>
                                    <TextInput
                                        style={{ height: width / 7.5, width: 330 }}

                                        placeholder={"Event Location"}
                                        placeholderTextColor={'#707070'} />

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <Text style={{ fontSize: 12, color: '#707070' }}>Upload Images / Videos</Text>
                                    <TouchableOpacity style={styles.fileContainer}>
                                        <Text style={{ fontSize: 12, color: '#707070' }}>Choose File</Text>
                                    </TouchableOpacity>



                                </View>

                                {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <Image source={require('../../../resources/images/ic_add_mp.png')} />
                                    <Text style={{ fontSize: 12, color: '#707070', marginStart: 10 }}>Add More Events</Text>
                                </TouchableOpacity> */}
                                <Button
                                    title={'CREATE'}
                                    // onPress={() => alert('Under Development')}
                                    onPress={() => this.onPressCreate()}
                                    customStyle={[styles.publishContainer, { marginBottom: 25 }]}
                                    titleStyle={{ fontSize: 14 }} />
                            </View>
                        }
                    </View>

                    {/* <Toast ref="toast" position={position} /> */}
                    {/* </Content> */}
                </ScrollView>
            </SafeAreaView>
        );
    }
}