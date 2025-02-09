import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { useFocusEffect } from '@react-navigation/native';
import Seperator from '@/components/ui/Seperator';



const bookmarks = () => {
    const [savedJobs, setSavedJobs] = useState<cardDetails[]>([]);
    
    const loadSavedJobs = async () => {
        try {
            const savedJobsData = await AsyncStorage.getItem('savedJobs');
            if (savedJobsData) {
                const jobs = JSON.parse(savedJobsData);
                if (jobs && typeof jobs === 'object') {
                    setSavedJobs(Array.isArray(jobs) ? jobs : Object.values(jobs));
                } else {
                    setSavedJobs([]);
                }
            }
        } catch (error) {
            console.error('Error loading saved jobs:', error);
            Alert.alert('Error', 'Failed to load saved jobs');
        }
    };

    useFocusEffect(
      React.useCallback(() => {
        loadSavedJobs();
      }, [])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.header}>Lokal Jobs</Text>
            {savedJobs.length === 0 ? (
                <View style={styles.centerStyle}>
                    <Text style={styles.noJobsText}>No Bookmarks</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={savedJobs}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => router.push({
                                pathname: '/jobs/[id]',
                                params: { id: item.id, item: JSON.stringify(item) },
                            })}>
                                <Card details={item} />
                                <Seperator/>
                            </Pressable>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
    },
    centerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'SpaceMono',
        marginBottom: 30,

      },
      header: {
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'Exo2Bold',
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
    },
});

export default bookmarks;