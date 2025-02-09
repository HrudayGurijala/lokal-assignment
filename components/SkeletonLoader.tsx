import { View } from 'react-native';
import SkeletonLoading from 'expo-skeleton-loading';

const SkeletonLoader = () => {
  return (
    <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
        <View style={{flexDirection:'column',margin:15}}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: 40, height: 40, backgroundColor: "#adadad", borderRadius: 10 }} />
          <View style={{ flex:1, marginLeft: 10 }}>
              <View style={{ backgroundColor: "#adadad", width: "100%", height: 20, marginBottom: 3, borderRadius: 5 }} />
              <View style={{ backgroundColor: "#adadad", width: '40%', height: 10, borderRadius: 5 }} />
          </View>
        </View>
        <View style={{ backgroundColor: "#adadad", width: "50%", height: 17, marginBottom: 3, borderRadius: 5 ,margin:5,}} />
        <View style={{ backgroundColor: "#adadad", width: "50%", height: 17, marginBottom: 3, borderRadius: 5 ,margin:5,}} />
        <View style={{ backgroundColor: "#adadad", width: "50%", height: 17, marginBottom: 3, borderRadius: 5 ,margin:5,}} />

        <View style={{flexDirection:'row'}}>
            <View style={{ backgroundColor: "#adadad", width: "40%", height: 25, marginBottom: 3, borderRadius: 5 ,margin:5,}} />
            <View style={{ backgroundColor: "#adadad", width: "40%", height: 25, marginBottom: 3, borderRadius: 5 ,margin:5,}} />
            <View style={{ backgroundColor: "#adadad", width: "10%", height: 25, marginBottom: 3, borderRadius: 5 ,margin:5,}} />
        </View>
        </View>
    </SkeletonLoading>
  );
};

export default SkeletonLoader;
