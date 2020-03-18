import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {CameraButton, TextBlocks} from '../components';
import CameraRoll from '@react-native-community/cameraroll';
import {CameraKitCamera} from 'react-native-camera-kit';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textBlocks: null,
      textRecognition: false,
    };
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.capture(true);
      //console.warn('takePicture ', data);
      //CameraRoll.saveToCameraRoll(data.uri, 'photo');
      this.props.navigation.navigate('PictureScreen', {imageUri: data.uri});
    }
  };

  textRecognized = object => {
    const {textBlocks} = object;
    this.setState({textBlocks: textBlocks});
  };

  render() {
    const {cameraButtonContainer, camera, textBlocksContainer} = styles;
    return (
      <>
        <CameraKitCamera
          ref={ref => (this.camera = ref)}
          style={camera}
          cameraOptions={{flashMode: 'off', focusMode: 'on', zoomMode: 'off'}}
        />
        {/* <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          cameraProps={{captureAudio: false}}
          style={camera}
          //onTextRecognized={this.state.textRecognition ? this.textRecognized : ()=>console.log("Text Recognition not used")}
        /> */}
        {this.state.textBlocks &&
          this.state.textBlocks.map(items => {
            return (
              <TextBlocks
                style={textBlocksContainer}
                width={items.bounds.size.width}
                height={items.bounds.size.height}
                left={items.bounds.origin.x}
                top={items.bounds.origin.y}
                onPress={() => {
                  console.log(items.value);
                }}
              />
            );
          })}
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
  }
});
