import {
    StyleSheet, Dimensions
} from 'react-native';
const { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 632,
        justifyContent: 'center',
    },
    inputContainer: {
        height: width / 2.3,
        width: width / 1.09,
        borderRadius: 15,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    emoji: {
        height: 16,
        width: 16,
        position: 'absolute',
        end: 20,
        top: 20
    },
    fileContainer: {
        marginStart: 20,
        backgroundColor: '#CEBFDA',
        width: width / 3,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#530D89',
        borderWidth: 0.2
    },
    publishContainer: {
        backgroundColor: '#530D89',
        width: width / 2.04,
        height: width/9.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#530D89',
        borderWidth: 0.2,
        alignSelf: 'center',
        marginTop: 30
    }
});