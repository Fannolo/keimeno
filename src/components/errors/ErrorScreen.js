import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {Title} from '../../utils';

export class ErrorScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Title style={styles.titleStyle} text={'ERROR'} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
  },
  titleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
