import React, { useState, useEffect, Component } from 'react';

import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, Alert } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import HeaderComponent from '../../Common/HeaderComponent';
import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AppConstants from '../../../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database, { firebase } from '@react-native-firebase/database';

import { listenToMessages, createMessage, currentUser, markThreadLastRead } from './firebase';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default class ChatScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userDetails: '',
			allMsgs: [],
			dataSource: [],
			msg: ''
		}
	}
	componentDidMount() {
		const { senderId } = this.props.route.params;
		console.log('senderId senderId--->>>', senderId)

		AsyncStorage.getItem(AppConstants.USER_DETAILS).then((user_details) => {
			if (user_details) {
				let data = JSON.parse(user_details);
				this.setState({ userDetails: data })
				let currentUserId = data.Id.toString();

				try {
					database().ref('messages').child(currentUserId).child(senderId).on('child_added', (dataSnapshot) => {
						var msgArray = [];

						let messsage = dataSnapshot.val();
						msgArray.push(messsage);
						this.setState({ dataSource: this.state.dataSource.concat(msgArray) });
						console.log('messsage--->>>', messsage)

						return;
						// dataSnapshot.forEach((data) => {
						// 	let person = data.val();

						// 	person.UserId = dataSnapshot.key;

						// 	messsage.push({
						// 		sentBy: data.val().from
						// 	});
						// });
						// setAllMsgs(messsage.reverse());
						// console.log('allmsg--->>>', allMsgs);
					});
				} catch (error) {
					console.log('allmsg error error error--->>>', error);
				}
			}
		});
	}

	SendMessage = async (currentuid, senderId, messages) => {
		let id = currentuid.toString();
		try {

			let msgId = database().ref('messages').child(id).child(senderId).push().key;
			console.log('msgId--->>>', msgId);

			let updates = {};
			let message = {
				message: messages,
				time: firebase.database.ServerValue.TIMESTAMP,
				from: id
			};
			console.log('message--->>>', message);

			updates['messages/' + id + '/' + senderId + '/' + msgId] = message;
			updates['messages/' + senderId + '/' + id + '/' + msgId] = message;
			database().ref().update(updates);

		} catch (error) {
			return error;
		}
	};

	ReceiveMessage = async (currentuid, senderId, messages) => {

		let id = currentuid.toString();

		try {
			return await database()
				.ref('messages')
				.child(id) // .set('messages').orderBy('createdAt','desc')
				.push({
					from: id,
					time: firebase.database.ServerValue.TIMESTAMP,
					message: messages
				});
		} catch (error) {
			return error;
		}
	};

	onSend = () => {
		const { senderId } = this.props.route.params;
		console.log('onSend onSend onSend--->>>>', this.state.msg);
		if (this.state.msg) {
			this.SendMessage(this.state.userDetails.Id, senderId, this.state.msg)
				.then((res) => {
					console.log('res res res--->>>>', res);
					this.setState({ msg: '' })
				})
				.catch((error) => {
					return error;
				});
			this.ReceiveMessage(this.state.userDetails.Id, senderId, this.state.msg)
				.then((res) => {
					console.log('res res res2--->>>>', res);
					this.setState({ msg: '' })
				})
				.catch((error) => {
					return error;
				});
		}
	};

	renderItem = ({ item }) => {
		return (
			<View
				style={{
					backgroundColor: this.state.userDetails.Id === item.from ? '#530D89' : '#CEBFDA',
					borderTopRightRadius: 20,
					borderTopLeftRadius: 20,
					borderBottomRightRadius: this.state.userDetails.Id === item.from ? 20 : 0,
					borderBottomLeftRadius: this.state.userDetails.Id != item.from ? 20 : 0,
					width: 7 * (width / 10),
					padding: 8,
					marginStart: 10,
					marginTop: 10,
					alignSelf: this.state.userDetails.Id === item.from ? 'flex-start' : 'flex-end'
				}}>
				<Text style={{ fontSize: 14, color: '1062' === item.from ? '#CEBFDA' : '#530D89' }}>{item.message}</Text>
			</View>
		);
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
				{/* <TitleHeader
					title={true}
					title={'CHAT'}
					tapOnBack={() => this.props.navigation.goBack()}
					customHeaderStyle={{ width: width / 2.3 }}
				/> */}

				<HeaderComponent
					title={true}
					title={'CHAT'}
					tapOnBack={() => this.props.navigation.goBack()} />
					
				{this.state.dataSource != undefined && this.state.dataSource.length > 0 &&
					<FlatList
						style={{ marginStart: 8, marginEnd: 8, flex: 1 }}
						contentContainerStyle={{ paddingBottom: 100 }}
						data={this.state.dataSource}
						extraData={this.state.dataSource}
						renderItem={this.renderItem} />
				}
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						width: '100%',
						justifyContent: 'space-between',
						backgroundColor: '#FBFBF9',
						paddingHorizontal: 12,
						position: 'absolute',
						bottom: 0,
						paddingTop: 10,
						paddingBottom: 10
					}}>
					<View style={[styles.inputContainer, { height: 45, width: '85%', borderRadius: 10 }]}>
						<TextInput
							style={{ flex: 1, color: 'black', fontSize: 16, height: 45, paddingHorizontal: 10 }}
							placeholder={'Write a Message...'}
							placeholderTextColor={'black'}
							value={this.state.msg}
							onChangeText={(text) => this.setState({ msg: text })
							}
						/>
					</View>
					<TouchableOpacity onPress={() => this.onSend()}>
						{/* <Text
							style={{ color: '#530D89', fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginStart: 8 }}>
							Send
						</Text> */}
						<Image
							style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: 'purple' }}
							source={require('../../../resources/images/send.png')}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
};

