import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const bookmarks = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        loadSavedJobs();
    }, []);

    const loadSavedJobs = async () => {
        try {
            const savedJobsData = await AsyncStorage.getItem('savedJobs');
            if (savedJobsData) {
                const jobs = JSON.parse(savedJobsData);
                // Convert object to array for FlatList
                setSavedJobs(Object.values(jobs));
            }
        } catch (error) {
            console.error('Error loading saved jobs:', error);
            Alert.alert('Error', 'Failed to load saved jobs');
        }
    };

    interface Job {
        jobId: string;
        employer_name: string;
        job_title: string;
        savedAt: string;
    }

    const renderJobItem = ({ item }: { item: Job }) => (
        <Pressable
            style={styles.jobCard}
            onPress={() => router.push(`/jobs/${item.jobId}`)}
        >
            <Text style={styles.jobTitle}>{item.employer_name}</Text>
            <Text>{item.job_title}</Text>
            <Text>Saved on: {new Date(item.savedAt).toLocaleDateString()}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Saved Jobs</Text>
            {savedJobs.length === 0 ? (
                <Text style={styles.noJobsText}>No saved jobs yet</Text>
            ) : (
                <FlatList
                    data={savedJobs}
                    renderItem={renderJobItem}
                    keyExtractor={item => item.jobId}
                    style={styles.list}
                />
            )}
        </View>
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
    jobCard: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    list: {
        flex: 1,
    },
    noJobsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default bookmarks;