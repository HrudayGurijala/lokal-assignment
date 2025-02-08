import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react';

type cardProps = PropsWithChildren<{
  details: cardDetails;
}>;

const LokalDisclamer = ({details}: cardProps) => {
    console.log(details.creatives[0].image_url);
  return (
    <Image source={{uri : details.creatives[0].image_url}} style={styles.ImageDis} />
  )
}

export default LokalDisclamer

const styles = StyleSheet.create({
    ImageDis:{
        height:100,
    }
})