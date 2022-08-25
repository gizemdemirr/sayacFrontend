import React, {useState} from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import CustomInput from '../components/CustomInput';
import axios from 'axios';

const Register = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [registerTeam, setRegisterTeam] = useState({
    name: '',
    surname: '',
    address: '',
    userName: '',
    password: '',
  });
  const handleClick = async () => {
    try {
      await axios.post('http://10.110.213.66:9090/users/addUser', registerTeam);
      console.warn('Kayıt Başarılı');
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeAreaView style={styles.View}>
      <CustomInput
        placeholder="Name"
        value={registerTeam.name}
        setValue={text => {
          setRegisterTeam({...registerTeam, name: text});
        }}
        right={<TextInput.Icon name="text-account" color={'black'} />}
      />
      <CustomInput
        placeholder="Surname"
        value={registerTeam.surname}
        setValue={text => {
          setRegisterTeam({...registerTeam, surname: text});
        }}
        right={<TextInput.Icon name="text-account" color={'black'} />}
      />
      <CustomInput
        placeholder="Username"
        value={registerTeam.userName}
        setValue={text => {
          setRegisterTeam({...registerTeam, userName: text});
        }}
        right={<TextInput.Icon name="account" color={'black'} />}
      />
      <CustomInput
        placeholder="Password"
        value={registerTeam.password}
        setValue={text => {
          setRegisterTeam({...registerTeam, password: text});
        }}
        secureTextEntry={showPassword}
        right={
          <TextInput.Icon
            name="eye"
            color={'black'}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
      />
      <CustomInput
        placeholder="Address"
        value={registerTeam.address}
        setValue={text => {
          setRegisterTeam({...registerTeam, address: text});
        }}
        right={<TextInput.Icon name="home" color={'black'} />}
      />
      <View style={styles.checkbox}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <TouchableOpacity
          onPress={() => Linking.openURL('https://tein.com.tr/index.html')}>
          <Text>Kullanım ve Gizlilik Şartları'nı okudum.</Text>
          <Text>Kabul ediyorum.</Text>
        </TouchableOpacity>
      </View>
      <Button
        disabled={!checked}
        onPress={() => {
          handleClick();
        }}>
        Register
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Register;
