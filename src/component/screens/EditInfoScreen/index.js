import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import ShadowField from '../../Common/ShadowField';
import TitleHeader from '../../Common/TitleHeader';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import styles from './styles';
import AppConstants from '../../../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../Common/Loader';
import GLOBAL from '../../../constants/ApiConstants';

const { width } = Dimensions.get('window');

export default class CreatePostScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            aboutMe: '',
            religion: '',
            lang: '',
            interst: '',
            volInt: '',
            link: '',
            age: '', edu: '',
            skill: '',
            location: '',
            church: '',
            userDetails: '',
            isLoading: false,
            data: {}

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
        console.log('urll-->>', GLOBAL.BASE_URL + `api/UserMgmtAPI/GetUserAbout?uId=${this.state.userDetails.Id}`)

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
                    this.offset = this.offset + 1;
                    let UserId = this.state.userDetails.Id
                    this.setState({ isLoading: false, data: respData.response, ...UserId, }, () => {
                        console.log('data-->>', JSON.stringify(this.state.data))
                    });
                }).catch((error) => {
                    console.log(error);
                });
        });
    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onPressSave = () => {
        const { aboutMe, religion, lang, interst, volInt, link, age, edu, skill, location, church, userDetails, data } = this.state;
        console.log('data data data data', data);

        if (data == {}) {
            if (aboutMe == "" || aboutMe == null) {
                alert('about me required')
                return;

            }
            else if (religion == "" || religion == null) {
                alert('religion required')
                return;

            }
            else if (lang == "" || lang == null) {
                alert('language required')
                return;

            }
            else if (interst == "" || interst == null) {
                alert('interest required ')
                return;

            }
            else if (volInt == "" || volInt == null) {
                alert('Volunteer Interest required ')
                return;

            }
            else if (link == "" || link == null) {
                alert('link required ')
                return;

            } else if (age == "" || age == null) {
                alert('age required ')
                return;
            } else if (edu == "" || edu == null) {
                alert('education required ')
                return;
            } else if (skill == "" || skill == null) {
                alert('skill required ')
                return;
            } else if (location == "" || location == null) {
                alert('location required ')
                return;
            } else if (church == "" || church == null) {
                alert('church required ')
                return;
            }
        } else {
            if (data.AboutMe == "" || data.AboutMe == null) {
                alert('about me required')
                return;

            }
            else if (data.Religion == "" || data.Religion == null) {
                alert('religion required')
                return;

            }
            else if (data.Language == "" || data.Language == null) {
                alert('language required')
                return;

            }
            else if (data.Intersts == "" || data.Intersts == null) {
                alert('interest required ')
                return;

            }
            else if (data.VolunteerIntersts == "" || data.VolunteerIntersts == null) {
                alert('Volunteer Interest required ')
                return;

            }
            else if (data.MyLinks == "" || data.MyLinks == null) {
                alert('link required ')
                return;

            } else if (data.AgeGroup == "" || data.AgeGroup == null) {
                alert('age required ')
                return;
            } else if (data.Education == "" || data.Education == null) {
                alert('education required ')
                return;
            } else if (data.Skills == "" || data.Skills == null) {
                alert('skill required ')
                return;
            } else if (data.Location == "" || data.Location == null) {
                alert('location required ')
                return;
            } else if (data.Church == "" || data.Church == null) {
                alert('church required ')
                return;
            }
        }
        this.setState({ isLoading: true });


        let params = data != '' ? JSON.stringify(data) : JSON.stringify({
            Id: userDetails.Id,
            UserId: userDetails.Id,
            AboutMe: aboutMe,
            Religion: religion,
            Church: church,
            AgeGroup: age,
            Education: edu,
            Location: location,
            Language: lang,
            Skills: skill,
            Intersts: interst,
            VolunteerIntersts: volInt,
            MyLinks: link
        })

        console.log('body body body body', params);

        // fetch('http://staging.godconnect.online/api/UserMgmtAPI/ManageUserAbout', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: data != '' ? data : JSON.stringify({
        //         Id: userDetails.Id,
        //         UserId: userDetails.Id,
        //         AboutMe: aboutMe,
        //         Religion: religion,
        //         Church: church,
        //         AgeGroup: age,
        //         Education: edu,
        //         Location: location,
        //         Language: lang,
        //         Skills: skill,
        //         Intersts: interst,
        //         VolunteerIntersts: volInt,
        //         MyLinks: link
        //     })
        // }).then((response) => response.json())
        //     .then((responseData) => {
        //         console.log('responseData about', responseData.response);
        //         if (responseData.response.StatusCode == 0) {
        //             this.setState({ isLoading: false });
        //             alert(responseData.response.Message);
        //         }
        //         else {
        //             this.setState({ isLoading: false });
        //             alert(responseData.response.Message);

        //             this.props.navigation.navigate("AboutMeScreen");
        //         }
        //     }).catch((error) => {
        //         console.log(error);
        //     });


        fetch(GLOBAL.BASE_URL + '/api/UserMgmtAPI/ManageUserAbout',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: params
            }).then((response) => response.json())
            .then((responseData) => {
                console.log('responseData about', responseData);
                if (responseData) {
                    this.setState({ isLoading: false });
                    alert(responseData.response.Message);
                }
                else {
                    this.setState({ isLoading: false });
                    alert(responseData.response.Message);
                    this.props.navigation.goBack();
                    // this.props.navigation.navigate("AboutMeScreen");
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    goBack = () => {
        // this.props.route.params.goBack()
        this.props.navigation.goBack();
    }

    onChangeAboutMe = (text) => {
        let d = this.state.data;
        d.AboutMe = text
        this.setState({ data: d })
    }


    onChangeReligion = (text) => {
        let d = this.state.data;
        d.Religion = text
        this.setState({ data: d }, () => {
            console.log('data data data data', JSON.stringify(this.state.data));

        })
    }

    onChangeSkill = (text) => {
        let d = this.state.data;
        d.Skills = text
        this.setState({ data: d })
    }

    onChangeAge = (text) => {
        let d = this.state.data;
        d.AgeGroup = text
        this.setState({ data: d })
    }

    onChangeEducation = (text) => {
        let d = this.state.data;
        d.Education = text
        this.setState({ data: d })
    }

    onChangeLocation = (text) => {
        let d = this.state.data;
        d.Location = text
        this.setState({ data: d })
    }

    onChangeLanguage = (text) => {
        let d = this.state.data;
        d.Language = text
        this.setState({ data: d })
    }

    onChangeChurch = (text) => {
        let d = this.state.data;
        d.Church = text
        this.setState({ data: d })
    }

    onChangeIntersts = (text) => {
        let d = this.state.data;
        d.Intersts = text
        this.setState({ data: d })
    }

    onChangeVolunteerIntersts = (text) => {
        let d = this.state.data;
        d.VolunteerIntersts = text
        this.setState({ data: d })
    }

    onChangeLink = (text) => {
        let d = this.state.data;
        d.MyLinks = text
        this.setState({ data: d })
    }

    render() {
        const { value, data } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <Loading loading={this.state.isLoading} loaderColor={'white'} />

                <Content>
                    <TitleHeader title={true} title={'EDIT INFORMATION'} tapOnBack={() => this.props.navigation.goBack()} />

                    <View style={{ marginStart: 15, marginEnd: 15 }}>
                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                onChangeText={(text) => this.onChangeAboutMe(text)}
                                placeholder={"About Me"}
                                placeholderTextColor={'#707070'}
                                value={data.AboutMe ? data.AboutMe : ''} />

                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                onChangeText={(text) => this.onChangeReligion(text)}
                                placeholder={"Religion"}
                                placeholderTextColor={'#707070'}
                                value={data.Religion ? data.Religion : ''} />

                        </View>


                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                onChangeText={(text) => this.onChangeSkill(text)}
                                placeholder={"Skills/Expertise"}
                                placeholderTextColor={'#707070'}
                                value={data.Skills ? data.Skills : ''} />

                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                // onChangeText={(text) => this.setState({ age: text })}
                                onChangeText={(text) => this.onChangeAge(text)}
                                placeholder={"Age Group"}
                                placeholderTextColor={'#707070'}
                                value={data.AgeGroup ? data.AgeGroup : ''} />

                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                // onChangeText={(text) => this.setState({ edu: text })}
                                onChangeText={(text) => this.onChangeEducation(text)}
                                placeholder={"Education"}
                                placeholderTextColor={'#707070'}
                                value={data.Education ? data.Education : ''} />

                        </View>


                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                // onChangeText={(text) => this.setState({ location: text })}
                                onChangeText={(text) => this.onChangeLocation(text)}
                                placeholder={"Location"}
                                placeholderTextColor={'#707070'}
                                value={data.Location ? data.Location : ''} />

                        </View>


                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                // onChangeText={(text) => this.setState({ lang: text })}
                                onChangeText={(text) => this.onChangeLanguage(text)}
                                placeholder={"Language"}
                                placeholderTextColor={'#707070'}
                                value={data.Language ? data.Language : ''} />

                        </View>


                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                // onChangeText={(text) => this.setState({ church: text })}
                                onChangeText={(text) => this.onChangeChurch(text)}
                                placeholder={"Church"}
                                placeholderTextColor={'#707070'}
                                value={data.Church ? data.Church : ''} />

                        </View>


                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                // onChangeText={(text) => this.setState({ interst: text })}
                                onChangeText={(text) => this.onChangeIntersts(text)}

                                placeholder={"Intersts"}
                                placeholderTextColor={'#707070'}
                                value={data.Intersts ? data.Intersts : ''} />

                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                // onChangeText={(text) => this.setState({ volInt: text })}
                                onChangeText={(text) => this.onChangeVolunteerIntersts(text)}
                                placeholder={"Volunteer Intersts"}
                                placeholderTextColor={'#707070'}
                                value={data.VolunteerIntersts ? data.VolunteerIntersts : ''} />

                        </View>
                        <View style={[styles.inputContainer, { height: width / 7.5, marginTop: 25, alignItems: 'center' }]}>
                            <TextInput
                                style={{ height: width / 7.5, width: 330, color: 'black' }}
                                // onChangeText={(text) => this.setState({ link: text })}
                                onChangeText={(text) => this.onChangeLink(text)}
                                placeholder={"Links to my art/music/books/etc/photos"}
                                placeholderTextColor={'#707070'}
                                value={data.MyLinks ? data.MyLinks : ''} />

                        </View>
                        <Button
                            title={StringConstants.SAVE}
                            onPress={() => this.onPressSave()}
                            customStyle={styles.publishContainer}
                            titleStyle={{ fontSize: 14 }} />
                    </View>
                </Content>
            </View>
        );
    }
}