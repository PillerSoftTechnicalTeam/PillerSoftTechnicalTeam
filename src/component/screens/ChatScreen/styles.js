import {
    StyleSheet, Dimensions
} from 'react-native';

// import Dimensions from 'Dimensions';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
// your brand's theme primary color
const brandColor = '#744BAC';

export default styles = StyleSheet.create({
    container: { flexDirection: 'row', marginStart: 20, marginEnd: 20, justifyContent: 'space-between', borderBottomColor: '#CEBFDA', borderBottomWidth: 0.89, height: 90, alignItems: 'flex-start' },
    user: { height: width / 3.6, width: width / 3.6, alignSelf: 'center', },
    camera: { height: width / 7.5, width: width / 7.5, position: 'absolute', top: width / 1.53, left: width / 1.66 },
    name: { flex: 1, textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold' },
    job: { flex: 1, textAlign: 'center', color: 'black', fontSize: 12, fontWeight: 'bold', marginTop: 10, },
    msgContainer: {
        backgroundColor: '#530D89', width: width / 2.16, height: width / 9.3, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderColor: '#530D89',
        borderWidth: 0.2, alignSelf: 'center', flexDirection: 'row'
    },
    editContainer: {
        width: width / 3.5, height: width / 9.3, alignItems: 'center',
        justifyContent: 'center', borderRadius: 20, borderColor: '#530D89', borderWidth: 0.2,
        alignSelf: 'center', flexDirection: 'row'
    },
    dotContainer: { backgroundColor: '#530D89', width: width / 9.3, height: width / 9.3, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderColor: '#530D89', borderWidth: 0.2, alignSelf: 'center', },
    friendNum:{ fontSize: 14, fontWeight: 'bold', marginStart: 20, color: '#707070', marginTop: 20 },
    inputContainer: {
        height: width / 2.3,
        width: width / 1.09,
        // padding: 12,
        // flexDirection: 'row',
        // alignItems: 'flex-start',
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        backgroundColor: '#F5F5F5',
        shadowOpacity: 0.2,
        shadowRadius: 2,justifyContent:'center'
    }
});