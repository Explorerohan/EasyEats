import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View style={{height:600,width:'100%',justifyContent:'center',alignItems:'center'}}>
      <Text style={styles.text}>Login</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  text:{
    fontSize:40,
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine:'underline'
  }
})