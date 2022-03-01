import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Modal, Image } from 'react-native';
import { BottomSheet, ListItem, Avatar } from 'react-native-elements';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Colors from '../layout/Colors';
// import countries from '../utils/countries';
// import CountryIcon from '../assets/images/icons/gender.svg';
// import Layout from '../layout/Layout';
import { Content } from 'native-base';
const { width } = Dimensions.get('window')

// import Font from '../layout/Font';
class ItemCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            name: null,
            countryId: ''
        };
    }

    selectGender(id, name) {
        this.setState({ name: name }, () => {
            this.props.parentReference(id, name)
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
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    backgroundColor: 'white',
                    borderBottomWidth: 0.5,
                    paddingVertical: 10,
                    borderBottomColor: '#530D89'
                }}
                onPress={() => this.selectGender(item.CatId, item.CategoryName)}>
                <Text style={{ color: '#530D89', fontSize: 14 }}>{item.CategoryName}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { countryList, isCountry } = this.props;
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.toggleSelect()}
                    style={
                        this.props.containerStyle
                            ? [styles.selectContainer, this.props.containerStyle]
                            : styles.selectContainer
                    }>

                    {/* <View> */}
                    <Text style={
                        this.state.name ? styles.selectedCountryText : styles.countryPlaceHolderText}>
                        {this.state.name ? this.state.name : 'Category'}
                    </Text>
                    {/* </View> */}
                    <View style={styles.iconWrapper}>
                        <Image source={require('../../resources/images/ic_dropdown.png')} />
                    </View>
                </TouchableOpacity>
                <Modal
                    // isVisible={this.state.isVisible}
                    // containerStyle={{ }}
                    transparent={true}
                    animationType={'fade'}
                    visible={this.state.isVisible}
                    onRequestClose={() => { }}>
                    <Content
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        style={styles.rootContainerMain}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 110 }}>
                            <View
                                style={{
                                    height: 40,
                                    width: '100%',
                                    flexDirection:'row',
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent:'space-between',
                                    paddingHorizontal: 15,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                }}>
                                <Text style={{color: '#530D89', fontSize: 16 ,fontWeight:'bold'}}>Select Category</Text>
                                <TouchableOpacity onPress={() => this.toggleSelect()}
                                    style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <Image source={require('../../resources/images/ic_close.png')} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={countryList}
                                style={{
                                    height: width / 0.99,
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    paddingHorizontal: 15,
                                }}
                                // renderItem={this.renderItem}
                                renderItem={(item, index) => this.renderItem(item, index)}
                                contentContainerStyle={{ borderRadius: 30, paddingBottom: 20 }}
                                keyExtractor={this.keyExtractor}
                                scrollEnabled={true} />
                        </View>
                    </Content>
                </Modal>
            </View>
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
        paddingHorizontal: 20,
    },
    iconWrapper: {
        paddingHorizontal: 8,
    },
    countryPlaceHolderText: {
        fontSize: 15,
        color: '#707070',
        marginStart: 8
    },
    selectedCountryText: {
        fontSize: 15,
        color: 'black', marginStart: 8
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: Layout.window.width * 0.43,
        width: 350,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
});
ItemCategoryModal.propTypes = {
    selectContainerStyles: PropTypes.object,
};

export default ItemCategoryModal;
