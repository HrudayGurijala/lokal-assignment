import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Seperator = () => {
  return (
    <View style={styles.Seperator}/>
  )
}

export default Seperator

const styles = StyleSheet.create({
    Seperator:{
        height:1,
        backgroundColor:'#cccccc',
    }
})