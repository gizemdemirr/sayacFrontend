/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';
import ImagePicker from '../components/Ocr/ImagePicker';
import callGoogleVisionAsync from '../components/Ocr/callGoogleVisionAsync';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Ocr = () => {
  return (
    <View style={styles.container}>
      <ImagePicker onSubmit={callGoogleVisionAsync} />
    </View>
  );
};

export default Ocr;
