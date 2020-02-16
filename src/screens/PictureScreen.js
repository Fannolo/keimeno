import React from 'react';
import {SafeAreaView, StyleSheet, Image, View} from 'react-native';
import {colors} from '../utils';

export default class PictureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT');
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
