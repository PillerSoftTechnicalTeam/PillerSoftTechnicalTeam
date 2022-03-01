import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Button } from 'native-base';
const { width, height } = Dimensions.get('window');
import TextDimensions from '../../resources/TextDimensions';
import Colors from '../../resources/Colors';


export default class Header extends React.Component {

  render() {
    const { title,headerStyle, titleStyle, tapOnBack,isAuth } = this.props;
    return (
      <View>
        <TouchableOpacity style={[styles.container, headerStyle]} onPress={() => tapOnBack()}>
          <ImageBackground style={styles.darkImg} source={require('../../resources/images/loginTopDark.png')} >
            <View style={[styles.titleContainer, titleStyle]}>
              {isAuth ?<Text style={styles.title}>{title}</Text>:
              <Image style={{height:15,width:50}} source={require('../../resources/images/ic_back.png')}/>}
            </View>
          </ImageBackground>
          <Image style={styles.img} source={require('../../resources/images/shadow.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: width / 2.3,
    width: width / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkImg: {
    height: '100%',
    width: '100%'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 200 / 5,
    left: '5%'
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  img: {
    position: 'absolute',
     bottom: -5,
    width: '100%',
    height: '100%',
    right: 2
  },
  touchSearch: {
    width: height / 14.5,
    justifyContent: 'center',
    height: '100%',
    marginEnd: width / 18.75
  },
  viewSearchContainer: {
    height: '100%',
    width: width,
    position: 'absolute',
    end: 0,
    flexDirection: 'row',
    backgroundColor: Colors.BLACK,
    alignItems: 'center'
  },
  imageSearch: {
    height: width / 18.75,
    width: width / 18.75,
    resizeMode: 'contain',
    alignSelf: 'center',

  },
  textInputSearch: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    paddingStart: 10,
    paddingEnd: 10
  },
  touchMic: {
    justifyContent: 'center',
    paddingEnd: 10
  },
  imageMic: {
    height: 16,
    width: 16
  },

  textNoDataFound: {
    fontSize: TextDimensions.TEXT_XL,
    color: 'white',
    textAlign: 'center',
    marginTop: height / 3
  },
})