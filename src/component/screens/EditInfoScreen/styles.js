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
    publishContainer: { backgroundColor: '#530D89', width: width/1.94, height: width/9.3, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderColor: '#530D89', borderWidth: 0.2, alignSelf: 'center', marginTop: 30 },
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
    },
    inputContainer: {
        height: width / 2.3,
        width: width / 1.09,
        borderRadius: 15,
        padding: 12,
        flexDirection: 'row',
        // alignItems: 'flex-start',
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
});