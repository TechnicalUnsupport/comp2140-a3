import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { apiRequest } from '../../../../api/app';
import AddBtn from '../../../../components/Fields/AddBtn';
import AddForm from '../../../../components/Fields/AddForm';

// manage fields stuff
const form = () => {
  const {id} = useLocalSearchParams();

  const [formData,setFormData] = useState({});
  const [currState,setCurrState] = useState(true);
  useEffect(()=>{
    try {
      const fetchForm = async () => {
        const f = await apiRequest(`/form?id=eq.${id}`);
        setFormData(f[0]);
      }
      if (id) fetchForm();
    } catch (err) {console.error('Encountered Error: ',err)}
  },[id]);

  return (
    <View style={styles.container}>
      <Text
        numberOfLines={1}
        style={styles.description}
      >
        {formData.description}
      </Text>

      <View style={styles.manageFld}>
        <Text style={styles.manageFldtitle}>Manage Fields</Text>
        {(currState) 
        ? <AddBtn props={{toggleState:()=>setCurrState(false)}} />
        : <AddForm props={{toggleState:()=>setCurrState(true)}} />
        }
      </View>
    </View>
  )
}

export default form

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    padding:'10%'
  },
  description:{
    backgroundColor:'lightgrey',
    padding:10,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:10,
    marginBottom:20
  },
  manageFld:{
    backgroundColor:'lightgrey',
    padding:9,
    borderColor:'grey',
    borderWidth:0,
    borderRadius:9,
    width:'99%',

    flex:0,
    alignItems:'center'
  },
  manageFldtitle:{
    fontSize:23,
    fontWeight:499
  },
  
})