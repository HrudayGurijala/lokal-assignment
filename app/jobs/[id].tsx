import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import { Pressable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobsDescription = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const item = useLocalSearchParams<{ item: string }>();
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        checkBookmarkStatus();
    }, []);

    const checkBookmarkStatus = async () => {
        try {
            const savedJobs = await AsyncStorage.getItem('savedJobs');
            if (savedJobs !== null) {
                const jobs = JSON.parse(savedJobs);
                setIsBookmarked(jobs.hasOwnProperty(id));
            }
        } catch (error) {
            console.error('Error checking bookmark status:', error);
        }
    };

    const handleBookmark = async () => {
        try {
            const savedJobs = await AsyncStorage.getItem('savedJobs');
            let jobs = savedJobs ? JSON.parse(savedJobs) : {};

            if (isBookmarked) {
                delete jobs[id];
                setIsBookmarked(false);
                Alert.alert('Success', 'Job removed from bookmarks');
            } else {
                jobs[id] = {
                    ...item,
                    savedAt: new Date().toISOString()
                };
                setIsBookmarked(true);
                Alert.alert('Success', 'Job bookmarked successfully');
            }

            await AsyncStorage.setItem('savedJobs', JSON.stringify(jobs));
        } catch (error) {
            console.error('Error saving job:', error);
            Alert.alert('Error', 'Failed to save job');
        }
    };

    return (
        <>
            <GestureHandlerRootView>
                <Text>{id}</Text>
                <Pressable onPress={handleBookmark}>
                    <Text>{isBookmarked ? 'Remove Bookmark' : 'Save Job'}</Text>
                </Pressable>
                {/* <Pressable onPress={() => console.log('Close')}>
                    <Text>Close</Text>
                </Pressable> */}
            </GestureHandlerRootView>
        </>
    )
}

export default JobsDescription

const styles = StyleSheet.create({})