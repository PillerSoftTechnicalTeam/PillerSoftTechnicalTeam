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
        width: width / 1.3,
        borderRadius: 8,
        // padding: 12,
        paddingHorizontal:5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        elevation: 5, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 2,alignItems:'center'
    },
   
});