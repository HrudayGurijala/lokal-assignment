import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { useFocusEffect } from '@react-navigation/native';



const bookmarks = () => {
    const [savedJobs, setSavedJobs] = useState<cardDetails[]>([]);

    useEffect(() => {
        loadSavedJobs();
    }, []);
    useFocusEffect(
      React.useCallback(() => {
        loadSavedJobs();
      }, [])
    );
    const loadSavedJobs = async () => {
        try {
            const savedJobsData = await AsyncStorage.getItem('savedJobs');
            if (savedJobsData) {
                const jobs = JSON.parse(savedJobsData);
                setSavedJobs(Object.values(jobs));

            }
        } catch (error) {
            console.error('Error loading saved jobs:', error);
            Alert.alert('Error', 'Failed to load saved jobs');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Lokal Jobs</Text>
            {savedJobs.length === 0 ? (
                <Text style={styles.noJobsText}>No saved jobs yet</Text>
            ) : (
            <FlatList
              data={savedJobs}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Pressable onPress={() => router.push({
                  pathname: '/jobs/[id]',
                  params: { id: item.id, item: JSON.stringify(item) } ,
                })}>
                  <Card details={item} />
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    noJobsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default bookmarks;