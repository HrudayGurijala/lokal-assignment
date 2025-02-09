import { StyleSheet, View,Text,FlatList,Image,ScrollView, Pressable, Linking } from 'react-native';
import { PropsWithChildren } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
// import Zocial from '@expo/vector-icons/Zocial';

type cardProps = PropsWithChildren<{
  details: cardDetails;
}>;

// const imageURL = 'https://avatars.githubusercontent.com/u/e?email=myemail@mycompany.com&s=64';
const Card = ({details}: cardProps) => {
  return (
    <View style={styles.card}>

            <View style={styles.cardHeader}>
              <View style={styles.cardImage}>
                <Image style={styles.cardImage} source={{uri : details.creatives[0].file}}/>
              </View>
              <View style={styles.jobHeader}>
                <View style={styles.jobTitle}>
                  <Text numberOfLines={2} style={styles.jobTitleText}>{details.title}</Text>
                </View>
                <View style={styles.jobSalary}>
                  <Text style={styles.jobSalaryText}>{details.primary_details.Salary}</Text>
                </View>
              </View>
            </View>

            <View style={styles.companyName}>
              <MaterialCommunityIcons name="office-building-outline" size={20} color="#727c85" />
              <Text style={styles.companyNameText}>{details.company_name}</Text>
            </View>

            <View style={styles.jobLocation}>
              <Octicons name="location" size={20} color="#727c85" />
              <Text style={styles.jobLocationText}>{details.primary_details.Place}</Text>
            </View>

            <ScrollView horizontal={true} style={styles.jobTags}>
              {details.job_tags.map((tag, index) => (
                <View style={styles.jobTagItem} key={index}>
                  <Text style={styles.tagText}>{tag.value}</Text>
                </View>
              ))}
            </ScrollView>
            
            <View style={styles.jobContact}>

              <Pressable style = {styles.whatsapp} onPress={() => Linking.openURL(details.contact_preference.whatsapp_link)}>
                <FontAwesome name="whatsapp" size={24} color="green" />
                <Text style={styles.callText}> Chat </Text>
              </Pressable>

              <Pressable style = {styles.call} onPress={()=> Linking.openURL(details.custom_link)}>
                {/* <Zocial name="call" size={24} color="#727c85" /> */}
                <Text style={styles.callText}>{details.button_text}</Text>
              </Pressable>

              <View style = {styles.jobDetailsBtn}>
                <AntDesign name="right" size={15} color="#222222" />
              </View>

            </View>

        </View>
  )
}

export default Card

const styles = StyleSheet.create({

    card:{
        display:'flex',
        flexDirection:'column',
        // borderWidth:1,
        // borderColor:'#727c85',
        paddingVertical:15,
      },
      cardHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:0,
        paddingHorizontal:5,
      },
      cardImage:{
        flex:1,
        width:40,
        height:40,
        borderRadius:7,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      },
      jobHeader:{
        flex:4,
        display:'flex',
        flexDirection:'column',
        gap:1,
        marginBottom:5,
      },
      jobTitle:{
        flex:0,
      },
      jobTitleText:{
        fontSize:15,
        // fontWeight:'bold',  
        color:"#111111",
        // textOverflow:'ellipsis',
        fontFamily: 'Exo2Bold',
      },
      jobSalary:{
        flex:0,
      },
      jobSalaryText:{
        fontSize:13,
        color:"#727c85",
        fontFamily: 'Exo2Medium',

      },
      companyName:{
        flex:0,
        padding:5,
        display:'flex',
        flexDirection:'row',
        gap:5,
      },
      companyNameText:{
        fontSize:13,
        color:"#727c85",
        fontFamily: 'Exo2Medium',
      },
      jobLocation:{
        flex:0,
        padding:5,
        display:'flex',
        flexDirection:'row',
        gap:5,
      },
      jobLocationText:{
        fontSize:13,
        color:"#727c85",
        fontFamily: 'Exo2Medium',
      },
      jobTags:{
        flex:0,
        padding:7,
      },
      jobTagItem:{
        padding:5,
        backgroundColor:'#f0f0f0',
        borderRadius:7,
        marginRight:5,
      },
      tagText:{
        fontSize:13,
        color:"#111111",
        fontFamily: 'Exo2Medium',
      },
      
      jobContact:{
        // flex:,
        paddingTop:3,
        paddingBottom:0,
        paddingHorizontal:10,
        gap:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
      },
      whatsapp:{
        display:'flex',
        flexDirection:'row',
        // gap:5,
        borderColor:'#111111',
        borderWidth:1,
        paddingVertical:7,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        flex:1,
      },
      call:{
        display:'flex',
        borderRadius:7,
        flexDirection:'row',
        // gap:5,

        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ffbb00',
        flex:1,
      },
      callText:{
        fontSize:13,
        // fontWeight: 800,
        fontFamily: 'Exo2Bold',
      },
      jobDetailsBtn:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10,
        borderRadius:7,
        borderColor:'#111111',
        borderWidth:1,
      },
    

})