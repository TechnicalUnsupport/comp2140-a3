import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { interpolate } from 'react-native-reanimated';
import LocationFIeldCard from './LocationFIeldCard';


const FieldCard = ({data}) => {
  // console.log(data);

  switch (data.field_type) {
    case 'text': return (
      <TextInput
        style={styles.textInput}
        onChangeText={text=>data.updateRecord(text)}
        value={data.recordData}
        inputMode={data.options.inputMode}
        keyboardType={data.options.keyboardType}
        maxLength={parseInt(data.options.maxLength)}
        placeholder={data.name}
      />
    );
    case 'multiline': return (
      <TextInput
        multiline
        style={styles.textInput}
        onChangeText={text=>data.updateRecord(text)}
        value={data.recordData}
        inputMode={data.options.inputMode}
        keyboardType={data.options.keyboardType}
        maxLength={parseInt(data.options.maxLength)}
        numberOfLines={parseInt(data.options.numberOfLines)}
        placeholder={data.name}
      />
    );
    case 'dropdown': return (
      <Picker
        selectedValue={data.options.selectedValue}
        onValueChange={(item)=>data.updateRecord(item.value)}
      >
        {data.options.values.map(val=>(
          <Picker.Item label={val.value} value={val.value}/>
        ))}
      </Picker>
      
    );
    case 'location': return <LocationFIeldCard data={data} setData={data.updateRecord}/>;
  } 
}

export default FieldCard

const styles = StyleSheet.create({
  container:{
    backgroundColor:'lightgrey',
    borderWidth:1,
    borderColor:'grey',
    borderRadius:15,
    padding:10,
    flex:1,
    alignItems:'center'
  },
  textInput:{
    borderColor:'grey',
    borderWidth:1,
    borderRadius:25,
    width:'80%',
    padding:'5%',
    alignSelf:'center',
    margin:'2%'
  }
})