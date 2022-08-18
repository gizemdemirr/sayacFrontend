import React, { useState,useEffect } from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog"
import CustomInput from "../components/CustomInput";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable,IconButton, Colors} from 'react-native-paper';
import axios from 'axios';
import CustomDialog from "../components/CustomDialog";
import UpdateDiyalog from "../components/UpdateDialog";



const Home= ()=> {
    const [homeTeam,setHomeTeam]=useState({
        subNo:"",
        subCountNo:"",
        countModel:"",
        countMark:"",
        spentMetreKup:"",
        
        
    })
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [data,setData]=useState([])
    const [selectedData,setSelectedData]=useState({})
    const navigation = useNavigation();
    const [selectUpdate,setSelectUpdate]=useState({})
    const [show,setShow]=useState(false);
   

     const showDialog = () => {
    setVisible(true);
     };
     const openDialog = ()=> {
      setOpen(true);
     }
     const handleSend = () => {
    setVisible(false);
    };
    const showUpdate =()=>{
      setShow(true)
    }
    const handleClose =()=>{
      setShow(false)
    }
    
    const listSend = async ()=>{
                          
                              await AsyncStorage.getItem("user").then(async(res) =>{
                                const AsyncStorageValue = JSON.parse(res);
                                
                              let deneme =  {
                                subNo:homeTeam.subNo,
                                subCountNo:homeTeam.subCountNo,
                                countModel:homeTeam.countModel,
                                countMark:homeTeam.countMark,
                                spentMetreKup:homeTeam.spentMetreKup,
                                user:{id:AsyncStorageValue.id}
                              }
                              
                          await axios.post("http://10.110.213.34:9090/posts/addCount",deneme)             
                              
                               
                           console.warn("tmm")  
                                    
    })
    }

  
    useEffect( () => {
      AsyncStorage.getItem("userId").then((respo)=>{
        const value = JSON.parse(respo);
        axios.get("http://10.110.213.34:9090/posts/getUserIdCount?userId="+`${value}`).then((res)=> {
          
          setData(res.data)
        })
      })  
    },[data])
  return(
        <View style={styles.container}>
      <Button title="Add Table" onPress={showDialog} />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Listeye Ekle</Dialog.Title>
        <Dialog.Description >   
            <View>
          <CustomInput placeholder="Abone No" value={homeTeam.subNo}  setValue={(text)=>{
          setHomeTeam({...homeTeam,subNo:text})
        }}/>
          <CustomInput placeholder="Sayac Model" value={homeTeam.countModel} setValue={(text)=>{
          setHomeTeam({...homeTeam,countModel:text})
        }}/>
          <CustomInput placeholder="Sayac Marka" value={homeTeam.countMark} setValue={(text)=>{
          setHomeTeam({...homeTeam,countMark:text})
        }}/>
          <CustomInput placeholder="Sayac No" value={homeTeam.subCountNo} setValue={(text)=>{
          setHomeTeam({...homeTeam,subCountNo:text})
        }}/>
          <CustomInput placeholder="Harcanan Metre Küp" value={homeTeam.spentMetreKup}  setValue={(text)=>{
          setHomeTeam({...homeTeam,spentMetreKup:text})
        }}/> 
          </View>
        </Dialog.Description>
        <Dialog.Button label="Send" onPress={()=>{
            
            listSend()
  
        }}/>
        <Dialog.Button label="Close" onPress={()=>{
          
            handleSend() //Close butonu 0laması için
                                homeTeam.subNo="", 
                                homeTeam.subCountNo="",
                                homeTeam.countModel="",
                                homeTeam.countMark="",
                                homeTeam.spentMetreKup=""
        }}/>

      </Dialog.Container>  
      <DataTable >
        <DataTable.Header >
        <DataTable.Title style={styles.title} numeric>User ID</DataTable.Title>
          <DataTable.Title style={styles.title} >Abone No</DataTable.Title>
          <DataTable.Title  style={styles.title}>Model</DataTable.Title>
          <DataTable.Title style={styles.title} >Marka</DataTable.Title>
          <DataTable.Title style={styles.title}>Delete</DataTable.Title>
          <DataTable.Title style={styles.title}>Update</DataTable.Title>
          
          
        </DataTable.Header>
        {
            data.map((item)=>{
            
            return ( 
            <Pressable style={({pressed}) => [
              {
                backgroundColor:pressed ? 'rgba(229, 183, 96, .4)' : 'white'
              }, styles.tableRow
            ]} onPress={()=>{openDialog()
              setSelectedData({subCountNo:item.subCountNo,spentMetreKup:item.spentMetreKup,metreKup:"5.56"})
            }} key={item.id} >  
            <DataTable.Row  >
            <DataTable.Cell style={styles.title} >{item.id}</DataTable.Cell>
            <DataTable.Cell style={styles.title} >{item.subNo}</DataTable.Cell>
            <DataTable.Cell style={styles.title} >{item.countMark}</DataTable.Cell>
            <DataTable.Cell style={styles.title} >{item.countModel}</DataTable.Cell>
            <DataTable.Cell style={styles.title} > 
            <View style={styles.actionCell}>
            <IconButton
              icon="delete"
              color={Colors.red500}
              size={20}
              onPress={ async ()=>{
                try {

                  await axios.delete("http://10.110.213.34:9090/posts/"+`${item.id}`);
                    
                }catch(error) {
                    console.warn(error)
                }
            }}
              />
           </View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.title} >
            <View style={styles.actionCell}>
            <IconButton
              icon="update"
              color={Colors.blue400}
              size={20}
              onPress={ ()=>{
                showUpdate()
                setSelectUpdate(item)
                
            }}
              />
           </View>
            </DataTable.Cell>
            </DataTable.Row>
            </Pressable>
            )
            
            })
            
              
         } 
      </DataTable>
     

       <CustomDialog disabled={true} subCountNo={selectedData.subCountNo} spentMetreKup={selectedData.spentMetreKup}  metreKup={selectedData.metreKup} open={open} handleClose={()=>{
       
       setOpen(false);}
        }/>
        <UpdateDiyalog homeTeam={selectUpdate} open={show} handleClose={handleClose} setHomeTeam={setSelectUpdate} />
          
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    title:{
    justifyContent:"flex-start",   
    },
    center:{
     justifyContent:"center",   
    },
    tableRow:{
      height: 60
    }
  });
export default Home;