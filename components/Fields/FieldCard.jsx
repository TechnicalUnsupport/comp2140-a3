import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';


const FieldCard = ({data}) => {
  switch (data.field_type) {
    case 'text': return (
      <TextInput
        
      />
    );
    case 'multiline': return (
      <Text>{data.name}</Text>
    );
    case 'dropdown': return (
      <Text>{data.name}</Text>
    )
  } 
}

export default FieldCard

const styles = StyleSheet.create({
  container:{
    backgroundColor:'lightgrey',
    borderWidth:1,
    borderColor:'grey',
    borderRadius:15,
    padding:10
  }
})