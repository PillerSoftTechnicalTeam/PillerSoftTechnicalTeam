import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, TextInput, Image, FlatList, SafeAreaView } from 'react-native'
import styles from './styles';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import Button from '../../Common/Button';

const { width } = Dimensions.get('window');

export default class BiblesScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },

            ],
        }
    }

    componentDidMount() {

    }

    _showToast = (message) => {
        this.refs.toast.show(message, DURATION.LENGTH_LONG)
    }

    onChangedText = (id) => { this.setState({ id: id }) }



    renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: 10, marginStart: 5 }}>
                <Image style={{ width: width/2.17, height: width/2.41 }} source={item.image} />
                <Button
                    title={item.price}
                    onPress={() => alert('Under Development')}
                    customStyle={[{ width: width/2.17, height: 26, backgroundColor: '#530D89', borderRadius: 0, }]}
                    titleStyle={{ fontSize: 12 }} />
            </View>
        )
    }



    render() {
        const { data } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFBF9' }}>
                {/* <Content> */}
                    <TitleHeader title={true} title={'BIBLES'} tapOnBack={() => this.props.navigation.goBack()}
                        tapOnEdit={() => this.props.navigation.navigate('EditInfoScreen')}
                        isItemSale={true}
                        tapOnFilter={() => alert('Under Development')}
                        tapOnSearch={() => alert('Under Development')}
                        tapOnAdd={() => alert('Under Development')}
                    />
                    <View style={{ marginStart: 8, marginEnd: 8 }}>
                        <FlatList
                            data={data}
                            extraData={data}
                            renderItem={this.renderItem}
                            numColumns={2}
                        />
                    </View>

                {/* </Content> */}
            </SafeAreaView>
        );
    }
}

const Field = ({ src, onPress, title, img, description }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress}>
            <Image style={{ height: width / 7.5, width: width / 7.5, }} source={src} />
            <View style={{ marginStart: 10 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    )
}