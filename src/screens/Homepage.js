import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {CameraButton} from '../components/camera/CameraButton';

export default class HomePage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const {cameraButton, camera} = styles;
    return (
      <>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          cameraProps={{captureAudio: false}}
          style={camera}
        />
        <CameraButton style={cameraButton} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  cameraButton: {zIndex: 1},
  camera: {
    flex: 1,
    zIndex: 0,
  },
});
