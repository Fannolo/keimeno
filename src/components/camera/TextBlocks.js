import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {colors} from '../../utils';

export const TextBlocks = props => {
  const mock = {
    bounds: {
      origin: {
        y: 472.9063720703125,
        x: 311.25,
      },
      size: {
        width: 100.0625,
        height: 20.123595237731934,
      },
    },
  };
  const {width, height} = mock.bounds.size;
  const {x, y} = mock.bounds.origin;
  const {textBlocks,container} = styles;
  return (
    <View style={container} width={width} height={height} top={y} left={x}>
      <TouchableOpacity style={[textBlocks, props.styles]}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textBlocks: {
    borderRadius: 5,
    borderColor: colors.white,
    color: colors.white,
    borderWidth: 1,
    height: "100%",
    width: "100%"
  },
  container: {
      position: "absolute"
  }
});
