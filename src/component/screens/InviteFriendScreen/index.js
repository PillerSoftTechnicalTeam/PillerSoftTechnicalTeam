import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, Platform, SafeAreaView } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import Validator from 'validator';
import Loading from '../../Common/Loader';
import CountryCodeModal from '../../Modal/CountryCodeModal';

const { width } = Dimensions.get('window');
export default class InviteFriendScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userDetails: '',
			email: '',
			isLoading: false,
			e: '',
			phone: '',
			countryData: [],
			isSendByEmail: true,
			isSendBySMS: false,
			code: ''
		};
	}

	componentDidMount() {
		AsyncStorage.getItem(AppConstants.USER_DETAILS).then((user_details) => {
			console.log('user_details component-->>', JSON.parse(user_details));
			if (user_details) {
				let data = JSON.parse(user_details);
				this.countryCodeData();
				this.setState({ userDetails: JSON.parse(user_details) });
			}
		});
	}

	countryCodeData = () => {
		this.setState({ isLoading: true }, () => {
			fetch('https://www.topfiyt.com/api/country', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((respData) => {
					this.setState({ isLoading: false, countryData: respData.data }, () => {
						console.log('countryData-->>', JSON.stringify(this.state.countryData));
					});
				})
				.catch((error) => {
					console.log(error);
				});
		});
	};

	_showToast = (message) => {
		this.refs.toast.show(message, DURATION.LENGTH_LONG);
	};

	onChangeEmail = (text) => {
		this.setState({ email: text });
	};

	onChangePhone = (text) => {
		this.setState({ phone: text });
	}

	inviteFriend = () => {
		const { userDetails, email, phone, code } = this.state;
		let e = '';

		let link =
			Platform.OS === 'ios' ?
				'https://apps.apple.com/us/app/godconnect-online/id1518393186'
				:
				'https://play.google.com/store/apps/details?id=com.godconnect.online';

		// if (email.trim() == '') {
		//     alert('Please enter email');
		//     return;
		// }
		// else
		if (email.trim() != '') {
			if (!Validator.isEmail(email)) {
				alert('Please enter valid email.');
			}
		} else {
			if (!Validator.isMobilePhone(phone)) {
				alert('Please enter valid phone number.');
				return;
			}
		}
		let b = JSON.stringify({
			Id: userDetails.Id,
			// Message:phone != ''? `Hello ${phone}, \n ${userDetails.Username} has invited you to join in GodConnect, the World’s Largest Christian Network! \n Download Application through the below links :- \n ${link}`:email,
			UserId: userDetails.Id,
			Message: email
		});
		console.log('b b b bb bb -->>', b);
		let msg = `Hello ${code}${phone}, \n ${userDetails.Username} has invited you to join in GodConnect, the World’s Largest Christian Network! \n Download Application through the below links :- \n ${link}`;

		let url = phone ?
			GLOBAL.BASE_URL + `api/CommonAPI/SendSMS?ToPhoneNumber=${code}${phone}&Message=${msg}`
			:
			GLOBAL.BASE_URL + 'api/CommonAPI/InviteFriend';
		console.log('url -->>', url);

		fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: phone ? undefined : b
		})
			.then((response) => response.json())
			.then((respData) => {
				console.log(respData);
				if (respData.response.StatusCode == 1) {
					alert(respData.response.Message);
					this.setState({ isLoading: false, email: '' });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	cancel = (emailID) => {
		// alert(`${'emailID:'}${this.state.email}`)
		this.setState({ email: '' });
	};

	setItem = (name) => {
		this.setState({ code: name }, () => {
			// this.getData(true)
		})
	}

	render() {
		const { data, countryData, isSendByEmail, isSendBySMS } = this.state;

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
				<Loading loading={this.state.isLoading} loaderColor={'white'} />

				<Content>
					<TitleHeader
						title={true}
						title={'INVITE FRIENDS'}
						tapOnBack={() => this.props.navigation.goBack()}
					/>

					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Button
							title={'Send By Email'}
							onPress={() => this.setState({ isSendByEmail: true })}
							customStyle={[
								styles.publishContainer,
								{
									backgroundColor: isSendByEmail ? '#530D89' : '#CEBFDA',
									width: width / 2.25,
									height: width / 9.3,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 20,
									borderColor: '#530D89',
									borderWidth: 0.2,
									// alignSelf: 'center',
									marginTop: 8
								}
							]}
							titleStyle={{ fontSize: 14, color: isSendByEmail ? 'white' : '#530D89' }}
						/>
						<Button
							title={'Send by SMS'}
							onPress={() => this.setState({ isSendByEmail: false })}
							customStyle={[
								styles.publishContainer,
								{
									backgroundColor: !isSendByEmail ? '#530D89' : '#CEBFDA',
									marginStart: 10,
									width: width / 2.25,
									height: width / 9.3,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 20,
									borderColor: '#530D89',
									borderWidth: 0.2,
									// alignSelf: 'center',
									marginTop: 8
								}
							]}
							titleStyle={{ fontSize: 14, color: !isSendByEmail ? 'white' : '#530D89' }}
						/>
					</View>
					<View style={{ marginStart: 20, marginEnd: 20, marginTop: 20 }}>
						{isSendByEmail ? (
							<Text style={{ color: '#707070', fontSize: 12 }}>{StringConstants.ENTER_YOUR_EMAIL}</Text>
						) : (
							<Text style={{ color: '#707070', fontSize: 12 }}>{'Enter the Phone Number of a friend, to join GodConnect'}</Text>
						)}
						{/* <ShadowField title={'Email Id'}
                            tapOnItemCallback={() => alert('Under development')} /> */}
						{isSendByEmail ? <View
							style={{
								height: width / 7,
								marginTop: 25,

								width: width / 1.09,
								borderRadius: 15,
								// padding: 12,
								flexDirection: 'row',
								// alignItems: 'flex-start',
								elevation: 5,
								shadowColor: '#000',
								shadowOffset: { width: 1, height: 1 },
								backgroundColor: 'white',
								shadowOpacity: 0.2,
								shadowRadius: 2
							}}
						>
							<TextInput
								style={{ fontSize: 14, height: width / 7, marginStart: 8, color: 'black' }}
								placeholder={'Emai ID'}
								placeholderTextColor={'#707070'}
								onChangeText={(text) => this.onChangeEmail(text)}
							/>
						</View>
							:

							<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>

								<CountryCodeModal
									countryList={countryData}
									isCountry={true}
									containerStyle={[styles.inputContainer, {
										// backgroundColor: '#9C5EC6',
										height: width / 7, width: 100,
										// borderRadius: 8,
										// marginTop: 25,
										elevation: 5,
										shadowColor: '#000',
										shadowOffset: { width: 1, height: 1 },
										backgroundColor: 'white',
										shadowOpacity: 0.2,
										shadowRadius: 2, borderRadius: 15
									}]}
									showHeader={this.props.showHeader}
									onRef={ref => (this.parentReference = ref)}
									parentReference={this.setItem.bind(this)} />
								<View
									style={{
										height: width / 7,
										// marginTop: 25,
										marginStart: 10,
										width: '70%',
										borderRadius: 15,
										// padding: 12,
										flexDirection: 'row',
										// alignItems: 'flex-start',
										elevation: 5,
										shadowColor: '#000',
										shadowOffset: { width: 1, height: 1 },
										backgroundColor: 'white',
										shadowOpacity: 0.2,
										shadowRadius: 2
									}}
								>

									<TextInput
										style={{ fontSize: 14, height: width / 7, marginStart: 8, color: 'black' }}
										placeholder={'Phone Number'}
										placeholderTextColor={'#707070'}
										onChangeText={(text) => this.onChangePhone(text)}
										maxLength={10}
									/>
								</View>
							</View>}

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: 30,
								alignSelf: 'center'
							}}
						>
							<Button
								title={StringConstants.INVITE_FRIEND}
								onPress={() => this.inviteFriend()}
								customStyle={{ backgroundColor: '#530D89', width: width / 2.5, height: width / 10.71 }}
								titleStyle={{ fontSize: 14 }}
							/>
							{/* <Button
								title={StringConstants.CANCEL}
								onPress={() => this.cancel(' ')}
								customStyle={[
									styles.publishContainer,
									{
										backgroundColor: '#CEBFDA',
										marginStart: 10,
										width: width / 2.5,
										height: width / 10.71
									}
								]}
								titleStyle={{ fontSize: 14 }}
							/> */}
						</View>
					</View>
				</Content>
			</SafeAreaView>
		);
	}
}
