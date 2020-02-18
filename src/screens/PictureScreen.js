import React from 'react';
import {SafeAreaView, StyleSheet, Image, View, Dimensions} from 'react-native';
import {colors} from '../utils';
import RNTextDetector from 'react-native-text-detector';
import {CameraButton, TextBlocks} from '../components';
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

const perfectSize = create(PREDEF_RES.iphoneX.px)

export default class PictureScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  detectText = async () => {
    try {
      console.log(this.props.route.params.imageUri);
      const visionResp = await RNTextDetector.detectFromUri(
        this.props.route.params.imageUri,
      );
      console.log('visionResp', visionResp);
      this.setState({visionResp: visionResp});
    } catch (e) {
      console.warn(e);
    }
  };

  componentDidMount() {
    console.log('COMPONENT DID MOUNT run the OCR to recognize the text');
    this.detectText();
  }

  extractInformationFromText(){
    const {textBlocksContainer} = styles;
      return this.state.visionResp.map(item => {
        return item.lines.map(item => {
          return (
            <TextBlocks
              style={textBlocksContainer}
              width={perfectSize(item.bounding.width)}
              height={perfectSize(item.bounding.height)}
              left={perfectSize(item.bounding.left)}
              top={perfectSize(item.bounding.top)}
              onPress={() => {
                alert(item.text);
              }}
            />
          );
        });
      });
  }

  render = () => {
    const {imageUri} = this.props.route.params;
    const {image, container, imageContainer, textBlocksContainer} = styles;
    return (
      <View style={container}>
        <SafeAreaView>
        <View style={{flex: 1}}>

          {this.state.visionResp && this.extractInformationFromText()}
          </View>
          <View style={imageContainer}>
            <Image style={image} source={{uri: imageUri}} />
          </View>
        </SafeAreaView>
      </View>
    );
  };
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
    borderRadius: 30,
    zIndex: -1
  },
  textBlocksContainer: {
    position: 'absolute',
    zIndex: 1,
  },
});
