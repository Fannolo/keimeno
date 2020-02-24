import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import {retrieveImages} from '../services';

export const BottomSheet = props => {
  const refRBSheet = useRef();

  props.openBottomSheet && refRBSheet.current.open();
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={300}
        duration={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView>
          <Text>
            {JSON.stringify(retrieveImages("pasta"))}
          </Text>
        </ScrollView>
      </RBSheet>
    </View>
  );
};
