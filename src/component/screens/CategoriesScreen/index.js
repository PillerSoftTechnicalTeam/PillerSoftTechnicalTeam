import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native'
import styles from './styles';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import GLOBAL from '../../../constants/ApiConstants';
import AppConstants from '../../../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../Common/Loader';

const { width } = Dimensions.get('window');

export default class CategoriesScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            password: '',
            userDetails: '',
            categoryData: [],
            isLoading: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: JSON.parse(user_details) }, () => {
                    this.getCategories()

                })
            }
        });
    }

    getCategories = () => {
        this.setState({ isLoading: true }, () => {
            fetch(GLOBAL.BASE_URL + 'api/MarektPlaceAPI/GetMktCategories',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },

                }).then((response) => response.json())
                .then((respData) => {
                    this.setState({ isLoading: false, categoryData: [...this.state.categoryData, ...respData.response] }, () => {
                        console.log('categoryData-->>', JSON.stringify(this.state.categoryData))
                    });
                }).catch((error) => {
                    console.log(error);
                });
        });
    }


    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }

    render() {
        const { value, categoryData } = this.state;
        let elemName = ''
        categoryData.map((elem) => {
            elemName = elem.CategoryName
        })
        return (
            <View style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <Content>
                    <Loading loading={this.state.isLoading} loaderColor={'white'} />

                    <TitleHeader title={true} title={'CATEGORIES'} tapOnBack={() => this.props.navigation.goBack()}
                        tapOnEdit={() => this.props.navigation.navigate('EditInfoScreen')}
                    />
                    <View style={{ marginStart: 15, marginEnd: 15 }}>

                        {/* categoryData.map((elem){
                            <Field
                                src={require('../../../resources/images/ic_bible.png')}
                                title={elem.CategoryName}
                                onPress={() => this.props.navigation.navigate('BiblesScreen')} />
                            // elemName = elem.CategoryName
                        }) */}


                        {this.state.categoryData.map((item, index) => {
                            return (
                                <Field
                                // src={require('../../../resources/images/ic_bible.png')}
                                title={item.CategoryName}
                                // onPress={() => this.props.navigation.navigate('BiblesScreen')}
                                 />
                            );
                        })}

                        {/* <Field
                            src={require('../../../resources/images/ic_bible.png')}
                            title={elemName}
                            onPress={() => this.props.navigation.navigate('BiblesScreen')} />

                        <Field
                            src={require('../../../resources/images/ic_book.png')}
                            title={elemName}
                            onPress={() => alert('Under development')} />

                        <Field
                            src={require('../../../resources/images/ic_occasion.png')}
                            title={elemName}
                            onPress={() => alert('Under development')} />

                        <Field
                            src={require('../../../resources/images/ic_art.png')}
                            title={elemName}
                            onPress={() => alert('Under development')} />

                        <Field
                            src={require('../../../resources/images/ic_music.png')}
                            title={elemName}
                            onPress={() => alert('Under development')} />

                        <Field
                            src={require('../../../resources/images/ic_video.png')}
                            title={elemName}
                            onPress={() => alert('Under development')} />
                        <Field
                            src={require('../../../resources/images/ic_miscellaneous.png')}
                            title={elemName}
                            onPress={() => alert('Under development')} />
                        <Field
                            src={require('../../../resources/images/ic_concert.png')}
                            title={elemName}
                            onPress={() => alert('Under development')} /> */}
                    </View>

                </Content>
            </View>
        );
    }
}

const Field = ({ src, onPress, title, img, description }) => {
    return (
        <TouchableOpacity style={[styles.container,{height: width / 10}]} 
        // onPress={() => onPress()}
        >
            {/* <Image style={{ height: width / 7.5, width: width / 7.5, }} source={src} /> */}
            {/* <View style={{ marginStart: 8 }}> */}
            <Text style={[styles.title, { marginStart: 15 }]}>{title}</Text>
            {/* <Text style={styles.description}>{description}</Text> */}
            {/* </View> */}
        </TouchableOpacity>
    )
}