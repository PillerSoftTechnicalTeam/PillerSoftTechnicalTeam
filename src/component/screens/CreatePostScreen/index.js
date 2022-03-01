import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import styles from './styles';
import Button from '../../Common/Button';
import StringConstants from '../../../constants/StringConstants';

const { width } = Dimensions.get('window');

export default class CreatePostScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            password: ''
        }
    }

    componentDidMount() {

    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }

    render() {
        const { value } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                <Content>
                    <TitleHeader title={true} title={'CREATE NEW POST'} tapOnBack={() => this.props.navigation.goBack()} />
                    <View style={{ marginStart: 15, marginEnd: 15, }}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={{}}
                                placeholder={"What's in your Mind?"}
                                placeholderTextColor={'#707070'} />
                            <Image source={require('../../../resources/images/ic_emoji.png')} style={styles.emoji} />
                        </View>

                        <View style={[styles.inputContainer, { height: width / 7.5, width: width / 1.09, marginTop: 15, alignItems: 'center' }]}>
                            {value ? <Text style={{ flex: 1 }}>{value}</Text> :
                                <Text style={[{ flex: 1 }]}>{'Type'}</Text>}
                            <Image source={require('../../../resources/images/ic_dropdown.png')} style={{ height: 7, width: 14 }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                            <Text style={{ fontSize: 12, color: '#707070' }}>Upload Images / Videos</Text>
                            <TouchableOpacity style={styles.fileContainer}>
                                <Text style={{ fontSize: 12, color: '#707070' }}>Choose File</Text>
                            </TouchableOpacity>
                        </View>

                        <Button
                            title={StringConstants.PUBLISH}
                            onPress={() => alert('Under Development')}
                            customStyle={styles.publishContainer}
                            titleStyle={{fontSize:14}} />
                    </View>

                </Content>
            </View>
        );
    }
}