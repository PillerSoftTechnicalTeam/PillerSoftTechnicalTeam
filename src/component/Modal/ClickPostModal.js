import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Modal, Image } from 'react-native';
import { Content } from 'native-base';
const { width } = Dimensions.get('window')
import * as Animatable from 'react-native-animatable';

class ClickPostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            name: null,
            countryId: ''
        };
    }


    renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity
            
            activeOpacity={0.9} style={{
                height: width / 8, width: '100%',
                borderBottomColor: 'gray', borderBottomWidth: index != 2 ? 0.3 : 0,
                justifyContent: 'center', alignItems: 'center',
            }} onPress={() => this.props.parentReference(item)}>
                <Text style={{ color: 'black', fontSize: 16 }}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { postList, showModal, toggleSelect, postModal } = this.props;
        // console.log('post item-->>', JSON.stringify(postList));

        return (
            <Modal
                transparent={true}
                animationType={'fade'}
                showModal={showModal}
                onRequestClose={() => { toggleSelect() }}>
                {/* <Content
                    style={styles.rootContainerMain}>

                    <FlatList
                        data={postList}
                        // style={{ flex: 1}}
                        // renderItem={this.renderItem}
                        renderItem={(item, index) => this.renderItem(item, index)}
                        keyExtractor={this.keyExtractor}
                        scrollEnabled={true} />

                </Content> */}

                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPressOut={() => { toggleSelect() }}>
                    <View style={{ backgroundColor: '#00000010', flex: 1, justifyContent: 'flex-end', }}>
                        <Animatable.View
                            name='bounceInUp'
                            style={{ backgroundColor: 'white', height: 150, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>

                           
                                <FlatList
                                    data={postList}
                                    // style={{ flex: 1}}
                                    // renderItem={this.renderItem}
                                    renderItem={(item, index) => this.renderItem(item, index)}
                                    keyExtractor={this.keyExtractor}
                                    scrollEnabled={true} />

                                    {/* <Text>{'Send Request'}</Text>
                                    <Text>{'Report'}</Text> */}


                            
                        </Animatable.View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rootContainerMain: {
        backgroundColor: '#00000010',

        // backgroundColor:'pink',
        // flex: 0.5,
    },
    iconWrapper: {
        paddingHorizontal: 10,
    },
    countryPlaceHolderText: {
        fontSize: 12,
        color: 'gray',
    },
    selectedCountryText: {
        fontSize: 12,
        color: 'black',
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: Layout.window.width * 0.43,
        width: 342,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    modalView: {
        paddingVertical: 20,
        elevation: 5,
        height: 70,
        width: '100%',
        backgroundColor: "#fff",
        borderRadius: 7,
    },
});
ClickPostModal.propTypes = {
    selectContainerStyles: PropTypes.object,
};

export default ClickPostModal;
