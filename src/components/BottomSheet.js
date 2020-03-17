import React, {useRef} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
//import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import {Title, Subtitle, EditableTitle} from '../utils';
import MasonryList from 'react-native-masonry-list';

export const BottomSheetComponent = props => {
  const refRBSheet = useRef();

  /**Method for returning all the images containing all the food informations**/
  const renderImages = () => {
    let arrayUris = [];
    props.items.map(item => {
      arrayUris.push({uri: item.thumbnailUrl});
    });
    return <MasonryList images={arrayUris}/>;
  };

  /**This Method renders the informations inside the bottom sheet**/
  const renderInner = () => (
    <View height={'100%'}>
      <View style={styles.panel}>
        <Title style={[styles.panelTitle]} text={props.title} />
        <Subtitle text={props.subtitle} style={[styles.panelSubtitle]} />
        <View style={[styles.imageContainer]}>{renderImages()}</View>
      </View>
    </View>
  );

  /**This Method renders the header of the bottom sheet**/
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  /**This is a hotfix that allows the user to snap from the very beginning**/
  const snapTo = snapPoint => {
    refRBSheet.current.snapTo(snapPoint);
    refRBSheet.current.snapTo(snapPoint);
  };
  props.openBottomSheet && snapTo(1);

  return (
    <BottomSheet
      snapPoints={[0, '60%', '90%']}
      ref={refRBSheet}
      onCloseEnd={props.onCloseEnd}
      renderContent={renderInner}
      renderHeader={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    zIndex: -1,
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    flex: 1,
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: '#000000',
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 30,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 27,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
});

export const Images = props => {
  return <Image source={{uri: props.source}} />;
};
