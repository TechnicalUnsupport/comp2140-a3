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
  const [recordValues,setRecordValues] = useState([]);
  const [flatListData,setFlatListData] = useState([]);

  // GET form 
  useEffect(()=>{
    try {
      const fetchForm = async () => {
        const f = await apiRequest(`/form?id=eq.${id}`);
        setFormData(f[0]);
      }
      if (id) fetchForm();
    } catch (err) {
      console.error('could not fetch form data',err)
    }
  },[id]);

  // GET fields
  useEffect(()=>{
    if (!id) return;
    try {
      const fetchFields = async () => {
        const f = await apiRequest(`/field?form_id=eq.${id}`);
        setFields(f);
      }
      fetchFields();
    } catch (err) {
      console.err('Could not fetch fields',err);
    }
  },[formData,currState])

  // initialize record values 
  // NB: fields -> record.values (1-1)
  useEffect(()=>{
    if (fields.length === 0) {
      setRecordValues([]);
      return;
    }
    const valuesInit = fields.map(f => ({
      idx:f.order_index,
      value:''
    }));
    setRecordValues(valuesInit);
  },[fields]);

  // bind for the fields to update the record values
  // uses currying so that we can create an array of 
  // anonymous functions for each field to call
  const updateValue = (idx) => (val) => {
    setRecordValues(last => 
      last.map(v=> 
        v.idx === idx 
          ? {...v, value: val} // value we want to update
          : v)                 // everything else
    );
  };
  
  // set up flatList data
  useEffect(()=>{
    if (fields.length === 0 || recordValues.length === 0) {
      setFlatListData([]);
      return;
    }
    const tempFLData = fields.map(f => ({
      ...f,
      recordData: recordValues.find(val => val.idx === f.order_index)
        ?? { value: f.field_type === 'location'
              ? '{"longitude":0,"latitude":0}'
              : '' },
      updateRecord: updateValue(f.order_index),
    }));
    setFlatListData(tempFLData);
  },[fields,recordValues])

  // for saving the record
  const saveRecord = async () => {
    // TODO: build an actual save function
    console.log(recordValues);
  }
  
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
        data={flatListData}
        renderItem={({item}) => <FieldCard data={item}/>}
        keyExtractor={item=>item.order_index.toString()}
        style={styles.fieldsList}
      />

      <TouchableOpacity
        onPress={saveRecord}
        style={styles.saveBtn}
      >
        <Text style={styles.saveBtnTxt}>Save Record</Text>
      </TouchableOpacity>
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
    padding:'5%',
    
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
    // borderWidth:1
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
    alignSelf:'flex-end',
    // borderColor:'red',
    // borderWidth:1,
    height:'40%'
  },
  saveBtn:{
    backgroundColor:'#4a42f5',
    padding:'4%',
    marginTop:'5%',
    width:'50%',
    borderRadius:15
  },
  saveBtnTxt:{
    color:'white'
  },
})