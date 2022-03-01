import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Modal,Image } from 'react-native';
import { Content } from 'native-base';
const { width } = Dimensions.get('window')

class LanguageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            name: null,
            countryId: ''
        };
    }

    // selectLanguage(item) {
    //     this.setState({ name: item }, () => {
    //         this.props.parentReference(item)
    //     });
    //     this.toggleSelect();
    // }

    // toggleSelect() {
    //     // alert('Under development')
    //     // return
    //     this.setState({ isVisible: !this.state.isVisible });
    // }

    renderItem = ({ item }) => {

        return (
            <TouchableOpacity activeOpacity={0.9} style={{
                backgroundColor: 'white', height: width / 9.99, width: width / 2.5, alignSelf: 'center',
                 borderBottomColor: 'gray', borderBottomWidth: 0.3,
                  justifyContent: 'center',alignItems:'center'
            }} onPress={() => this.props.parentReference(item)}>
                <Text style={{  color: 'black', fontSize: 16 }}>{item.value}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { countryList, showModal, toggleSelect,postModal } = this.props;
        console.log('lang countryList-->>', JSON.stringify(countryList));

        return (
            <Modal
                // isVisible={this.state.isVisible}
                // containerStyle={{ }}
                transparent={true}
                animationType={'fade'}
                showModal={showModal}
                onRequestClose={() => {toggleSelect()}}>
                <Content style={styles.rootContainerMain}>
                    <View style={{ marginTop: 43, alignSelf: 'flex-end' }}>
                        
                        <FlatList
                            data={countryList}
                            // style={{ flex: 1 }}
                            // renderItem={this.renderItem}
                            renderItem={(item, index) => this.renderItem(item, index)}
                            keyExtractor={this.keyExtractor}
                            scrollEnabled={true} />
                    </View>
                </Content>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rootContainerMain: {
        backgroundColor: '#00000060',
        flex: 1,
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
});
LanguageModal.propTypes = {
    selectContainerStyles: PropTypes.object,
};

export default LanguageModal;
