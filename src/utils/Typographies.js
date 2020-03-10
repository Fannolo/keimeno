import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export const Typographies = {
  white: '#fff',
  black: '#000',
};

export const Title = props => {
  return <Text style={[props.style, styles.title]}>{props.text}</Text>;
};

export const Subtitle = props => {
  return <Text style={[props.style, styles.subtitle]}>{props.text}</Text>;
};

export const EditableTitle = props => {
  return (
    <TextInput
    style={[props.style, styles.title]}
      value={props.text}
      onChangeText={props.onChangeText ? props.onChangeText() : null}
      autoFocus
      onBlur={props.onBlur ? props.onBlur() : null}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
  },
  subtitle: {
    fontSize: 14,
  },
});
