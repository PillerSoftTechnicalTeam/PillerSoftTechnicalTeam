import {
    StyleSheet, Dimensions
} from 'react-native';
const { width,height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 632,
        justifyContent: 'center',
    },
    mainContainer: {
        // backgroundColor: 'red',
        paddingHorizontal: 15,
        flex: 1
    },
    recentListMainContainer: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between',
        // backgroundColor:'red'
    },
    activeMainContainer: {
        width: 55,
        height: 55,
        resizeMode: 'cover',
        borderRadius: 30,
        marginTop: 5,
        marginRight: 12
    },
    recentListLeftImage: {
        width: 55,
        height: 55,
        resizeMode: 'cover',
        borderRadius: 30
    },
    rightContainer: {
        marginStart: 10,
        justifyContent: 'center',
        width: '76%',
        // backgroundColor: 'green'
    },
    nameRecentList: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    },
    dateContainer: {
        color: 'black',
        fontSize: 12,
        marginLeft: 15,
        fontWeight: '500'
    },
    lastMsgRecentList: {
        color: 'black',
        fontSize: 13,
        fontWeight: '500'
    },
    headingText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    onlineView: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: .5,
        borderColor: 'white',
        backgroundColor: 'green',
        position: 'absolute',
        right: 4,
        bottom: 3,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems:'center',
        height: 40,
        borderRadius: 25,
        marginBottom: 10,
        backgroundColor: '#D3D3D3',
    },
    inputFieldStyle: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        borderRadius: 25,
        width: '90%',
        height: 40,
        paddingHorizontal: 15,
    },
    crossStyle: {
        width:12,
        height:12,
        resizeMode:'contain'
    },
    noChatText:{
        fontSize:16,
        marginTop:height/2-70,
        fontWeight:'bold',
        color:'black',
        alignSelf:'center',
        position:'absolute',
    }
});