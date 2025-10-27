import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';

const LocationFIeldCard = ({data,setData}) => {
  console.log(data.recordData.value)
  const [lon,setLon] = useState(0);
  const [lat,setLat] = useState(0);

  useEffect(() => {
    const raw = data?.recordData?.value;

    // if empty or invalid, just use defaults
    if (!raw || raw.trim() === '') {
      setLon(0);
      setLat(0);
      return;
    }

    try {
      const unpacked = JSON.parse(raw);
      setLon(unpacked.longitude ?? 0);
      setLat(unpacked.latitude ?? 0);
    } catch (err) {
      console.error(`invalid JSON: ${raw}`, err);
      // fallback to zeros if parsing fails
      setLon(0);
      setLat(0);
    }
  }, [data]);
  
  useEffect(()=>{
    if (lon === null) {setLon(0); return;}
    if (lat === null) {setLat(0); return;}
    
    const json = JSON.stringify({longitude: lon, latitude: lat});
    if (data.recordData.value !== json) {
      setData(json);
    }
  }, [lon, lat]);
  
  
  return (
    <View style={styles.area}>
      <Text style={{fontSize:16,fontWeight:600}}>location marker:</Text>
      <View style={styles.container}>
        <View style={styles.textInContainer}>
          <Text style={styles.labelTxt}>longitude:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={t=>setLon(parseFloat(t))}
            value={lon}
            placeholder='longitude:'
            inputMode='decimal'
          />
        </View>
        <View style={styles.textInContainer}>
          <Text style={styles.labelTxt}>latitude:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={t=>setLat(parseFloat(t))}
            value={lat}
            placeholder='latitude:'
            inputMode='decimal'
          />
        </View>
      </View>
    </View>
  )
}

export default LocationFIeldCard

const styles = StyleSheet.create({
  area:{
    backgroundColor:'lightgrey',
    borderWidth:1,
    borderColor:'grey',
    borderRadius:25,
    padding:'2%'
  },
  container:{
    flex:0,
    flexDirection:'row',
    alignSelf:'center',
    
  },
  textInContainer:{
    flex:0,
    alignItems:'center',
    justifyContent:'center',
    width:'40%',
    margin:'1%'
  },
  labelTxt:{
    fontSize:12,
    fontWeight:'600',
    alignSelf:'flex-start'
  },
  textInput:{
    borderColor:'grey',
    borderWidth:1,
    borderRadius:25,
    width:'100%',
    padding:'5%',
    alignSelf:'center',
    margin:'2%'
  }
})