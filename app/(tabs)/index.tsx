import { StyleSheet, View,Text,FlatList,Image,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';


//title, location, salary and phone data in each card.

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>lokal</Text>

      <View style={styles.cardContainer}>

        <Card/>
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
    // padding: 10,
    // borderBottomColor:'#727c85',
    // borderBottomWidth:1,
  },
});
