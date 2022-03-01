import React, { PureComponent } from 'react';
import {
    Modal, FlatList, Keyboard,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image, TextInput
} from 'react-native';
const { width } = Dimensions.get('window');
import Button from '../Common/Button';
import { Content } from 'native-base';
import GLOBAL from '../../constants/ApiConstants';
import Validator from 'validator';

export default class PrayerModal extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            prayer: '',
            name: '',
            email: '',

        }
    }

    onChangePrayer = (text) => { this.setState({ prayer: text }) }

    onChangeName = (text) => { this.setState({ name: text }) }

    onChangeEmail = (text) => { this.setState({ email: text }) }


    onSubmitPrayer = (prayer, name, email, userDetails) => {
        console.log('prayer onSubmitPrayer-->>>', JSON.stringify(prayer))

        console.log('name onSubmitPrayer-->>>', JSON.stringify(name))
        console.log('email onSubmitPrayer-->>>', JSON.stringify(email))

        if (prayer == undefined) {
            alert('Please enter prayer description')
            return
        } else if (name == undefined) {
            alert('Please enter name')
            return

        } else if (email == undefined) {
            alert('Please enter email')
            return
        } else if (email.trim() != undefined) {
            if (!Validator.isEmail(email)) {
                alert('Please enter valid email.');
                return;
            }
        }
        // this.setState({ isLoading: true })

        fetch(GLOBAL.BASE_URL + `api/CommonAPI/SavePrayer?prayer=${prayer}&name=${name}&email=${email}&userid=${userDetails.Id}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: undefined
            }).then((response) => response.json())
            .then((respData) => {
                if (respData) {
                    console.log('respData set prayer-->>>', JSON.stringify(respData))
                    alert(respData.Message)

                    this.setState({ prayer: '', name: '', email: '' }, () =>
                        setTimeout(() => {
                            this.props.dismissModalCallback()
                        }, 1000)
                    );

                }
            }).catch(error => {
                setTimeout(() => {
                    // Alert.alert("Alert!", `Error : ${error}`);
                }, 100);
            });
    }

    render() {
        const { visible, dismissModalCallback, customStyle, userDetails } = this.props;
        const { prayer, name, email } = this.state;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={visible}
                onRequestClose={() => { console.log('close modal') }}>
                <Content style={{ flex: 1, backgroundColor: '#00000080', }} activeOpacity={1}
                    onPress={() => Keyboard.dismiss()}>
                    <View style={[{ backgroundColor: 'white', width: 399, alignItems: 'center', alignSelf: 'center', padding: 8, borderRadius: 18 }, customStyle]} >
                        <TouchableOpacity style={{ height: 25, marginTop: 10, flexDirection: 'row', alignSelf: 'flex-end', marginEnd: 10 }}
                            onPress={() => dismissModalCallback()}>
                            <Image style={{ height: 20, width: 20, marginStart: 13 }} source={require('../../resources/images/ic_close.png')} />
                        </TouchableOpacity>

                        <View style={{
                            height: width / 2.3, marginTop: 15,
                            width: width / 1.2,
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
                                style={{ height: width / 2.8, textAlignVertical: 'top' }}
                                placeholder={"Your Prayer"}
                                placeholderTextColor={'#707070'}
                                multiline={true}
                                maxLength={100}
                                onChangeText={(text) => this.onChangePrayer(text)} />
                        </View>

                        <View style={{
                            height: width / 7.5, marginTop: 15,
                            width: width / 1.2,
                            borderRadius: 15,
                            padding: 12,
                            justifyContent: 'center',
                            elevation: 5, shadowColor: '#000',
                            shadowOffset: { width: 1, height: 1 },
                            backgroundColor: 'white',
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                        }}>
                            <TextInput style={{ height: width / 8.8 }}
                                placeholder={"Your Name"}
                                placeholderTextColor={'#707070'}
                                onChangeText={(text) => this.onChangeName(text)} />

                        </View>

                        <View style={{
                            height: width / 7.5, marginTop: 15,
                            width: width / 1.2,
                            borderRadius: 15,
                            padding: 12,
                            // alignItems: 'flex-start',
                            elevation: 5, shadowColor: '#000',
                            shadowOffset: { width: 1, height: 1 },
                            backgroundColor: 'white',
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            justifyContent: 'center',

                        }}>
                            <TextInput style={{ height: width / 8.8 }}
                                placeholder={"Your Email"}
                                placeholderTextColor={'#707070'}
                                onChangeText={(text) => this.onChangeEmail(text)} />

                        </View>


                        <Button
                            title={'SUBMIT'}
                            onPress={() => this.onSubmitPrayer(prayer, name, email, userDetails)}
                            customStyle={{
                                backgroundColor: '#530D89',
                                width: width / 2.04,
                                height: width / 9.3,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                                borderColor: '#530D89',
                                borderWidth: 0.2,
                                alignSelf: 'center',
                                marginTop: 30, marginBottom: 18
                            }}
                            titleStyle={{ fontSize: 14 }} />

                    </View>
                </Content>
            </Modal >
        );
    }


}