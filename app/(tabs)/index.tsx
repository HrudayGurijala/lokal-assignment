import { StyleSheet, View, Text, FlatList, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';

import { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import Seperator from '@/components/ui/Seperator';
import LokalDisclamer from '@/components/LokalDisclamer';


//title, location, salary and phone data in each card.

export default function HomeScreen() {
  const [jobBrief, setJobBrief] = useState<cardDetails[]>([]);


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
        console.error('Error fetching data:', error);
      }
    }
    fetchJobBrief();

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lokal Jobs</Text>

      <View style={styles.cardContainer}>

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    fontFamily: 'SpaceMono',
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
});
