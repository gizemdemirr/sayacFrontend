import { View,StyleSheet} from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';


const CustomInput = ({label,value, setValue, placeholder,secureTextEntry,disabled,right}) => {

  return (
    <View style={styles.container}>
      <TextInput 
      
      label={label}
      disabled={disabled}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      right={right}
      />
    </View>
  )
}
const styles = StyleSheet.create ({
    container:{
        backgroundColor:"white",
        width:250,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#e8e8e8',
        marginVertical: 5,
       
    },
    input:{
    
      
    },
})
export default CustomInput