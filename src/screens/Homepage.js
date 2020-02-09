import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class HomePage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        cameraProps={{captureAudio: false}}
        style={{
          flex: 1,
        }}
      />
    );
  }
}
