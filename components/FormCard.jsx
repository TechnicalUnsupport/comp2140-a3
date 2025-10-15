import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const FormCard = ({formData}) => {

  return (
    <View style={styles.cardArea} key={formData.key}>
      <Text style={styles.nameTxt}>{formData.name}</Text>
      <Text style={styles.descriptionTxt}>{formData.description}</Text>
      <View style={styles.btnArea}>
        {formData.binds.map(b=>(
          <Pressable 
            style={{
              ...styles.actionBtn,
              borderColor:b.color
            }}
            key={b.key}
            onPress={()=>b.action()}
          >
            <AntDesign
              name={b.ico}
              size={b.size}
              color={b.color}
            />
          </Pressable>
        ))}
        
      </View>
    </View>
  )
}

export default FormCard

const styles = StyleSheet.create({
  cardArea:{
    backgroundColor:'lightgrey',
    flex:1,
    margin:5,
    padding:10,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:25 
  },
  nameTxt:{
    fontSize:24,
    fontWeight:500
  },
  descriptionTxt:{
    fontSize:14,
    fontWeight:200
  },
  btnArea:{
    flex:1,
    flexDirection:'row',
    alignSelf:'flex-end',
    marginRight:'3%'
  },
  actionBtn:{
    marginLeft:'2%',
    marginRight:'2%',
    padding:5,
    borderWidth:1,
    // borderColor:'grey',
    borderRadius:15
  }
})
