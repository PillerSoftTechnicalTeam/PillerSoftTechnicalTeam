
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Image } from 'react-native';
import { BottomSheet, ListItem, Avatar } from 'react-native-elements';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Colors from '../layout/Colors';
// import countries from '../utils/countries';

// import CountryIcon from '../assets/images/icons/country.svg';
// import Font from '../layout/Font';
const { width } = Dimensions.get('window');

class CountryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            country: null,
            countryId: ''
        };
    }

    selectCountry(item) {
        this.setState({ country: item.CountryName}, () => {
            this.props.parentReference(item)
        });
        this.toggleSelect();
    }
    toggleSelect() {
        this.setState({ isVisible: !this.state.isVisible });
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: 'white', borderBottomColor: '#530D89', borderBottomWidth: 0.8, height: 35, }} onPress={() => this.selectCountry(item)}>
                <Text style={{ marginStart: 15, color: '#530D89', fontSize: 16 }}>{item.CountryName}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { countryList, isHeight, isResume } = this.props;
        return (
            <View>
                <TouchableOpacity activeOpacity={0.1}
                    onPress={() => this.toggleSelect()}
                    style={
                        this.props.containerStyle
                            ? [styles.selectContainer, this.props.containerStyle]
                            : styles.selectContainer
                    }>

                    <View>

                        <Text
                            style={[this.state.country ? styles.selectedCountryText : styles.countryPlaceHolderText,
                            ]}>
                            {this.state.country ? this.state.country : 'Select Country'}
                        </Text>
                    </View>
                    <View style={styles.iconWrapper}>
                    <Image source={require('../../resources/images/ic_dropdown.png')} />
                    </View>
                </TouchableOpacity>
                <BottomSheet
                    isVisible={this.state.isVisible}
                    containerStyle={{
                        // backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
                        // zIndex: 99999,
                    }}>
                    <ListItem
                        bottomDivider
                        key={'country-list-item-select'}
                        containerStyle={{justifyContent:'flex-end' }}
                        >
                        <TouchableOpacity onPress={() => this.toggleSelect()}
                            style={{ justifyContent: 'center', alignSelf: 'flex-end'}}>
                            {/* <Avatar
                onPress={() => this.toggleSelect()}
                icon={{
                  name: 'circle-with-cross',
                  type: 'entypo',
                  color: Colors.white,
                  size: 25,
                }}
              /> */}

                            <Image style={{}} source={require('../../resources/images/ic_close.png')} />

                        </TouchableOpacity>
                    </ListItem>
                    {/* {countryList.map((item, index) => (

            <ListItem
              bottomDivider
              onPress={() => this.selectCountry(item)}
              key={`country-list-item-${index}`}
              containerStyle={{ backgroundColor: Colors.primary }}>
              <ListItem.Content>
                <ListItem.Title style={{ color: 'white' }}>
                  {item.country_name}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))} */}
                    <FlatList
                        data={countryList}
                        // style={{ flex: 1 }}
                        // renderItem={this.renderItem}
                        renderItem={(item, index) => this.renderItem(item, index)}

                        keyExtractor={this.keyExtractor}
                        scrollEnabled={true} />
                </BottomSheet>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    iconWrapper: {
        paddingHorizontal: 3,
    },
    countryPlaceHolderText: {
        fontSize: 16,
        color: 'white',marginStart:8
    },
    selectedCountryText: {
        fontSize: 16,
        color: 'white', width: width / 4.5,marginStart:8
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width/1.22,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
});
CountryModal.propTypes = {
    selectContainerStyles: PropTypes.object,
};

export default CountryModal;
