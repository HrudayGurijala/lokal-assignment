import { View,StyleSheet, Image, Platform,Text,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>

      
      <Text style={styles.title}>Lokal Jobs</Text>

      


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});
