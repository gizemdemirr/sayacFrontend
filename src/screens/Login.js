import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  View,
  StyleSheet,
  Button,
  useWindowDimensions,
  Pressable,
  Text,
} from 'react-native';
import anime from '../../logo.json';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const Login = () => {
  const {height} = useWindowDimensions();
  const [userTeam, setUserTeam] = useState({
    userName: '',
    password: '',
  });

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://10.110.213.34:9090/users/login',
        userTeam,
      );

      AsyncStorage.setItem('user', JSON.stringify(response.data));
      AsyncStorage.setItem('userId', JSON.stringify(response.data.id));
      console.warn('Hoşgeldiniz');
      navigation.navigate('HomeStack');
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <View style={styles.view}>
      <LottieView
        style={[styles.logo, {height: height * 0.3}]}
        source={anime}
        autoPlay
        loop
      />
      {/* <ImageLoader source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" /> */}

      <CustomInput
        placeholder="Username"
        value={userTeam.userName}
        setValue={text => {
          setUserTeam({...userTeam, userName: text});
        }}
        right={<TextInput.Icon name="account" color={'black'} />}
      />

      <CustomInput
        placeholder="Password"
        value={userTeam.password}
        setValue={text => {
          setUserTeam({...userTeam, password: text});
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

      <View style={styles.button}>
        <Button
          title="LOGİN"
          onPress={() => {
            handleLogin();
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text>Don't have an account yet? Why not register?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxHeight: 300,
    maxWidth: 300,
    margin: 20,
    marginRight: 50,
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'column',
    margin: 30,
  },
});
export default Login;
