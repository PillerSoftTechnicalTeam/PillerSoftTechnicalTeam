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
    headerContainer: {
        backgroundColor: 'white',
        borderBottomLeftRadius: width / 17,
        borderBottomRightRadius: width / 17
    },
    headerInnerContainer: {
        flexDirection: 'row',
        marginStart: 10,
        marginEnd: 10,
        alignItems: 'center',
        height: width / 5,
    },
    userImg: {
        height: width / 13.39, width: width / 13.39
    },
    createPostContainer: {
        borderRadius: 18,
        borderColor: '#530D89',
        borderWidth: 0.2,
        height: width / 9.3,
        width: width / 1.19,
        marginStart: 8,
        justifyContent: 'center'
    },
    createLabel: {
        marginStart: 8, color: '#8E97B7'
    },
    streamingLabelContainer: {
        flexDirection: 'row',
        marginStart: 20, alignItems: 'center', marginTop: 15
    },
    streamLabel: {
        fontSize: 16, marginStart: 5, color: '#530D89', fontWeight: 'bold'
    },
    streamFlatListContainer: {
        marginStart: 15, marginEnd: 15, marginTop: 10,
    },
    joinContainer: {
        width: width / 5.95,
        height: width / 15,
        backgroundColor: '#CEBFDA',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    dataContainer: {
        marginTop: 10,
        paddingVertical: 12,
        marginHorizontal: 2,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 3,
        marginTop: 10,
        marginBottom: 5,
    },
    dataTitleLabel: {
        fontSize: 16,
        color: '#707070',
        marginTop: 5,
        fontWeight: 'bold'
    },
    dataBottomLeftContainer: {
        flexDirection: 'row',
        marginTop: 8,
        marginStart: 10,
        alignItems: 'center',
        height: width / 7.5
    },
    ellipse: {
        height: 13,
        width: 13,
        borderRadius: 13,
        backgroundColor: '#530D89',
    },
    postImg: { height: 75, width: 75,borderRadius:5 },
    adver: { height: width / 1.39, width: width / 1.03, marginTop: 8, borderRadius: 22, alignSelf: 'center' },
    advertiseLabel: { marginTop: 8, fontSize: 16, color: '#707070', fontWeight: 'bold' },
    suggestionLabel: { marginTop: 8, fontSize: 16, color: '#707070', fontWeight: 'bold' },
    addfriendContainer: { width: width / 3.75, height: width / 12.5, backgroundColor: '#530D89', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
    removeContainer: { width: width / 3.75, height: width / 12.5, backgroundColor: '#CEBFDA', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginStart: 5 },

});