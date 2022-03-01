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
     leftContainer: {
    flex: 0.45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: 5,
  },
    buttonOuterContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CEBFDA', height: 70, justifyContent: 'center' },
    publishContainer: {
        backgroundColor: '#A87DC9',
        width: width / 2.25,
        height: width/9.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#530D89',
        borderWidth: 0.2,
        // alignSelf: 'center',
        // marginTop: 30
    },
    search:{height:33,width:33}
});