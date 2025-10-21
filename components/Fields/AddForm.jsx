import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Switch, TextInput } from 'react-native-gesture-handler'
import {Picker} from '@react-native-picker/picker';

// helpers
const upperFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);


const FIELDS_ENUM = [
  "text",
  "multiline",
  "dropdown",
  "location"
]

const AddForm = ({props}) => {
  const [field,setField] = useState({
    name:'',
    field_type:'',
    required:false,
    is_num:false,
    order_index:props.oidx,
    options:{}
  })



  return (
    <View style={styles.container}>
      <Text style={styles.labelTxt}>Field name:</Text>
      <TextInput 
        style={styles.txtIn}
        onChangeText={text=> setField({
          ...field,
          name:text
        })}
        value={field.name}
        placeholder='Field name...'
      />
      <Text style={styles.labelTxt}>Field type:</Text>
      <View style={styles.dropDown}>
        <Picker style={styles.pickerTxt}>
          {FIELDS_ENUM.map(ftype=>(
            <Picker.Item 
              label={upperFirst(ftype)}
              value={ftype}
            />))}
        </Picker>
      </View>
      <View style={styles.switchView}>
        <Text style={styles.switchTxt}>required? </Text>
        <Switch
          style={styles.switch}
          trackColor={{false:'grey',true:'#5a42f5'}}
          thumbColor={field.required ? '#4331b8ff' : '#f4f3f4'}
          onValueChange={isEnabled => setField({
            ...field,
            required:!field.required
          })}
          value={field.required}
        />
      </View>
      <View style={styles.switchView}>
        <Text style={styles.switchTxt}>stores numeric values? </Text>
        <Switch
          style={styles.switch}
          trackColor={{false:'grey',true:'#5a42f5'}}
          thumbColor={field.required ? '#4331b8ff' : '#f4f3f4'}
          onValueChange={isEnabled => setField({
            ...field,
            is_num:!field.is_num
          })}
          value={field.is_num}
        />
      </View>
      
      <View style={styles.actionView}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={()=>props.toggleState()}
        >
          <Text style={styles.cancelBtnTxt}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.actionBtn,borderColor:'#4a42f5'}}
          // TODO: update this to a save bind vvv
          onPress={()=>props.toggleState()}
        >
          <Text style={styles.saveBtnTxt}>save</Text>
        </TouchableOpacity>
      </View>
      {/* TODO: FINISH UP HERE */}
    
    </View>
  )
}
export default AddForm

const styles = StyleSheet.create({
  container:{
    flex:0,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    padding:'5%',
  },
  labelTxt:{
    fontSize:18,
    fontWeight:500,
    marginTop:'3%',
    alignSelf:'flex-start'
  },
  actionView:{
    flex:0,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    width:'100%',
    height:100
  },
  actionBtn:{
    borderWidth:1,
    borderColor:'red',
    borderRadius:25,
    width:'35%',
    padding:'3%',
    marginLeft:'5%',
    marginRight:'5%'

  },
  cancelBtnTxt:{color:'red',textAlign:'center'},
  saveBtnTxt:{color:'#4a42f5',textAlign:'center'},
  txtIn:{
    borderColor:'grey',
    borderWidth:1,
    borderRadius:25,
    width:'80%',
    padding:'5%',
    margin:10,
    alignSelf:'flex-start'
  },
  dropDown:{
    borderColor:'grey',
    borderWidth:1,
    borderRadius:25,
    width:'80%',
    margin:10,
    alignSelf:'flex-start'
  },
  pickerTxt:{
    color:'grey'
  },
  switchView:{
    flex:0,
    flexDirection:'row',
    alignSelf:'flex-start',
    alignItems:'center',
    justifyContent:'space-evenly',
    padding:'5%',
    width:'80%'
  },
  switch:{
    alignSelf:'flex-end'
  },
  switchTxt:{
    fontSize:16,
    marginRight:'2%',
    fontWeight:300
  }
})
// work TODO: fix styling of switches 