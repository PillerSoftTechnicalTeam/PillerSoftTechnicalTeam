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
class ItemCondition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            name: null,
            countryId: ''
        };
    }

    selectGender(item) {
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
                backgroundColor: 'white', height: width / 10.7, width: width / 1.37, alignSelf: 'center'
            }} onPress={() => this.selectGender(item)}>
                <Text style={{ marginStart: 15, color: '#530D89', fontSize: 16 }}>{item}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { countryList } = this.props;
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
                        {this.state.name ? this.state.name : 'Condition'}
                    </Text>
                    {/* </View> */}
                    <View style={styles.iconWrapper}>
                        {/* <MaterialIcons
                            name={'keyboard-arrow-down'}
                            color={'red'}
                            size={25}
                        /> */}
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
                    <Content style={styles.rootContainerMain}>
                        <View style={{ marginTop: width / 2 }}>
                            <ListItem
                                bottomDivider
                                key={'country-list-item-select'}
                                containerStyle={{ alignSelf: 'center', height: 10, width: width / 1.37, }}>
                                <TouchableOpacity onPress={() => this.toggleSelect()}
                                    style={{ justifyContent: 'center', alignItems: 'flex-end', marginTop: 18 }}>
                                    {/* <Avatar
                                        onPress={() => this.toggleSelect()}
                                        icon={{
                                            name: 'circle-with-cross',
                                            type: 'entypo',
                                            color: 'red',
                                            size: 22,
                                        }}
                                    /> */}
                                    <Image source={require('../../resources/images/ic_close.png')} />

                                </TouchableOpacity>
                            </ListItem>
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
    },
    iconWrapper: {
        paddingHorizontal: 8,
    },
    countryPlaceHolderText: {
        fontSize: 16,
        color: '#707070',
        marginStart: 8
    },
    selectedCountryText: {
        fontSize: 16,
        color: 'black',marginStart:8
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
ItemCondition.propTypes = {
    selectContainerStyles: PropTypes.object,
};

export default ItemCondition;
