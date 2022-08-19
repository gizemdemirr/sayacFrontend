/* eslint-disable prettier/prettier */
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import React, {useState,useEffect} from 'react';
import {Button, Image, View, Text, PermissionsAndroid} from 'react-native';
import Otp from './Otp';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImagePickerComponent = ({onSubmit}) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('postId').then(async res => {
      const AsyncStorageValue = JSON.parse(res);
      console.log('asyncvalue', AsyncStorageValue);
      let ocradd = {
        endeks: text,
        post: {id: AsyncStorageValue},
      };
      console.log('deneme', ocradd);
      await axios.post('http://10.110.213.34:9090/ocr/addendeks', ocradd);
    });
  }, [text]);

  const pickImage = async () => {
    let source = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    if (!source.didCancel) {
      setImage(source.assets[0].uri);
      //   console.log("path"+source.assets[0].uri);
      const responseData = await onSubmit(source.assets[0].base64);
      //   console.log("base64"+source.assets[0].base64);
      setText(responseData);
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        let source = launchCamera({
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: true,
          cameraType: 'back',
        });
        if (!(await source).didCancel) {
          setImage((await source).assets[0].uri);
          const responseDataCamera = await onSubmit(
            (
              await source
            ).assets[0].base64,
          );

          setText(responseDataCamera);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        <Button title="Camera" onPress={requestCameraPermission} />

        {image && (
          <Image
            source={{uri: image}}
            style={{width: 400, height: 300, resizeMode: 'contain'}}
          />
        )}
        <Text>{text}</Text>
      </View>
      <Otp value={text} />
    </View>
  );
};
export default ImagePickerComponent;
