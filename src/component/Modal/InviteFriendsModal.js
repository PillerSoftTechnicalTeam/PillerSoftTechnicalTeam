import React, { PureComponent } from 'react';
import {
    Modal, Alert, Keyboard,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image, TextInput, StyleSheet
} from 'react-native';
const { width } = Dimensions.get('window');


export default class InviteFriendModal extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            typeList: ['Public', 'Private', 'Friends'],
            type: '',
            post: '',
            selectedImage: '',
            selectedImageType: '',
            postType: '',
            selectedVideo: ''
        }
    }
    render() {
        const { visible, dismissModalCallback, groupID } = this.props;
        console.log(groupID)
        return (
            <View style={{ flex: 1 }}>
                <Modal animationType='fade'
                    transparent
                    visible={visible}
                    // presentationStyle="overFullScreen"
                    onRequestClose={() => dismissModalCallback()}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#848484' }}>
                                <View style={{ paddingHorizontal: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                    <Text style={styles.title}>{'Invite Friends to group'}</Text>
                                    <TouchableOpacity onPress={() => dismissModalCallback()}>
                                        <Image source={require('../../resources/images/cancel.png')} style={{ height: 14, width: 14, tintColor: '#848484' }} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ paddingHorizontal: 17, marginTop: 10, }}>
                                <Text style={{ color: '#9d9eb6' }}>{'Enter the email address to invite a friend to join your group!'}</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='Email ID'>

                                    </TextInput>
                                </View>
                            </View>

                            {/* ------------------------------Buttons-------------------------- */}
                            <View style={{ paddingHorizontal: 17, marginTop: 15, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                                <TouchableOpacity onPress={() => dismissModalCallback()}>
                                    <Text style={styles.close}>{'Close'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inviteBtn}>
                                    <Text style={styles.invite} >{'Invite'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>



                    </View>
                </Modal>


            </View>
        );
    }


}

const styles = StyleSheet.create({

    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    modalView: {
        paddingVertical: 20,
        elevation: 5,
        height: 220,
        width: width * 0.95,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    input: {
        width: "100%",
        height: 45,
        marginTop: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: "rgba(0, 0, 0, 0.4)",
        borderWidth: 1,
    },
    submit: {
        flexDirection: 'row',
        height: 35,
        width: 100,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    title: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold'
    },
    inviteBtn: {
        height: 35,
        width: 70,
        backgroundColor: '#28a745',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        color: '#676a6c',
        fontSize: 18,
        marginEnd: 20
    },
    invite: {
        color: '#ffffff',
        fontSize: 18,
    }
});
