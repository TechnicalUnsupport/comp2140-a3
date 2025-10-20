import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router'
import { apiRequest } from '../../../../api/app'
import { AntDesign } from '@expo/vector-icons'


const ICON_SETTINGS = {
  color:'#5a42f5',
  colori:'grey',
  size:24
}

const _layout = () => {
  const {id} = useLocalSearchParams();

  const [screens,setScreens] = useState([
    {
      key:0,
      name:'form',
      icon:{...ICON_SETTINGS,ico:'book'},
      tabLabel:'Form',
      headerTitle:''
    },
    {
      key:1,
      name:'records',
      icon:{...ICON_SETTINGS,ico:'bars'},
      tabLabel:'Records',
      headerTitle:''
    }
  ])
  const [formData,setFormData] = useState({}); 

  useEffect(()=>{
    // get that form data first
    try {
      // can never have a new form!
      const fetchForm = async () => {
        const f = await apiRequest(`/form?id=eq.${id}`);
        setFormData(f[0]);
      }
      if (id) fetchForm();
    } catch (err) {
      console.err('encountered an error:',err);
    }
  },[id]);

  useEffect(()=>{
    setScreens(screens.map(s=>{
      return {...s,headerTitle:`${s.tabLabel} - ${formData.name}`}
    }));
  },[formData])


  return (
    <Tabs 
      screenOptions={{
        headerShown:true,
        headerTitle:'FormBase'
      }}
    >
      {screens.map(screen=>(
        <Tabs.Screen 
          key={screen.key}
          name={screen.name}
          options={{
            tabBarIcon: () => (
              <AntDesign 
                name={screen.icon.ico}
                size={screen.icon.size}
                color={screen.icon.color}
              />
            ),
            tabBarLabel:screen.tabLabel,
            headerTitle:screen.headerTitle
          }}
        />
      ))} 
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})