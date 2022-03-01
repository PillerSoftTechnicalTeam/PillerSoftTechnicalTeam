import React, { PureComponent } from 'react';
import {
    Modal, Alert, Keyboard,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image, FlatList, StyleSheet
} from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');


export default class NotificationModal extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            post: '',
            notificationList: [
                {
                    id: '1',
                    image: require('../../resources/images/dummy1.jpg'),
                    desc: 'Lorem Ipsum is a dummy text.',
                    time: '1 hour ago'
                },
                {
                    id: '2',
                    image: require('../../resources/images/dummy2.jpg'),
                    desc: 'Lorem Ipsum is a dummy text. Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text Lorem Ipsum is a dummy text',
                    time: '1 hour ago'
                }
            ]
        }
    }
    renderItem = ({ item, index }) => {
        // console.log('============', item.image)
        return (
            <View style={{ flexDirection:'row', backgroundColor:'pink'}}>
                <View style={{width: '18%', alignItems:'center' }}>
                    <Image source={item.image} style={{ height: 55, width: 55, borderRadius: 55 }} />
                </View>
                <View style={{width: '82%', paddingVertical:8, borderBottomWidth:0.3,borderBottomColor:'grey' }}>
                  
                    <Text style={{fontSize: 15, fontWeight:'bold', color: 'black'}}>{'Someone commented on your post'}</Text>
              
                    <Text style={{ fontSize: 15, color: 'black' }} >{item.desc}</Text>

                </View>

            </View>
        )
    }
    render() {
        const { visible, dismissModalCallback } = this.props;
        const { notificationList } = this.state
        return (
            <View style={{ flex: 1 }}>
                <Modal animationType='fade'
                    transparent
                    visible={visible}
                    // presentationStyle="overFullScreen"
                    onRequestClose={() => dismissModalCallback()}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 0.15 }}>
                                    <Text style={{ fontSize: 15, color: '#530D89', alignSelf: 'flex-end' }}>{'See All'}</Text>
                                </View>
                                <View style={{ flex: 0.75, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.title}>{'Notifications'}</Text>
                                </View>
                                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => dismissModalCallback()}>
                                        <Image source={require('../../resources/images/cancel.png')} style={{ height: 14, width: 14, tintColor: '#848484' }} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>

                            </View>


                            <FlatList
                                data={notificationList}
                                renderItem={(item, index) => this.renderItem(item, index)}
                                keyExtractor={this.keyExtractor}
                            />

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
        height: height * 0.65,
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
        borderColor: "rgba(0, 0, 0, 0.3)",
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
        fontWeight: 'bold',
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
