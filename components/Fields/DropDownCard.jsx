import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Switch, TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'

const DropDownCard = ({
    data,
    updateData,
    style,
    deleteData,
    idx,
    sel,
    setSel
  }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={()=>{
          if (sel !== idx) setSel(idx);
        }}
      >
        <AntDesign
          name={sel === idx? 'check-circle' : 'minus-circle'}
          color={sel === idx ? '#4a42f5' : 'grey'}
          size={16}
          style={{
            borderWidth:2,
            borderColor: sel === idx ? '#4a42f5' : 'grey',
            borderRadius:15,
            padding:'3%'
          }}
        />
      </TouchableOpacity>
      <TextInput
        style={{...style,width:'70%'}}
        onChangeText={updateData}
        value={data}
        placeholder={`dropdown value`}
      />
      <TouchableOpacity
        onPress={deleteData}
      >
        <AntDesign
          name='close-circle'
          color={'red'}
          size={16}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
    
  )
}

export default DropDownCard

const styles = StyleSheet.create({
  container:{
    flex:0,
    flexDirection:'row',
    alignItems:'center',
    width:'100%'
  },
  deleteIcon:{
    borderWidth:2,
    borderColor:'red',
    borderRadius:15,
    padding:'3%',
  }
})