import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Button } from 'native-base';
const { width, height } = Dimensions.get('window');
import TextDimensions from '../../resources/TextDimensions';
import Colors from '../../resources/Colors';


export default class HomeHeader extends React.Component {

  render() {
    const { title, showLogo, children, headerStyle, titleStyle,onPressNotification, onPressSearch,onPressMessage,user,onPressUser,onPressLanguage} = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../../resources/images/gc_logo.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={()=> onPressSearch()}>
            <Image style={styles.search} source={require('../../resources/images/ic_search.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onPressMessage()}>
            <Image style={styles.search} source={require('../../resources/images/ic_message.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onPressNotification()}>
            <Image style={styles.search} source={require('../../resources/images/ic_bell.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onPressLanguage()}>
            <Image style={styles.search} source={require('../../resources/images/ic_language.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onPressUser()}>
            <Image style={styles.userImage} source={user} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor:'white',
  },
  logoContainer: {
    height: width / 10.7,
    width: width / 8.3
  },
  logo: {
    height: width / 10.7,
    width: width / 8.3,
    marginStart: 5
  },
  search: {
    height: width / 10.71,
    width: width / 10.71
  },
  userImage: {
    height: width / 10.71,
    width: width / 10.71,
    borderRadius: width / 10.71,
    overflow:'hidden'
  },
  leftContainer: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: 12
  }
})