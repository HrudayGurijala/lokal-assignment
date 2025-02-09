import { StyleSheet, View, Text, FlatList, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';

import { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import Seperator from '@/components/ui/Seperator';
import LokalDisclamer from '@/components/LokalDisclamer';
import SkeletonLoader from '@/components/SkeletonLoader';


//title, location, salary and phone data in each card.

export default function HomeScreen() {
  const [jobBrief, setJobBrief] = useState<cardDetails[]>([]);
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobBrief = async () => {
      try {
        const response = await fetch(
          'https://testapi.getlokalapp.com/common/jobs?page=1'
        );
        const data = await response.json();
        const cardDetails: cardDetails[] = data.results;
        setJobBrief(cardDetails);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    fetchJobBrief();

  }, [])

  if(loading){
    return(
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lokal Jobs</Text>
        <SkeletonLoader/>
        <Seperator/>
        <SkeletonLoader/>
        <Seperator/>
        <SkeletonLoader/>
        <Seperator/>
        <SkeletonLoader/>
        <Seperator/>
        </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lokal Jobs</Text>
      {(jobBrief.length === 0) ? (
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',height:"100%",}}>
          <Text style={styles.noJobsText}>No jobs posted</Text>
        </View>
      ):
      (<View style={styles.cardContainer}>
        <FlatList
          data={jobBrief}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            (item.type !== 1040)?
            <Pressable onPress={() => router.push({
              pathname: '/jobs/[id]',
              params: { id: item.id, item: JSON.stringify(item) } ,
            })}>
              <Card details={item} />
              <Seperator/>
            </Pressable> :
            <>
            <LokalDisclamer details={item}/>
            <Seperator/>
            </>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Exo2Bold'
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 60,
  },
noJobsText: {
  textAlign: 'center',
  marginTop: 20,
  fontSize: 20,
  color: '#727c85',
  fontFamily:'Exo2Medium'
},
});
