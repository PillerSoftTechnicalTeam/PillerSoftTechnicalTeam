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
    groupName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
    },
    groupType: {
        fontSize: 16,
        marginTop: 5
    },
    joinBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        width: 110,
        borderRadius: 8,
        backgroundColor: '#c7c7c7',
        paddingHorizontal: 18,
        alignItems: 'center'

    },
    join: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    invite: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    inviteBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        width: 110,
        borderRadius: 8,
        backgroundColor: '#530D89',
        paddingHorizontal: 18,
        alignItems: 'center'
    },
    groupList: {
        height: 40,
        width: 130,
        borderRadius: 8,
        backgroundColor: '#530D89',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabView: {
        width: '90%',
        alignSelf: 'center',
        height: 50,
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: '#F7F5F8',
        // backgroundColor: 'pink',
        marginBottom: 2,
        marginTop: 12
    },
    tabText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    groupDesc: {
        fontSize: 18,
        color: '#000000',
        marginTop: 20
    },
    memberPicture: {
        height: 50,
        width: 50,
        borderRadius: 8
    },
    groupPost: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 8
    },
    userName: {
        fontSize: 17,
        color: '#000000',
        fontWeight: 'bold'
    },
    postTitle: {
        fontSize: 17,
        color: '#000000'
    },
    reactBox: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: '#d4d4d4',
        borderBottomColor: '#d4d4d4'
    },
    commentBox: {
        width: '100%',
        height: 35,
        borderRadius: 30,
        backgroundColor: '#ebebeb',
        alignSelf: 'center',
        marginTop: 10,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    createPostField: {
        width: '100%',
        height: 40,
        flexDirection:'row',
        borderRadius: 30,
        borderWidth:1,
        borderColor: '#dbdbdb',
        alignSelf: 'center',
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom:5,

    }

});