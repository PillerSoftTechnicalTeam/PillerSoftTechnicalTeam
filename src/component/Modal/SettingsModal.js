import React, { PureComponent } from 'react';
import {
    Modal, FlatList, Keyboard,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image, KeyboardAvoidingView
} from 'react-native';
const { width } = Dimensions.get('window');

export default class SettingsModal extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        const { visible, dismissModalCallback ,customStyle} = this.props;
        const { } = this.state;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={visible}
                onRequestClose={() => { console.log('close modal') }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#00000080', }} activeOpacity={1}
                    onPress={() => Keyboard.dismiss()}>
                    <View style={[{ backgroundColor: 'white', width: width/1.42, alignSelf: 'flex-end' },customStyle]} >
                        <TouchableOpacity style={{ height: 25, marginTop: 10, flexDirection: 'row', alignSelf: 'flex-end', marginEnd: 20 }}
                            onPress={() => dismissModalCallback()}>
                            <Image style={{ height: 20, width: 20, marginStart: 10 }} source={require('../../resources/images/ic_close.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#CEBFDA', height: 25, marginTop: 8, flexDirection: 'row' }}>
                            <Image style={{ height: 15, width: 15, marginStart: 10 }} source={require('../../resources/images/ic_users_mp.png')} />
                            <Text style={{ color: '#530D89', fontSize: 12, marginStart: 10, fontWeight: '600' }}>Active Contacts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#CEBFDA', height: 25, marginTop: 10, flexDirection: 'row' }}>
                            <Image style={{ height: 15, width: 15, marginStart: 10 }} source={require('../../resources/images/is_msg_mp.png')} />

                            <Text style={{ color: '#530D89', fontSize: 12, marginStart: 10, fontWeight: '600' }}>Message Request</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#CEBFDA', height: 25, marginTop: 10, flexDirection: 'row' }}>
                            <Image style={{ height: 15, width: 15, marginStart: 10 }} source={require('../../resources/images/ic_help_mp.png')} />

                            <Text style={{ color: '#530D89', fontSize: 12, marginStart: 10, fontWeight: '600' }}>Help</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal >
        );
    }


}