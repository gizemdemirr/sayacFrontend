import { View} from 'react-native';
import React from 'react';
import Dialog from "react-native-dialog";
import CustomInput from './CustomInput';
import axios from 'axios';


const UpdateDiyalog = ({open,homeTeam,setHomeTeam,handleClose}) => {

  return (
    <View>
      <Dialog.Container visible={open}>
        <Dialog.Title>Güncelleme</Dialog.Title>
        <Dialog.Description >   
            <View>
          <CustomInput label={"Abone No"} value={homeTeam.subNo ? homeTeam.subNo.toString():""}  setValue={(text)=>{
          setHomeTeam({...homeTeam,subNo:text})
        }}/>
          <CustomInput label="Sayac Model" value={homeTeam?.countModel} setValue={(text)=>{
          setHomeTeam({...homeTeam,countModel:text})
        }}/>
          <CustomInput label="Sayac Marka" value={homeTeam?.countMark} setValue={(text)=>{
          setHomeTeam({...homeTeam,countMark:text})
        }}/>
          <CustomInput label="Sayac No" value={homeTeam.subCountNo ? homeTeam.subCountNo.toString():"" } setValue={(text)=>{
          setHomeTeam({...homeTeam,subCountNo:text})
        }}/>
          <CustomInput label="Harcanan Metre Küp" value={homeTeam.spentMetreKup ? homeTeam.spentMetreKup.toString():""} setValue={(text)=>{
          setHomeTeam({...homeTeam,spentMetreKup:text})
        }}/> 
          </View>
        </Dialog.Description>
        <Dialog.Button  label="Update" onPress={ async ()=>{        
            
            await axios.put("http://10.110.213.66:9090/posts/"+`${homeTeam?.id}`,homeTeam)
            
        }}/>
        <Dialog.Button  label="Close" onPress={()=>{        
            handleClose()
        }}/>
       

      </Dialog.Container>  
    </View>
  )
}

export default UpdateDiyalog;