import { StyleSheet, View,Text,FlatList,Image,ScrollView } from 'react-native';
import { PropsWithChildren } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Zocial from '@expo/vector-icons/Zocial';

type cardProps = PropsWithChildren<{
  details: cardDetails;
}>;

const imageURL = 'https://avatars.githubusercontent.com/u/e?email=myemail@mycompany.com&s=64';
const Card = ({details}: cardProps) => {
  return (
    <View style={styles.card}>

            <View style={styles.cardHeader}>
              <View style={styles.cardImage}>
                <Image style={styles.cardImage} source={{uri : imageURL}}/>
              </View>
              <View style={styles.jobHeader}>
                <View style={styles.jobTitle}>
                  <Text style={styles.jobTitleText}>{details.title}</Text>
                </View>
                <View style={styles.jobSalary}>
                  <Text style={styles.jobSalaryText}>$25000 - $100000</Text>
                </View>
              </View>
            </View>

            <View style={styles.companyName}>
              <MaterialCommunityIcons name="office-building-outline" size={24} color="#727c85" />
              <Text style={styles.companyNameText}>SS Infra</Text>
            </View>

            <View style={styles.jobLocation}>
              <Octicons name="location" size={24} color="#727c85" />
              <Text style={styles.jobLocationText}>Hyderabad</Text>
            </View>

            <ScrollView horizontal={true} style={styles.jobTags}>
              <View style={styles.jobTagItem}>
                <Text>Full Time</Text>
              </View>
              <View style={styles.jobTagItem}>
                <Text>vacancies</Text>
              </View>
            </ScrollView>
            
            <View style={styles.jobContact}>

              <View style = {styles.whatsapp}>
                <FontAwesome name="whatsapp" size={24} color="#25d366" />
                <Text> Whatsapp</Text>
              </View>

              <View style = {styles.call}>
                <Zocial name="call" size={24} color="#727c85" />
                <Text>Call HR</Text>
              </View>

              <View style = {styles.jobDetailsBtn}>
                <AntDesign name="right" size={15} color="#727c85" />
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
      },
      cardHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:0,
      },
      cardImage:{
        flex:1,
        width:40,
        height:40,
        borderRadius:10,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    
      },
      jobHeader:{
        flex:4,
        display:'flex',
        flexDirection:'column',
        gap:1,
      },
      jobTitle:{
        flex:0,
      },
      jobTitleText:{
        fontSize:20,
        fontWeight:'bold',  
      },
      jobSalary:{
        flex:0,
      },
      jobSalaryText:{
        fontSize:15,
        color:"#727c85",
      },
      companyName:{
        flex:0,
        padding:5,
        display:'flex',
        flexDirection:'row',
        gap:5,
      },
      companyNameText:{
        fontSize:15,
        color:"#727c85",
      },
      jobLocation:{
        flex:0,
        padding:5,
        display:'flex',
        flexDirection:'row',
        gap:5,
      },
      jobLocationText:{
        fontSize:15,
        color:"#727c85",
      },
      jobTags:{
        flex:0,
        padding:10,
      },
      jobTagItem:{
        padding:5,
        backgroundColor:'#f0f0f0',
        borderRadius:5,
        marginRight:5,
      },
      jobContact:{
        flex:0,
        padding:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
      },
      whatsapp:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        borderColor:'#727c85',
        borderWidth:1,
        paddingVertical:7,
        paddingHorizontal:20,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
      },
      call:{
        display:'flex',
        borderRadius:7,
        flexDirection:'row',
        gap:5,
        paddingVertical:7,
        paddingHorizontal:25,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ffbb00',
    
      },
      jobDetailsBtn:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10,
        borderRadius:7,
        borderColor:'#727c85',
        borderWidth:1,
      },
    

})