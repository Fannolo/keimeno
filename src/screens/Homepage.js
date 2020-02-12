import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {CameraButton, TextBlocks} from '../components';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.warn('takePicture ', data);
    }
  };

  textRecognized = object => {
    const {textBlocks} = object;
    this.setState({textBlocks});
    console.log(textBlocks);
  };

  render() {
    const {cameraButtonContainer, camera, textBlocksContainer} = styles;
    return (
      <>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          cameraProps={{captureAudio: false}}
          style={camera}
          onTextRecognized={this.textRecognized}
        />
        <TextBlocks style={textBlocksContainer} />
        <SafeAreaView style={cameraButtonContainer}>
          <CameraButton onPress={this.takePicture.bind(this)} />
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
  textBlocksContainer: {
    position: 'absolute',
  },
});
