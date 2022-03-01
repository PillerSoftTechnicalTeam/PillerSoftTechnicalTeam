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
        width: '100%',
        height: 632,
        justifyContent: 'center',
    },
    forgetContainer: {
        marginStart: width / 12.5,
        marginTop: 10,
        marginEnd: width / 1.70
    },
    forgetLabel: {
        color: '#F4A50C',
        fontWeight: '600',
        fontSize: 14
    },
    policyContainer: {
        marginTop: 20,
        alignSelf: 'center'
    },
    policyLabel: {
        color: 'white',
        fontSize: 14
    },
    accountContainer: {
        marginTop: width / 12.5,
        alignSelf: 'center'
    },
    accountLabel: {
        color: 'white',
        fontSize: 14
    },
    continueLabel: {
        color: 'white',
    }
});