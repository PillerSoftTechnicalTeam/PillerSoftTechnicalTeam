import React, { Component  } from 'react';
import { View, Text, StyleSheet, Image,Dimensions,} from 'react-native';
import GLOBAL from '../../constants/ApiConstants';
import { Audio, Video } from 'react-native-video';
const { width } = Dimensions.get('window');

class VideoComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // screenWidth: Dimensions.get("window").width,
            mute: false,
            shouldPlay: true,
        };
    }
    // _handleVideoRef = component => {
    //     const playbackObject = component;
    //   }
      
      
    render()
    {
     
        return(
            // <View>
            <Video 
            source = {{uri : GLOBAL.BASE_URL + "/UploadedVideos/" +  this.props.PostedObjectsm} }
            ref={(ref) => {
              this.player = ref
            }} 
            // rate={1.0}
            // volume={1.0}
            //  isMuted={false}
            
            // useNativeControls
            // isLooping = {false}
            
            style={{width: width - 50,
                 height: 300 }}
            />
             
            // </View>
        );
    }
}

export default VideoComponent;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
  });