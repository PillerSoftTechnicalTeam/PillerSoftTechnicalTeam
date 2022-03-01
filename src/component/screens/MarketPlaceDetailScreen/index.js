import React, { Component } from 'react';
import { Text, View, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import HeaderComponent from '../../Common/HeaderComponent';
import styles from './styles';
import Button from '../../Common/Button';
import SettingsModal from '../../Modal/SettingsModal';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import StringConstants from '../../../constants/StringConstants';
import { isTSEnumMember } from '@babel/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default class MarketPlaceScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isNearForYou: false,
			userDetails: '',
			rowsperpage: 2,
			data: []
		};
	}

	componentDidMount() {
		AsyncStorage.getItem(AppConstants.USER_DETAILS).then((user_details) => {
			if (user_details) {
				let data = JSON.parse(user_details);
				this.setState({ userDetails: JSON.parse(user_details) }, () => {
					this.getData();
				});
			}
		});
	}

	getData = () => {
		const { userDetails } = this.state;
		const { id } = this.props.route.params

		this.setState({ isLoading: true }, () => {
			fetch(GLOBAL.BASE_URL + 'api/MarektPlaceAPI/GetClassifideById', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					Id: id,
				})
			})
				.then((response) => response.json())
				.then((respData) => {
					this.offset = this.offset + 1;
					this.setState({ isLoading: false, data: respData.response }, () => {
						console.log('data-->>', JSON.stringify(this.state.data));
					});
				})
				.catch((error) => {
					console.log(error);
				});
		});
	};




	render() {
		const { data, isNearForYou, showModal } = this.state;

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
				<HeaderComponent
					title={true}
					title={'MARKETPLACE DETAILS'}
					tapOnBack={() => this.props.navigation.goBack()} />
				<ScrollView style={{ paddingHorizontal: 15, marginBottom: 20 }}>
					<View
						style={{ marginTop: 10, }}
						onPress={() => this.props.navigation.navigate('MarketPlaceDetailScreen')}>
						<Image
							style={[
								styles.inputContainer,
								{
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
								}
							]}
							source={{ uri: 'https://godconnect.online/staging/UploadedImages/' + data.PostedImages }}
						/>
						<View style={{ flexDirection: 'row', marginTop: 14, justifyContent: 'space-between' }}>
							<Text style={{ fontSize: 16, fontWeight: 'bold', width: '68%' }}>
								{'Title'}
							</Text>
							<Text style={{ fontSize: 14, fontWeight: '100', width: '25%', textAlign: 'right', color: '#8c6ad2', fontWeight: 'bold' }}>{data.ActualPrice != null ? '₹ ' + data.ActualPrice : '₹ '}</Text>
						</View>
						<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.AdTitle}</Text>
						{data.AdDescription != null &&
							<View>
								<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
									{'Description'}
								</Text>
								<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.AdDescription}</Text>
							</View>
						}
						{/* {data.ContactEmailId != null &&
							<View>
								<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
									{'Contact Email'}
								</Text>
								<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.ContactEmailId}</Text>
							</View>
						} */}
						{data.ContactNumber != null &&
							<View>
								<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
									{'Contact Number'}
								</Text>
								<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.ContactNumber}</Text>
							</View>
						}
						{data.CategoryName != null &&
							<View>
								<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
									{'Posted Under'}
								</Text>
								<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.CategoryName}</Text>
							</View>
						}

						<View style={{}}>
							<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
								{'Contact Details'}
							</Text>
							{data.phone != null &&
								<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
									<Image
										style={{ width: 13, height: 13, resizeMode: 'contain' }}
										source={require('../../../resources/images/phone.png')}
									/>
									<Text style={{ fontSize: 14, fontWeight: '100', marginLeft: 10 }}>{data.Location}</Text>
								</View>
							}
							{data.ContactEmailId != null &&
								<View style={{ flexDirection: 'row',alignItems: 'center', marginTop: 5  }}>
									<Image
										style={{ width: 13, height: 13, resizeMode: 'contain', }}
										source={require('../../../resources/images/email.png')}
									/>
									<Text style={{ fontSize: 14, fontWeight: '100', marginLeft: 10 }}>{data.ContactEmailId}</Text>
								</View>
							}
							{data.Location != null &&
								<View style={{ flexDirection: 'row',alignItems: 'center', marginTop: 5  }}>
									<Image
										style={{ width: 13, height: 13, resizeMode: 'contain' }}
										source={require('../../../resources/images/location_pin.png')}
									/>
									<Text style={{ fontSize: 14, fontWeight: '100', marginLeft: 10 }}>{data.Location}</Text>
								</View>
							}
						</View>

						{/* {data.ContactPerson != null &&
							<View>
								<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
									{'Contact Person'}
								</Text>
								<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.ContactPerson}</Text>
							</View>
						} */}
						{/* <Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
							{'Location: '}
							<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.Location}</Text>
						</Text> */}
					</View>
				</ScrollView>
			</SafeAreaView >
		);
	}
}
