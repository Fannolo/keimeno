import React from 'react';
import {TouchableOpacity, StyleSheet, TouchableHighlight} from 'react-native';
import colors from '../../utils/Colors';

export const CameraButton = (props) => {
    const {cameraButton} = styles;
  return <TouchableOpacity style={[cameraButton,props.style]} onPress={props.onPress}></TouchableOpacity>;
};

const styles = StyleSheet.create({
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 15,
    borderColor: colors.white,
    color: colors.white,
    backgroundColor: colors.white,
    borderWidth: 4
  },
});
