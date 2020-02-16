import React from 'react';
import {SafeAreaView, StyleSheet, Image, View} from 'react-native';
import {colors} from '../utils';
import RNTextDetector from "react-native-text-detector";

export default class PictureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  detectText = async () => {
    try {
      console.log(this.props.route.params.imageUri);
      const visionResp = await RNTextDetector.detectFromUri(this.props.route.params.imageUri);
      console.log('visionResp', visionResp);
      this.setState({visionResp:visionResp});
    } catch (e) {
      console.warn(e);
    }
  };

  componentDidMount() {
    console.log('COMPONENT DID MOUNT run the OCR to recognize the text');
    this.detectText();
  }

  render() {
    const {imageUri} = this.props.route.params;
    const {image, container,imageContainer} = styles;
    return (
      <View style={container}>
        <SafeAreaView>
          <View style={imageContainer}>
            
            <Image style={image} source={{uri: imageUri}} />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: colors.black,
  },
  imageContainer: {
      overflow: 'hidden',
      borderRadius:30
  }
});
