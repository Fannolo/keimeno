import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {colors} from '../../utils';

export const TextBlocks = props => {
  // const mock = {
  //   bounds: {
  //     origin: {
  //       y: 472.9063720703125,
  //       x: 311.25,
  //     },
  //     size: {
  //       width: 100.0625,
  //       height: 20.123595237731934,
  //     },
  //   },
  // };
  const {textBlocks, container} = styles;
  return (
    <View
      style={container}
      width={props.width}
      height={props.height}
      top={props.top}
      left={props.left}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[textBlocks, props.styles]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textBlocks: {
    borderRadius: 5,
    borderColor: colors.white,
    color: colors.white,
    borderWidth: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'absolute',
  },
});
