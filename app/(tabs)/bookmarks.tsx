import { View,StyleSheet, Image, Platform,Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.titleContainer}>
      <Text>bookmarks</Text>
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
