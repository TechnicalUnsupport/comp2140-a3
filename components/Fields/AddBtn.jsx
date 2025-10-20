import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'

const  AddBtn = ({props}) => {

  return (
    <TouchableHighlight 
      style={styles.addBtn}
      onPress={()=>props.toggleState()}
      
    >
      <Text style={styles.addBtnTxt}>Add Field</Text>
    </TouchableHighlight>
  )
}
const styles = StyleSheet.create({
  addBtn:{
    backgroundColor:'#4a42f5',
    padding:9,
    margin:9,
    width:'49%',
    borderColor:'grey',
    borderWidth:0,
    borderRadius:24
  },
  addBtnTxt:{
    color:'white',
    textAlign:'center'
  }
})
export default AddBtn