import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Button } from 'native-base';
const { width, height } = Dimensions.get('window');
import TextDimensions from '../../resources/TextDimensions';
import Colors from '../../resources/Colors';


export default class FieldContainer extends React.Component {

  render() {
    const { title, showLogo, children, isReg } = this.props;
    return (
      <View>
        {/* <View style={{
        height: width/1.875,
        width: width/1.25,
        justifyContent: 'center', alignItems: 'center',
      }}>
        <ImageBackground
          style={{
            height: '100%',
            width: '100%'
          }}
          source={require('../../resources/images/dark.png')} >
          <View style={{
            justifyContent: 'center', alignItems: 'center',
            position: 'absolute', top: 200 / 4, left: 300 / 4 - 16,backgroundColor:'red'
          }}>

            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18
            }}>{title}</Text>
          </View>
        </ImageBackground>
        <Image
          style={{
            position: 'absolute', bottom: -10,
            width: '100%',
            height: '100%',
          }}
          source={require('../../resources/images/shadow.png')} >

        </Image>

      </View> */}

        <View style={styles.outerContainer}>
          {!isReg ? <ImageBackground style={styles.darkImg} source={require('../../resources/images/darkThired.png')} >
            <View style={{ paddingTop: 60 }}>
              <ImageBackground style={styles.darkImg} source={require('../../resources/images/darkSecond.png')} >
                <View style={{ paddingTop: 70 }}>
                  <ImageBackground style={styles.darkImg} source={require('../../resources/images//darkBg.png')} >
                    {children}
                  </ImageBackground>
                </View>
              </ImageBackground>
            </View>
          </ImageBackground> :
            <ImageBackground style={styles.darkImg} source={require('../../resources/images//darkBg.png')} >
              <View style={{ paddingTop: 60 }}>
                <ImageBackground  style={styles.darkImg} source={require('../../resources/images//darkBg.png')} >
                  {children}

                  <View style={{ paddingTop: 70 }}>
                    <ImageBackground style={styles.darkImg} source={require('../../resources/images//darkBg.png')} >
                    </ImageBackground>
                  </View>
                </ImageBackground>
              </View>
            </ImageBackground>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkImg: {
    height: '100%',
    width: '100%',
  }
})