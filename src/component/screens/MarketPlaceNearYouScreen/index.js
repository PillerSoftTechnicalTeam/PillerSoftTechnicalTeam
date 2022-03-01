import React, { Component } from 'react';
import { Text, View, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import SettingsModal from '../../Modal/SettingsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import StringConstants from '../../../constants/StringConstants';

const { width } = Dimensions.get('window');

export default class MarketPlaceNearYouScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ image: require('../../../resources/images/ic_car.png'), price: '$50000' },
				{ image: require('../../../resources/images/ic_car.png'), price: '$50000' },
				{ image: require('../../../resources/images/ic_car.png'), price: '$50000' },
				{ image: require('../../../resources/images/ic_car.png'), price: '$50000' },
				{ image: require('../../../resources/images/ic_car.png'), price: '$50000' },
				{ image: require('../../../resources/images/ic_car.png'), price: '$50000' },
				{ image: require('../../../resources/images/ic_car.png'), price: '$50000' }
			],
			myAddsData: []
		};
	}

	componentDidMount() {
		AsyncStorage.getItem(AppConstants.USER_DETAILS).then((user_details) => {
			if (user_details) {
				let data = JSON.parse(user_details);
				this.setState({ userDetails: JSON.parse(user_details) }, () => {
					this.getMyAdds();
				});
			}
		});
	}

	getMyAdds = () => {
		this.offset = 1;

		const { userDetails } = this.state;
		let body = {
			pagenumber: this.offset,
			rowsperpage: this.state.rowsperpage,
			Id: userDetails.Id,
			UserId: userDetails.Id,
			Message: this.state.description,
			src: this.state.profilePic
		};
		console.log('onPressNext body-->>', JSON.stringify(body));

		this.setState({ isLoading: true }, () => {
			fetch(GLOBAL.BASE_URL + 'api/MarektPlaceAPI/GetMyAdds', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					pagenumber: this.offset,
					rowsperpage: this.state.rowsperpage,
					// GroupId: this.state.GroupId,
					Id: userDetails.Id,
					UserId: userDetails.Id
					// Message: this.state.type,
					// src: this.state.source
				})
			})
				.then((response) => response.json())
				.then((respData) => {
					this.offset = this.offset + 1;
					this.setState({ isLoading: false, myAddsData: respData.response }, () => {
						console.log('add3-->>', JSON.stringify(this.state.myAddsData));
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

	onChangedText = (id) => {
		this.setState({ id: id });
	};

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
							customStyle={[
								styles.publishContainer,
								{ width: width / 3.75, borderRadius: 10, height: 30, backgroundColor: '#530D89' }
							]}
							titleStyle={{ fontSize: 12 }}
						/>
						<Button
							title={StringConstants.BUTTON_DELETE}
							onPress={() => alert('Under Development')}
							customStyle={[
								styles.publishContainer,
								{
									backgroundColor: '#CEBFDA',
									marginStart: 10,
									width: width / 3.75,
									borderRadius: 10,
									height: 30,
									backgroundColor: '#CEBFDA'
								}
							]}
							titleStyle={{ fontSize: 12, color: '#530D89' }}
						/>
					</View>
				</View>
			</View>
		);
	};

	renderItem = ({ item }) => {
		let img = item.PostedImage!== null?'https://godconnect.online/staging/UploadedImages/' + item.PostedImage:require('../../../resources/images/ic_car.png')
		return (
			<TouchableOpacity style={{ marginTop: 10, marginStart: 5 }} onPress={()=>this.props.navigation.navigate('MarketPlaceDetailScreen',{id:item.ClassifiedId})}>
                <Image style={{ width: width / 2.08, height: width / 2.41 }} source={{uri:'https://godconnect.online/staging/UploadedImages/' + item.PostedImage}} />
				<Button
					title={`$ ${item.ActualPrice == null?0:item.ActualPrice}`}
                    onPress={() => this.props.navigation.navigate('MarketPlaceDetailScreen',{id:item.ClassifiedId})}
					customStyle={[ { width: width / 2.08, height: 26, backgroundColor: '#530D89', borderRadius: 0 } ]}
					titleStyle={{ fontSize: 12 }}
				/>
			</TouchableOpacity>
		);
	};

	render() {
		const { data, myAddsData, showModal } = this.state;

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
				{showModal && (
					<SettingsModal
						dismissModalCallback={() => this.setState({ showModal: false })}
						customStyle={{ marginTop: 150 }}
					/>
				)}
				{/* <Content> */}
				<TitleHeader
					customHeaderStyle={{ width: width / 2.4 }}
					title={true}
					title={'MY ADDS'}
					tapOnBack={() => this.props.navigation.goBack()}
				/>

				<View>
					{/* <View style={{ flexDirection: 'row', marginTop: 15, }}>
                            <Image source={require('../../../resources/images/ic_home_post.png')} />

                            <View style={{ marginStart: 10, }}>
                                <Text style={{ fontSize: 10, color: '#707070', marginEnd: 40 }}>Men's Classy Eagle T-Shirts Vol 1 Fabric: Variable ( Check Product For Details) and other items were recently listed for sale in Aundh-Baner-Balewadi </Text>
                                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                    <Image style={{ height: 8, width: 8 }} source={require('../../../resources/images/ic_small_dot.png')} />
                                    <Text style={{ fontSize: 8, color: '#707070', marginStart: 3 }}>3 Days ago</Text>
                                </View>
                            </View>



                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={{ flex: 1, color: '#707070', fontSize: 14 }}>Today's Picks</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image style={{ height: 30, width: 30 }} source={require('../../../resources/images/ic_location.png')} />

                                <Text style={{ fontSize: 12, color: '#530D89' }}>Pune, MH</Text>
                            </View>
                        </View> */}

					{myAddsData.length > 0 ? (
						<FlatList
							style={{}}
							data={myAddsData}
							extraData={myAddsData}
							renderItem={this.renderItem}
							numColumns={2}
						/>
					) : (
						<Text style={{ textAlign: 'center', marginTop: 10, fontSize: 15 }}>No Adds Found!</Text>
					)}
				</View>

				{/* <Toast ref="toast" position={position} /> */}
				{/* </Content> */}
			</SafeAreaView>
		);
	}
}
