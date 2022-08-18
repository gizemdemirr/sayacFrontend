import React, { useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import CustomInput from "./CustomInput";

const CustomDialog =({data,open,handleClose,subCountNo,spentMetreKup,metreKup,disabled}) => {
  

  return (
   
    <Dialog.Container visible={open}>
    <Dialog.Title>Detay</Dialog.Title>
    <Dialog.Description >   
        <View>
      <CustomInput disabled={disabled} placeholder="Sayac No"  value={"Sayac No:"+subCountNo}  />
      <CustomInput disabled={disabled} placeholder="Harcanan Metre Küp" value={"Harcanan Metre Küp:"+spentMetreKup} />
      <CustomInput disabled={disabled} value={"Birim Metre Küp Fiyatı TL:"+metreKup} />
      </View>
    </Dialog.Description>
    <Dialog.Button label="Hesapla" onPress={()=>{
        if(metreKup!==null && metreKup!==undefined && spentMetreKup!==null && spentMetreKup!==undefined)
        alert(`${(spentMetreKup*metreKup)}TL`)
        

    }}/>
    <Dialog.Button label="Kapat" onPress={()=>{
        handleClose()
    }}/>
  </Dialog.Container>
  );
}

export default CustomDialog;