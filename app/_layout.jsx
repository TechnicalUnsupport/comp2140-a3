import { router, Stack, usePathname } from "expo-router";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from "react";


const CustomDrawerContent = (props) => {
  const path = usePathname();
  console.log(path);

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text style={styles.drawerHeaderText}>Pages</Text>
      </View>
      {pages.map(p=>(
        <DrawerItem 
          key={p.key}
          icon={()=>(
            <AntDesign 
              name={p.icon.name}
              size={p.icon.size}
              color={(path === p.route) ? "blue" :  p.styles.color}
            />
          )}
          label={p.options.headerTitle}
          labelStyle={{color:(path === p.route) ? "blue" :  p.styles.color}}
          onPress={()=>{
            router.push(p.route)
          }}
        />
      ))}

    </DrawerContentScrollView>
  );
}

export default function Layout() {
  
  return (  
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props}/>} screenOptions={{headerShown: false}}>
      {pages.map(p=>(<Drawer.Screen name={p.name} options={p.options}/>))}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeaderText:{
    fontSize:32,
    fontWeight:300,
    paddingLeft:3
  }
})

const pages = [
  {
    key:0,
    route:'/',
    name:'index',
    options:{headerShown:true,headerTitle:'Home'},
    icon:{name:"smile",size:24},
    styles:{color:"grey"}
  },
  {
    key:1,
    name:'about',
    route:'/about',
    options:{headerShown:true,headerTitle:'About'},
    icon:{name:"question-circle",size:24},
    styles:{color:"grey"}
  },
  {
    key:2,
    name:'forms',
    route:'/forms',
    options:{headerShown:true,headerTitle:'Forms'},
    icon:{name:'form',size:24},
    styles:{color:"grey"}
  }
]

