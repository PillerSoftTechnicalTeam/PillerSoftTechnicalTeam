import React, { Component } from 'react';
import { Text, View, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';
import { firebase } from '@react-native-firebase/database';
const { width } = Dimensions.get('window');
import AppConstants from '../../../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import Loading from '../../Common/Loader';

export default class ChatListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFriendRequestList: true,
			todoKey: '',
			isLoading: false,
			isShowSearch: false,
			userDetails: '',
			tempImage: require('../../../resources/images/user_temp.png'),
			recentChatList: [],
			searchUser: [],
		};
	}

	componentDidMount() {
		AsyncStorage.getItem(AppConstants.USER_DETAILS).then((user_details) => {
			if (user_details) {
				let data = JSON.parse(user_details);
				this.setState({ userDetails: data })
				let currentUserId = data.Id.toString();
				try {
					this.setState({ isLoading: true });
					database()
						.ref('messages/' + currentUserId)
						.once('value')
						.then(snapshot => {
							if (snapshot.val() != null) {
								let personKeys = Object.keys(snapshot.val())
								console.log(personKeys)
								
								database().ref('users').once('value')
									.then(snapshot => {
										if (snapshot.val() != null) {
											var allUsers = snapshot.val()
											var newArray = []
											var myData = Object.keys(allUsers).map(key => {
												// console.log('key',key)
												personKeys.forEach(element => {
													// console.log('element',element)
													if (parseInt(key) === parseInt(element)) {
														newArray.push(allUsers[key])
													}
												});
												// return allUsers[key];
											})
											// console.log('myData',newArray)
											this.setState({
												recentChatList: newArray,
												isLoading: false
											});
										}
										else {
											console.log('inner snapshot is null')
											this.setState({
												isLoading: false
											});
										}
									});
							}
							else {
								console.log('snapshot is null')
								this.setState({
									isLoading: false
								});
							}
						})
				} catch (error) {
					console.log('Recent Chat error--->>>', error);
					this.setState({
						isLoading: false
					});
				}

			}
		});
	}

	searchUser(searchParam) {
		this.setState({ isLoading: true });
		AsyncStorage.getItem(AppConstants.USER_DETAILS).then((user_details) => {
			if (user_details) {
				let data = JSON.parse(user_details);
				this.setState({ userDetails: data })
				let currentUserId = data.Id.toString();
				try {
					this.setState({ isLoading: true });
					database().ref('users').once('value')
						.then(snapshot => {
							var allUsers = snapshot.val()
							var myData = Object.keys(allUsers).map(key => {
								return allUsers[key];
							})
							const newData1 = myData.filter(function (item) {
								const itemData = item.userData.Username
									? item.userData.Username.toUpperCase()
									: ''.toUpperCase();
								const textData = searchParam.toUpperCase();
								return itemData.indexOf(textData) > -1;
							});

							this.setState({
								searchUser: newData1,
								isLoading: false
							});
							console.log('myData', newData1)

						});
				} catch (error) {
					console.log('searchUser error --->>>', error);
					this.setState({
						isLoading: false
					});
				}
			}
		});
	}

	_showToast = (message) => {
		this.refs.toast.show(message, DURATION.LENGTH_LONG);
	};

	onChangedText = (id) => {
		this.setState({ id: id });
	};

	renderSearchChatList = ({ item }) => {
		console.log('item?.userData?.UserImage', item?.userData?.UserImage)
		return (
			<TouchableOpacity
				style={styles.recentListMainContainer}
				onPress={() => {
					console.log('sending->', item.userData.UserId)
					this.setState({searchUser:[],isShowSearch:false})
					this.props.navigation.navigate('ChatScreen', { senderId: item.userData.UserId })
				}}
			>
				<View>
					<Image
						style={styles.recentListLeftImage}
						source={
							item?.userData?.UserImage === undefined ?
								this.state.tempImage
								:
								{ uri: 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + item?.userData?.UserImage }
						}
					/>
					<View style={[styles.onlineView, { backgroundColor: item?.userData?.IsOnline ? 'green' : 'gray' }]} />
				</View>
				<View style={styles.rightContainer}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ flex: 1 }}>
							<Text style={styles.nameRecentList}>{item?.userData?.Username}</Text>
						</View>
						{/* <Text style={styles.dateContainer}>{item.date}</Text> */}
					</View>
					{/* <Text style={styles.lastMsgRecentList}>{item.lastMsg}</Text> */}
				</View>
			</TouchableOpacity>
		);
	};
	renderRecentChatList = ({ item }) => {
		console.log('item?.userData?.UserImage', item?.userData?.UserImage)
		return (
			<TouchableOpacity
				style={styles.recentListMainContainer}
				onPress={() => this.props.navigation.navigate('ChatScreen', { senderId: item.userData.UserId })}
			>
				<View>
					<Image
						style={styles.recentListLeftImage}
						source={
							item?.userData?.UserImage === undefined ?
								this.state.tempImage
								:
								{ uri: 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + item?.userData?.UserImage }
						}
					/>
					<View style={[styles.onlineView, { backgroundColor: item?.userData?.IsOnline ? 'green' : 'gray' }]} />
				</View>
				<View style={styles.rightContainer}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ flex: 1 }}>
							<Text style={styles.nameRecentList}>{item?.userData?.Username}</Text>
						</View>
						{/* <Text style={styles.dateContainer}>{item.date}</Text> */}
					</View>
					{/* <Text style={styles.lastMsgRecentList}>{item.lastMsg}</Text> */}
				</View>
			</TouchableOpacity>
		);
	};
	renderActiveChatList = ({ item }) => {
		return (
			item?.userData?.IsOnline ?
				<TouchableOpacity
					style={styles.activeMainContainer}
					onPress={() => {
						console.log('sending->', item.userData.UserId)
						this.props.navigation.navigate('ChatScreen', { senderId: item.userData.UserId })
					}}>
					<Image style={styles.recentListLeftImage} source={{ uri: 'http://staging.godconnect.online/UploadedImages/ProfileImages/' + item?.userData?.UserImage }} />
					<View style={styles.onlineView} />
				</TouchableOpacity>
				: null
		)

	};
	render() {
		const { recentChatList, isShowSearch, isLoading, searchUser } = this.state;
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
				<Loading loading={this.state.isLoading} loaderColor={'white'} />
				<TitleHeader
					customHeaderStyle={{ width: width / 2.4 }}
					isChat={true}
					title={true}
					title={'CHATLIST'}
					tapOnBack={() => this.props.navigation.goBack()}
					tapOnAdd={() => { console.log('nnan') }}
					tapOnSearch={() => { this.setState({ isShowSearch: !isShowSearch, searchUser: [] }) }}
				/>
				<View style={styles.mainContainer}>
					{isShowSearch ?
						<View>
							<View style={styles.inputContainer}>
								<TextInput
									style={styles.inputFieldStyle}
									placeholder={'Search Here'}
									selectionColor={'gray'}
									placeholderTextColor={'gray'}
									onClear={(text) => this.searchUser('')}
									onChangeText={(text) => {
										if (text.length > 2)
											this.searchUser(text)
										else if (text.length === 0)
											this.searchUser('_')
									}}
								/>
								<TouchableOpacity
									onPress={() => { this.setState({ isShowSearch: !isShowSearch, searchUser: [] }) }}>
									<Image
										source={require('../../../resources/images/cancel.png')}
										style={styles.crossStyle}
									/>
								</TouchableOpacity>
							</View>
							{searchUser.length > 0 ?
								<View style={{ marginTop: 15 }}>
									<Text style={styles.headingText}>Search List</Text>
									<FlatList
										style={{ marginStart: 8, marginEnd: 8 }}
										contentContainerStyle={{ paddingBottom: 220 }}
										data={searchUser}
										extraData={searchUser}
										renderItem={this.renderSearchChatList}
									/>
								</View>
								: !isLoading &&
								<Text style={styles.noChatText}>No Search item exist</Text>
							}
						</View>
						:
						recentChatList.length > 0 ?
							<View>
								<View>
									<FlatList
										horizontal
										style={{ marginStart: 8, marginEnd: 8 }}
										data={recentChatList}
										extraData={recentChatList}
										renderItem={this.renderActiveChatList}
									/>
								</View>
								<View style={{ marginTop: 15 }}>
									<Text style={styles.headingText}>Recent Chat</Text>
									<FlatList
										style={{ marginStart: 8, marginEnd: 8 }}
										contentContainerStyle={{ paddingBottom: 220 }}
										data={recentChatList}
										extraData={recentChatList}
										renderItem={this.renderRecentChatList}
									/>
								</View>
							</View>
							: !isLoading &&
							<Text style={styles.noChatText}>No Chat Available Yet</Text>
					}
				</View>
			</SafeAreaView>
		);
	}
}
