import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import {colors} from '../utils';
import RNTextDetector from 'react-native-text-detector';
import {TextBlocks, BottomSheetComponent} from '../components';
import {create} from 'react-native-pixel-perfect';
import {searchImages} from '../services';

const designResolution = {
  width: 1065.1840490798,
  height: 2084.9202453988,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);
export default class PictureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: 'placeholder',
      dimensions: {
        width: null,
        heiht: null,
      },
      pan: new Animated.ValueXY(),
      openBottomSheet: false,
    };
    this.panResponder = PanResponder.create({
      //Step 2
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.dy <= 120) {
          Animated.event([
            null,
            {
              dy: this.state.pan.y,
            },
          ])(event, gestureState);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(
          //Step 1
          this.state.pan, //Step 2
          {toValue: {x: 0, y: 0}}, //Step 3
        ).start();
        if (gesture.dy >= 80) {
          Animated.spring(
            //Step 1 giannilupo
            this.state.pan, //Step 2
            {toValue: {x: 0, y: 900}}, //Step 3
          ).start();
          this.setState({openBottomSheet: false});
          setTimeout(() => props.navigation.goBack(), 300);
        }
      }, //Step 4
    });
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT run the OCR to recognize the text');
    this.detectText();
  }

  perfectSize = () => {
    if (this.state.dimensions.width && this.state.dimensions.heiht) {
      console.log(
        'Height and width perfect size',
        this.state.dimensions.heiht,
        this.state.dimensions.width,
      );
      return create({
        width: this.state.dimensions.width,
        height: this.state.dimensions.height - 44 - 34,
      });
    }
  };

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

  extractInformationFromText() {
    console.log('Extracting Text blocks');
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
            onPress={async () => {
              // if (!this.state.mocks) {
              let results = await searchImages(item.text)
                .then(res => {
                  this.setState({
                    items: results,
                  });
                  // }
                  this.setState({title: item.text});
                  this.setState({openBottomSheet: true});
                })
                .catch(error => {
                  this.props.navigation.navigate('ErrorScreen');
                });
            }}
          />
        );
      });
    });
  }

  _onCloseEnd = () => {
    // if (this.state.openBottomSheet) {
    //   this.setState({openBottomSheet: false, items: null});
    // }
  };

  _onLayout = event => {
    var {width, height} = event.nativeEvent.layout;
    console.log('Height and width', height, width);
    this.setState({dimensions: {width, height}});
    console.log('dimensions: ', this.state.dimensions);
  };

  render = () => {
    const {imageUri} = this.props.route.params;
    const {image, container, imageContainer, textBlocksContainer} = styles;
    return (
      <View style={[container]}>
        <SafeAreaView>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={this.state.pan.getLayout()}>
            <View onLayout={this._onLayout}>
              <View style={{flex: 1}}>
                {this.state.visionResp &&
                  this.state.dimensions.width &&
                  this.state.dimensions.height &&
                  this.extractInformationFromText()}
              </View>
              <View style={[imageContainer]}>
                <Image style={image} source={{uri: imageUri}} />
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>
        {this.state.items && (
          <BottomSheetComponent
            items={this.state.items}
            title={this.state.title}
            onCloseEnd={this._onCloseEnd()}
            subtitle={this.state.subtitle}
            openBottomSheet={this.state.openBottomSheet}
          />
        )}
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
    zIndex: -1,
  },
  textBlocksContainer: {
    position: 'absolute',
    zIndex: 1,
  },
});
