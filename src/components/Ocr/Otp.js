
import { View,Text, TextInput,StyleSheet} from 'react-native';
import React from 'react';

const Otp = ({value}) => {
  return (
    <View style={styles.body}>
        <View style={styles.contain}>
    <View style={styles.View}>
      <TextInput
      keyboardType='numeric'
      maxLength={5}
      value={value}
      style={styles.textInput}
      placeholder="00000"
      />
    </View>
    <Text style={styles.text}>m³</Text>
    </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',

    },
    contain:{
        flexDirection:'row',
        alignItems:'center',

    },
    textInput:{
        backgroundColor:'white',
        width:'90%',
        fontSize:30,
        letterSpacing:25,
        color:'black',
        textAlign:'center',
        borderRadius:5,
        padding:5,
        margin:5,


    },
    View:{
       
        alignItems:'center',
        borderRadius:10,
        borderColor:'black',
        borderWidth:2,
        width:'80%',

    },
    text:{
        marginLeft:10,
        fontSize:23,
        color:'black',
        fontWeight:'bold',

    }
})