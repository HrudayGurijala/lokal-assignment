import { StyleSheet, View,Text,FlatList,Image,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';

import { useState,useEffect } from 'react';


//title, location, salary and phone data in each card.

export default function HomeScreen() {
  const [jobBrief, setJobBrief] = useState<cardDetails[]>([]);
  

  useEffect(() => {
    const fetchJobBrief = async ()=>{
      try {
        const response = await fetch(
          'https://testapi.getlokalapp.com/common/jobs?page=1'
        );
        const data = await response.json();
        const cardDetails : cardDetails[] = data.results;
        setJobBrief(cardDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchJobBrief();

  }, [])
  


  // id : number;
  // type : number;
  // jobTitle : string;
  // salary : string;
  // company_name : string;
  // location : string;
  // tags : string;
  // whatsapp_no : string;
  // custom_link : string;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lokal Jobs</Text>

      <View style={styles.cardContainer}>

        <FlatList
          data={jobBrief}
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => (
            <Card
              details = {item}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 100,
    // padding: 10,
    // borderBottomColor:'#727c85',
    // borderBottomWidth:1,
  },
});
