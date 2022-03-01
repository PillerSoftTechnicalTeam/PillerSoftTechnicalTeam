import {
    StyleSheet, Dimensions
} from 'react-native';

// import Dimensions from 'Dimensions';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
// your brand's theme primary color
const brandColor = '#744BAC';

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5,
        marginStart: 10,
        marginEnd: 20,
        alignItems: 'center'
    },
    title: {
        color: '#000000',
        fontSize: 14
    },
    description: {
        color: '#707070',
        fontSize: 12,
        marginTop: 3
    },
});