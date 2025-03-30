import { StyleSheet, View, Text, FlatList, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Card from '@/components/Card';
import { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import Seperator from '@/components/ui/Seperator';
import LokalDisclamer from '@/components/LokalDisclamer';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function HomeScreen() {
  const [jobBrief, setJobBrief] = useState<cardDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<cardDetails[]>([]);

  
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchJobBrief = async (pageNumber: number) => {
    try {
      const response = await fetch(
        `https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`
      );
      const data = await response.json();
      const loadedCardDetails: cardDetails[] = data.results;
      
      // Check if we've reached the end of the data
      if (loadedCardDetails.length < 10) {
        setHasMore(false);
      }
      // Append new data or set initial data
      if (pageNumber === 1) {
        setJobBrief(loadedCardDetails);
        setFilteredJobs(loadedCardDetails);
      } else {
        setJobBrief(prev => [...prev, ...loadedCardDetails]);
        setFilteredJobs(prev => [...prev, ...loadedCardDetails]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchJobBrief(1);
  }, []);

  useEffect(() => {
    const filtered = jobBrief.filter(job => 
      (job.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobBrief]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !searchQuery) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchJobBrief(nextPage);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#ffbb00" />
      </View>
    );
  };

  if (loading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Lokal Jobs</Text>
          <SkeletonLoader />
          <Seperator />
          <SkeletonLoader />
          <Seperator />
          <SkeletonLoader />
          <Seperator />
          <SkeletonLoader />
          <Seperator />
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lokal Jobs</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs by title..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {(filteredJobs.length === 0) ? (
          <View style={styles.noJobsContainer}>
            <Text style={styles.noJobsText}>
              {searchQuery ? 'No matching jobs found' : 'No jobs posted'}
            </Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <FlatList
              data={filteredJobs}
              // keyExtractor={(item) => String(item.id)}
              keyExtractor={(item, index) => item?.id ? String(item.id) : `job-${index}`}
              renderItem={({ item }) => (
                (item.type !== 1040) ?
                  <Pressable onPress={() => router.push({
                    pathname: '/jobs/[id]',
                    params: { id: item.id, item: JSON.stringify(item) },
                  })}>
                    <Card details={item} />
                    <Seperator />
                  </Pressable> :
                  <>
                    <LokalDisclamer details={item} />
                    <Seperator />
                  </>
              )}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Exo2Bold'
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 10,
    fontFamily: 'Exo2Regular',
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 100,
  },
  noJobsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noJobsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: '#727c85',
    fontFamily: 'Exo2Medium'
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  }
});