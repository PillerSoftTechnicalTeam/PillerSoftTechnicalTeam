import React, {Component} from 'react';
import {
    View,
    ActivityIndicator,
    Modal,StyleSheet
} from 'react-native'
import PropTypes from 'prop-types';

export default class Loader extends Component {
    render () {
        const { loading ,loaderColor} = this.props;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => {console.log('close modal')}}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size={'small'} color={loaderColor}
                         animating={loading} />
                    </View>    
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
  modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
       activityIndicatorWrapper: {
        // backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});

Loader.propTypes = {
  navigation: PropTypes.object.isRequired,
};
