import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from './screens/Home';
import Kacak from './screens/kacak';
import Ocr from './screens/Ocr';
import Tasarruf from './screens/tasarruf';
import Notifi from './screens/notifi';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const HomeStack = () =>{
  return(
    <Tab.Navigator screenOptions={({route})=>({
      tabBarIcon:({focused,size,color})=>{
        let iconName;
        if(route.name==="Home"){
          iconName= "home";
          size= focused? 35:25;
          color=focused ? "#1e90ff":"#555";
        }else if(route.name==="Kaçak/Kayıp"){
          iconName="camera";
          size= focused? 35:25;
          color=focused ? "#1e90ff":"#555";
        }else if(route.name==="OCR"){
          iconName="star";
          size= focused? 35:25;
          color=focused ? "#1e90ff":"#555";
        }else if(route.name==="Tasarruf"){
          iconName="tint";
          size= focused? 35:25;
          color=focused ? "#1e90ff":"#555";
        }else if(route.name==="Bildirim"){
          iconName="bell";
          size= focused? 35:25;
          color=focused ? "#1e90ff":"#555";
        }

        return(
          <Icon
          name={iconName}
          size={size}
          color={color}
          />
        )
      }
    })}> 
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='Kaçak/Kayıp' component={Kacak} />
      <Tab.Screen name='OCR' component={Ocr} />
      <Tab.Screen name='Tasarruf' component={Tasarruf}/>
      <Tab.Screen name='Bildirim' component={Notifi}/>
    
    </Tab.Navigator>
  )
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
      
  );
 
}
export default Router;