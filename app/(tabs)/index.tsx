import { StyleSheet, View,Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.titleContainer}>
      <Text>Jobs</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
