import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
const { width, height } = Dimensions.get('window');
import TextDimensions from '../../resources/TextDimensions';
import Colors from '../../resources/Colors';
import Button from './Button';


export default class GroupHeader extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     buttonData: [{ title: 'New for you', isSelected: false }, { title: 'Your Group', isSelected: false }, { title: 'Discover', isSelected: false }, { title: 'Notifications', isSelected: false }, { title: 'Your Feeds', isSelected: false }]
        // };
    }

    render() {
        const { item, isSelected, titleStyle, customStyle, onPress, title } = this.props;
        return (
        //     <View style={{ flexDirection: 'row' }}>
        //         {
        //             this.state.buttonData.map((item,index) => {
        //                 return (
                            <Button
                                title={title}
                                onPress={onPress}
                                customStyle={[{ width: 74, height: 26, backgroundColor: isSelected ? '#530D89' : '#CEBFDA', borderRadius: 5, marginStart: 4 }],customStyle}
                                titleStyle={{ fontSize: 14 }} />
            //             )
            //         })
            //     }
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4A50C',
        height: width / 9.37,
        width: width / 2.08,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    titleLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
})
