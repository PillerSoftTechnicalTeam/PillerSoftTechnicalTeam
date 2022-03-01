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
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
        alignItems: 'center'
    },
    title: {
        color: '#000000',
        fontSize: 15
    },
    description: {
        color: '#707070',
        fontSize: 14,
        marginTop: 5
    },
});