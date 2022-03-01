import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, Modal, Image } from 'react-native';
import { Content } from 'native-base';
const { width } = Dimensions.get('window')

class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            name: null,
            countryId: ''
        };
    }

    selectLanguage(item) {
        this.setState({ name: item }, () => {
            this.props.parentReference(item)
        });
        this.toggleSelect();
    }

    toggleSelect() {
        // alert('Under development')
        // return
        this.setState({ isVisible: !this.state.isVisible });
    }

    renderItem = ({ item }) => {

        return (
            <TouchableOpacity activeOpacity={0.9} style={{
                backgroundColor: 'white', height: width / 9.99, width: width / 2.5, alignSelf: 'center',
                borderBottomColor: 'gray', borderBottomWidth: 0.3,
                justifyContent: 'center', alignItems: 'center'
            }} onPress={() => this.props.parentReference(item)}>
                <Text style={{ color: 'black', fontSize: 16 }}>{item.value}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { countryList, showModal, onChangeSearch, dismissModalCallback } = this.props;
        console.log('lang countryList-->>', JSON.stringify(countryList));

        return (
            <Modal
                // isVisible={this.state.isVisible}
                // containerStyle={{ }}
                transparent={true}
                animationType={'fade'}
                showModal={showModal}
                onRequestClose={() => { }}>
                <TouchableOpacity style={styles.rootContainerMain} onPress={() => dismissModalCallback()}>
                    <View style={{ marginTop: 6, alignSelf: 'center', backgroundColor: 'white', flexDirection: 'row', width: width / 1, alignItems: 'center', paddingStart: 10, }}
                    >
                        <TextInput
                            style={{ height: width / 7.5, width: width / 1.2, color: 'black', }}
                            // onChangeText={(text) => this.setState({ age: text })}
                            onChangeText={(text) => onChangeSearch(text)}
                            placeholder={"Search here..."}
                            placeholderTextColor={'#707070'} />
                        <TouchableOpacity onPress={() => dismissModalCallback()}>
                            <Image style={styles.search} source={require('../../resources/images/ic_search.png')} />
                        </TouchableOpacity>

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
        backgroundColor: '#00000060',
        flex: 1,
    },
    iconWrapper: {
        paddingHorizontal: 10,
    },
    search: {
        height: width / 10.71,
        width: width / 10.71, marginStart: 5
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
SearchModal.propTypes = {
    selectContainerStyles: PropTypes.object,
};

export default SearchModal;
