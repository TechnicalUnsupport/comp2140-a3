import { StyleSheet, Text, TextInput, View, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { apiRequest, createForm } from '../../api/app';

const AddEditForm = () => {
  const router = useRouter();

  const {id} = useLocalSearchParams();
  const [data,setData] = useState({
    name:'',
    description:''
  })

  useEffect(()=>{
    try {
      const fetchForm = async () =>{
        const f = await apiRequest(`/form?id=eq.${id}`);
        setData(f[0]);
      }
      if (id === 'New'){
        setData({name:'',description:''});
      } else {
        fetchForm();
      }
    } catch (err) {
      console.error('encountered an error:',err);
    }
  },[id])


  const saveForm = async () =>{
    console.log('save');
    // TODO: some styling here 
    if (data.name === '' || data.description === '') return;

    console.log(data);
    try {
      (id === 'New')
        ? await apiRequest('/form','POST',data)
        : await apiRequest(`/form?id=eq.${id}`,'PATCH',data);
    } catch (err) {
      console.error('issue: ',err);
    }

    
    
  
    // do this after
    // setfDesc('');
    // setfTitle('');



    router.push('/forms');
  }
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backBtn} 
        onPress={()=>router.push('/forms')}>
        <Text style={styles.backBtnTxt}>Back</Text>
      </Pressable>

      <View style={styles.formArea}>
        <Text style={styles.formTitle}>New Form</Text>

        <TextInput
          editable
          maxLength={20}
          placeholder='title'
          onChangeText={text => setData({
            ...data,
            name:text
          })}
          value={data.name}
          style={styles.titleInput}
        />

        <TextInput
          editable
          multiline
          
          maxLength={200}
          numberOfLines={5}
          onChangeText={text => setData({
            ...data,
            description:text
          })}
          value={data.description}
          placeholder='description'
          style={styles.descriptionInput}

        />

        
        <Pressable
          onPress={saveForm}
          style={styles.saveBtn}
        >
          <Text style={styles.saveBtnTxt}>Save</Text>
        </Pressable>

      </View>
     
    </View>
    
  )
}

export default AddEditForm

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:'20%',
    padding:'5%'
  },
  backBtn:{
    backgroundColor:'lightgrey',
    padding:6,
    borderRadius:25,
    width:'25%',
    alignSelf:'left',
  },
  backBtnTxt:{
    textAlign:'center'
  },
  formArea:{
    width:'100%',
    height:'80%',
    margin:5,
    padding:'5%'
  },
  formTitle:{
    fontSize:32,
    fontWeight:600,
    marginLeft:20
  },

  titleInput:{
    margin:20,
    borderWidth:1,
    borderColor:'#5a42f5',
    borderRadius:25,
    padding:'5%'
  },
  descriptionInput:{
    margin:20,
    borderWidth:1,
    borderColor:'#5a42f5',
    borderRadius:25,
    padding:'5%',
    height:'20%',
    textAlignVertical:'top'
  },

  saveBtn:{
    backgroundColor:'#5a42f5',
    width:'30%',
    padding:10,
    margin:20,
    borderRadius:25
  },
  saveBtnTxt:{
    color:'white',
    textAlign:'center',
    fontSize:16
  }
})