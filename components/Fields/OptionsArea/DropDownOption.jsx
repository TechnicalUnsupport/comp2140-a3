import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownCard from './DropDownCard';
import { Switch } from 'react-native-gesture-handler';

const DropDownOption = ({field,changeField}) => {
  const [values,setValues] = useState([{idx:0,value:''}]);
  const [selected,setSelected] = useState(0);

  const addValue = () => {
    // console.log('adding');
    setValues([
      ...values,
      {
        idx:values.length,
        value:''
      }
    ])
  }

  const updateValue = (idx) => (newVal) => {
    // console.log('updating');
    setValues(last => last.map(v=>
      v.idx === idx
      ? {...v,value:newVal}
      : v
    ));
  };
  const deleteValue = (idx) => {
    // console.log('deleting')
    const deleted = 
    values
      .filter(v=> v.idx != idx)    // everything except val at idx
      .map(v=> 
        (v.idx > idx)
        ? ({...v, idx: v.idx - 1}) // correct offsets
        : v 
      );
    setValues(deleted);
  }

  // acts like onValueChange
  useEffect(()=>{
    changeField({
      ...field,
      options:{
        ...field.options,
        values:values,
      }
    })
    console.log(values);
  },[values])

  return (
    <View style={styles.container}>
      <View style={styles.switchView}>
        <Text style={styles.switchTxt}>required? </Text>
        <Switch
          style={styles.switch}
          trackColor={{false:'grey',true:'#5a42f5'}}
          thumbColor={field.required ? '#4331b8ff' : '#f4f3f4'}
          onValueChange={() => changeField({
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
          thumbColor={field.is_num ? '#4331b8ff' : '#f4f3f4'}
          onValueChange={()=> changeField({
            ...field,
            is_num:!field.is_num
          })}
          value={field.is_num}
        />
      </View>

      <View style={styles.dropDownValuesView}>
        <Text style={styles.addValuesTtl}>Values:</Text>
        <TouchableOpacity 
          style={styles.addValueBtn}
          onPress={addValue}
        >
          <Text style={styles.addValueBtnTxt}>Add</Text>
        </TouchableOpacity>
        <View>
          {values.map(v=>(
            <DropDownCard
              key={v.idx} 
              style={styles.textIn}
              data={v.value}
              updateData={updateValue(v.idx)}
              deleteData={() => deleteValue(v.idx)}
              idx={v.idx}
              sel={selected}
              setSel={setSelected}
            />
          ))} 
        </View>
        

      </View>

    </View>
  );
}

export default DropDownOption

const styles = StyleSheet.create({
  textIn:{
    borderColor:'grey',
    borderWidth:1,
    borderRadius:25,
    width:'80%',
    padding:'5%',
    margin:10,
    alignSelf:'flex-start',
    textAlign:'center'
  },
  dropDownValuesView:{
    margin:5
  },
  addValuesTtl:{
    fontSize:16,
    fontWeight:'500'
  },
  addValueBtn:{
    borderWidth:1,
    borderColor:'#00b3ff',
    borderRadius:25,
    padding:'4%',
    width:'40%',
    alignSelf:'flex-start'
  },
  addValueBtnTxt:{
    color:'#00b3ff',
    textAlign:'center'
  },
})