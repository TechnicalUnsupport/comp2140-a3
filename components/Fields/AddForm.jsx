import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

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
      <Pressable
        style={styles.cancelBtn}
        onPress={()=>props.toggleState()}
      >
        <Text style={styles.cancelBtnTxt}>Cancel</Text>
      </Pressable>
      <TextInput 
        style={styles.txtIn}
        onChangeText={text=> setField({
          ...field,
          name:text
        })}
        value={field.name}
        placeholder='Field Name'
      />
      {/* TODO: FINISH UP HERE */}
    </View>
  )
}
export default AddForm

const styles = StyleSheet.create({
  container:{
  },
  cancelBtn:{
    borderWidth:1,
    borderColor:'red',
    borderRadius:25,

    padding:10,
    paddingLeft:20,
    paddingRight:20,
    alignSelf:'baseline',
    margin:10,
    marginRight:'50%'
  },
  cancelBtnTxt:{color:'red'}
})