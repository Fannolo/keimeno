import React from 'react';
import {TouchableOpacity, StyleSheet, TouchableHighlight} from 'react-native';
import {colors} from '../../utils';

export const CameraButton = (props) => {
    const {cameraButton} = styles;
  return <TouchableOpacity style={[cameraButton,props.style]} onPress={props.onPress}></TouchableOpacity>;
};

const styles = StyleSheet.create({
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: colors.white,
    color: colors.white,
    borderWidth: 4
  },
});
