import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { apiRequest } from '../../../../api/app';
import AddBtn from '../../../../components/Fields/AddBtn';
import AddForm from '../../../../components/Fields/AddForm';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FieldCard from '../../../../components/Fields/FieldCard';

// manage fields stuff
const form = () => {
  const router = useRouter();
  const {id} = useLocalSearchParams();

  const [formData,setFormData] = useState({});
  const [currState,setCurrState] = useState(true);

  const [fields,setFields] = useState([]);

  useEffect(()=>{
    try {
      const fetchForm = async () => {
        const f = await apiRequest(`/form?id=eq.${id}`);
        setFormData(f[0]);
      }
      if (id) fetchForm();
    } catch (err) {console.error('Encountered Error: ',err)}
  },[id]);

  useEffect(()=>{
    const fetchFields = async () => {
      const f = await apiRequest(`/field?form_id=eq.${id}`);
      setFields(f);
    }
    if (id) fetchFields();
  },[currState,id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={()=>router.push('/forms')} 
      >
        <Text style={styles.backBtnTxt}>Back</Text>
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={styles.description}
      >
        {formData.description}
      </Text>

      <ScrollView style={styles.manageFldScroll}>
        <View style={styles.manageFld}>
          <Text style={styles.manageFldtitle}>Manage Fields</Text>
          {(currState) 
          ? <AddBtn props={{toggleState:()=>setCurrState(false)}} />
          : <AddForm props={{toggleState:()=>setCurrState(true),oidx:fields.length,fid:id}} />
          }
        </View>
      </ScrollView>

      <FlatList 
        data={{...fields,fid:id}}
        renderItem={({item})=> <FieldCard data={item}/>}
        keyExtractor={item=>item.id}
        style={styles.fieldsList}
      />

    </View>
  )
}

// TODO:
// make fields display in flatlist
// bind each field to a unique record
// figure out schema for this
// current guess: record = [fields] when they are filled out
// useeffect binded to a button (add the save record button) 


export default form

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    padding:'10%',
    
  },
  backBtn:{
    borderWidth:1,
    borderColor:'red',
    borderRadius:15,
    alignSelf:'flex-start',
    padding:'2%',
    paddingLeft:'5%',
    paddingRight:'5%',
    marginBottom:'5%'
  },
  backBtnTxt:{
    color:'red'
  },
  description:{
    backgroundColor:'lightgrey',
    padding:10,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:10,
    marginBottom:20
  },
  manageFldScroll:{
    width:'100%',
    marginBottom:'5%',
  },
  manageFld:{
    backgroundColor:'lightgrey',
    padding:9,
    borderColor:'grey',
    borderWidth:1,
    borderRadius:9,
    width:'100%',
    flex:0,
    alignItems:'center'
  },
  manageFldtitle:{
    fontSize:23,
    fontWeight:499
  },
  fieldsList:{
    width:'100%',
    alignSelf:'flex-end'
  },
})