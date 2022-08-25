/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {Portal} from 'react-native-paper';

const CustomButton = ({onPress, text}) => {
  return (
    <Portal.Host>
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Portal.Host>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    width: '%70',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CustomButton;
