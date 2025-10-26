import { FlatList, StyleSheet, Text, View, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Button } from '@react-navigation/elements'
import { router } from 'expo-router'
import { apiRequest } from '../api/app'
import FormCard from '../components/FormCard'

const forms = () => {
  const createNewForm = () => {
    router.push('/AddEditForm/New')  
  }

  const [forms,setForms] = useState([]);
  
  const deleteForm = async (formId) => {
    try {
      await apiRequest(`/form?id=eq.${formId}`,'DELETE');
    } catch (err) {
      console.error(`could not delete form ${formId}`,err);
    }
  
  }


  // api stuff here
  useEffect(()=>{
    try {
      const getForms = async () => {
        const f = await apiRequest('/form');
        setForms(f);
      }
      getForms();
    } catch (err) {
      console.error('could not fetch forms',err)
    }
  },[forms])

  // for card buttons
  const bindBuilder = (formId) => {
    return {binds:[
      {
        key:0,
        ico:'eye',
        size:24,
        color:'#5a42f5',
        action:() => {router.push(`/Form/${formId}/form`)}
      },
      {
        key:1,
        ico:'edit',
        size:24,
        color:'grey',
        action:()=>{router.push(`/AddEditForm/${formId}`)}
      },
      {
        key:2,
        ico:'delete',
        size:24,
        color:'red',
        action:async ()=>{await deleteForm(formId)}
      },
    ]}
  }

  const DATA = forms.map(f=>{return {key:f.id,...f,...bindBuilder(f.id)}})
  return (
    <View style={styles.container}>
      <Pressable
      style={styles.newFormButton}
      onPress={createNewForm}
      >
        <AntDesign 
            name='plus-square'
            color={"white"}
            size={24}
            style={styles.newFormIcon}
        />
        <Text style={styles.newFormButtonText} >
          New Form
        </Text>
        
      </Pressable>
      <FlatList
        data={DATA}
        renderItem={({item})=> <FormCard formData={item}/>}
        keyExtractor={item=>item.id}
        style={styles.flatList}
      />

    </View>
  )
}

export default forms

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    padding:20
  },
  newFormButton:{
    backgroundColor:"#5a42f5",
    width:'60%',
    borderRadius:25,
    padding:10,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'center',
    alignSelf:'flex-start'
  },
  newFormButtonText:{
    color:'white',
    fontSize:24,
    fontWeight:400,
    margin:5
  },
  newFormIcon:{
    margin:5
  },
  flatList:{
    width:'90%',
    margin:'5%',
  }
})