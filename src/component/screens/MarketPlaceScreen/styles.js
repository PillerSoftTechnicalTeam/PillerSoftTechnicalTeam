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
     leftContainer: {
    // flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: 5,alignSelf:'flex-end'
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
    search:{height:40,width:40}
});