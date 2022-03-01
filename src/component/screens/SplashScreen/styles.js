import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    splashImg: {
        // flex: 1,
        // //  flex: Platform.OS === 'ios' && 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // resizeMode:"contain" ,
        // width:Platform.OS != 'ios' && 200,
        ...Platform.select({
            ios: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            android: {
                flex: 1,
                // width:'100%',height:'100%',
                justifyContent: 'center',
                alignItems: 'center',
                resizeMode: "contain",
                // alignSelf:'center'

            },
        })
    }

});