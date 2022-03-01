import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,Dimensions } from 'react-native';
import GLOBAL from '../../constants/ApiConstants';

export default class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        screenWidth: Dimensions.get("window").width
    };
}

render() {
    return (

        <Image
            style={{
                width: this.state.screenWidth -50,
                height: 300,
                marginTop: 10,

            }}
            source={{ uri: GLOBAL.BASE_URL +  '/UploadedImages/' + this.props.PostedObjectsm }}

        />
    );
}
}