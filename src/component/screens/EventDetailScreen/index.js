import React, { Component } from 'react';
import { Text, View, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import SettingsModal from '../../Modal/SettingsModal';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import StringConstants from '../../../constants/StringConstants';
import { isTSEnumMember } from '@babel/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default class EventDetailScreen extends Component {
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
        const { id } = this.props.route.params

		const { userDetails } = this.state;

		this.setState({ isLoading: true }, () => {
			fetch(GLOBAL.BASE_URL + 'api/CommonAPI/GetEventDetails', {
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
				{/* {
                    showModal &&
                    <SettingsModal
                        dismissModalCallback={() => this.setState({ showModal: false })}
                        customStyle={{ marginTop: 150 }} />
                } */}
				{/* <Content> */}
				<TitleHeader
					customHeaderStyle={{ width: width / 2.8 }}
					title={true}
					title={'EVENT DETAILS'}
					tapOnBack={() => this.props.navigation.goBack()}
				/>

				<View style={{ marginStart: 15, marginEnd: 15 }}>
					<View
						style={{ marginTop: 10, marginStart: 5 }}
					>
						<Image
							style={[
								styles.inputContainer,
								{
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column'
								}
							]}
							source={{ uri: 'http://staging.godconnect.online/UploadedImages/EventImages/' + data.ImageUrl  }}
						/>


						<Text style={{ fontSize: 16, marginTop: 25, fontWeight: 'bold' }}>
							{'Event Title: '}
							<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.EventTitle}</Text>
						</Text>
						<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
							{'Event Description: '}
							<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.EventDescription}</Text>
						</Text>
						<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
							{'Event Date: '}
							<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.EventDate}</Text>
						</Text>
						<Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
							{'Event Contact Number: '}
							<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.ContactNumber}</Text>
						</Text>
                        <Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
							{'Event Email: '}
							<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.EmailId}</Text>
						</Text>
                        <Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
							{'Event Organiser: '}
							<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.OrganizedBy}</Text>
						</Text>
                        <Text style={{ fontSize: 16, marginTop: 14, fontWeight: 'bold' }}>
							{'Event Location: '}
							<Text style={{ fontSize: 14, fontWeight: '100' }}>{data.EventLocation}</Text>
						</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}
