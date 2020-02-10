import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {CameraButton} from '../components/camera/CameraButton';

export default class HomePage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const {cameraButtonContainer, camera} = styles;
    return (
      <>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          cameraProps={{captureAudio: false}}
          style={camera}
        />
        <SafeAreaView style={cameraButtonContainer}>
          <CameraButton />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  cameraButtonContainer: {
    zIndex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    zIndex: 0,
  },
});
