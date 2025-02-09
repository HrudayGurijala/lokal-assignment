import { StyleSheet, Text, View, Alert,Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Seperator from '@/components/ui/Seperator';
import Ionicons from '@expo/vector-icons/Ionicons';

const JobsDescription = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { item: itemStr } = useLocalSearchParams<{ item: string }>();
    const item : cardDetails = itemStr ? JSON.parse(itemStr) : null;
    const [isBookmarked, setIsBookmarked] = useState(false);
    
    

    useEffect(() => {
        if (item) {
            checkBookmarkStatus();
        } else {
            console.error('Item is undefined or invalid');
        }
    }, [item]);

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
                // await AsyncStorage.clear();
                await AsyncStorage.setItem('savedJobs', JSON.stringify(jobs));
            } else {
                jobs[id] = { ...item };
                setIsBookmarked(true);
                Alert.alert('Success', 'Job bookmarked successfully');
                await AsyncStorage.setItem('savedJobs', JSON.stringify(jobs));
            }

        } catch (error) {
            console.error('Error saving job:', error);
            Alert.alert('Error', 'Failed to save job');
        }
    };

    if (!item) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Invalid job data</Text>
            </View>
        );
    }
    const parsedContent = typeof item.content === 'string' ? JSON.parse(item.content) : item.content;

    return (

            <GestureHandlerRootView style={styles.container}>
                {/* <Text>{id}</Text> */}
                <ScrollView>

                    <View style={styles.detailsCard}>
                        <View style={styles.detailsHeader}>
                            <View style={styles.cardImage}>
                                <Image style={styles.cardImage} source={{uri : item.creatives[0].file}}/>
                            </View>
                            <View style={styles.jobTitle}>
                                <Text numberOfLines={2} style={styles.jobTitleText}>{item.title}</Text>
                            </View>
                            <Pressable onPress={handleBookmark}>
                                <Text>{isBookmarked ? 'Remove Bookmark' : 'Save Job'}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.jobSalary}>
                            <FontAwesome6 name="money-bills" size={24} color="black" />
                            <Text style={styles.jobSalaryText}>{item.primary_details.Salary}</Text>
                        </View>
                        <View style={styles.companyName}>
                            <MaterialCommunityIcons name="office-building-outline" size={24} color="#727c85" />
                            <Text style={styles.companyNameText}>{item.company_name}</Text>
                        </View>

                        <View style={styles.jobLocation}>
                            <Octicons name="location" size={24} color="#727c85" />
                            <Text style={styles.jobLocationText}>{item.primary_details.Place}</Text>
                        </View>

                        <ScrollView horizontal={true} style={styles.jobTags}>
                            {item.job_tags.map((tag, index) => (
                                <View style={styles.jobTagItem} key={index}>
                                <Text>{tag.value}</Text>
                                </View>
                        ))}
                        </ScrollView>

                    </View>
                    <Seperator/>
                    <View style={styles.jobHighlightsCard}>
                    <View style={styles.highlightHeader}>
                        <Text>Job Highlights</Text>
                    </View>
                    <View style={styles.highlights}>
                        <View style={styles.highlightItem}>
                            <AntDesign name="staro" size={24} color="black" />
                            <View style={styles.highlightKey}>
                                <Text>Experience : </Text>
                            </View>
                            <View style={styles.highlightValue}>
                                <Text>{item.primary_details.Experience}</Text>
                            </View>
                        </View>
                        <View style={styles.highlightItem}>
                        <MaterialIcons name="menu-book" size={24} color="black" />
                            <View style={styles.highlightKey}>
                                <Text>Qualifications : </Text>
                            </View>
                            <View style={styles.highlightValue}>
                                <Text>{item.primary_details.Qualification}</Text>
                            </View>
                        </View>
                        <View style={styles.highlightItem}>
                        <Ionicons name="people-outline" size={24} color="black" />
                            <View style={styles.highlightKey}>
                                <Text>Number of openings : </Text>
                            </View>
                            <View style={styles.highlightValue}>
                                <Text>{item.openings_count}</Text>
                            </View>
                        </View>
                    </View>
                    </View>
                    <Seperator/>
                    <View style={styles.aboutCard}>
                        {/* <Text style={styles.about}>{parsedContent}</Text> */}
                        <View style={styles.contentContainer}>
                            {Object.entries(parsedContent).map(([key, value]) => (
                            <View key={key} style={styles.section}>
                                <Text style={styles.text}>{String(value)}</Text>
                            </View>
                            ))}
                        </View>
                    </View>
                    <Seperator/>
                    <View style={styles.feeNotRequiredCard}>
                        <Text>Fee not required</Text>
                        <View >
                            <View>
                                <Text>Avoid paying fees</Text>
                            </View>
                            <View>
                                <Text>Recruiter should not charge you any fee. Incase thet do, please complain to us</Text>
                            </View>
                            <View>
                                <Text>Complain</Text>
                            </View>
                        </View>
                    </View>
                    <Seperator/>
                    <View style={styles.disclaimerCard}>
                        <Text>Disclaimer</Text>
                        <Text>Lokal app is not responsible for the accuracy of the details of the claims made by the advertiser in this job post.</Text>
                        <View style={styles.jobStats}>
                            <View>
                                <Text>Posted on {item.created_on}</Text>
                            </View>
                            <View>
                                <Text>Views {item.views}</Text>
                            </View>
                        </View>
                    </View>
                    <Seperator/>
                    <View style={styles.jobContact}>

                    <View style = {styles.whatsapp}>
                        <FontAwesome name="whatsapp" size={24} color="#25d366" />
                        <Text> Chat</Text>
                    </View>

                    <View style = {styles.call}>
                        {/* <Zocial name="call" size={24} color="#727c85" /> */}
                        <Text>{item.button_text}</Text>
                    </View>

                    </View>
                    <Seperator/>
                </ScrollView>
            </GestureHandlerRootView>

    );
};

export default JobsDescription;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
});