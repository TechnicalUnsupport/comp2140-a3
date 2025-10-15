import { router } from "expo-router";
import { Text, View , StyleSheet, Pressable} from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome :D </Text>

      <Pressable 
        style={styles.button} 
        onPress={()=> router.push('/forms')}
      >
        <Text style={styles.buttonTxt}>
          Start creating forms Today! 
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop:'10%',
    alignItems: 'center'
  },
  h1: {
    fontSize:32,
    fontWeight: '500',
    textAlign: 'center'
  },
  button:{
    backgroundColor:'#5a42f5',
    padding: 10,
    borderRadius: 25,
  },
  buttonTxt:{
    color:'white',
    fontWeight:600,
    fontSize:16
  }
})