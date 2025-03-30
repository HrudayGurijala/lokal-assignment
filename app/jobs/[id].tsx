import { StyleSheet, Text, View, Alert, Image, Linking } from 'react-native';
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
    const item: cardDetails = itemStr ? JSON.parse(itemStr) : null;
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
    const createdOn = new Date(item.created_on);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = createdOn.toLocaleDateString('en-GB', options);

    // Render Text component only if data exists
    const renderTextIfExists = (text, style) => {
        return text ? <Text style={style}>{text}</Text> : null;
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.detailsCard}>
                    <View style={styles.detailsHeader}>
                        {item.creatives && item.creatives[0] && item.creatives[0].file && (
                            <View style={styles.cardImage}>
                                <Image style={styles.cardImage} source={{ uri: item.creatives[0].file }} />
                            </View>
                        )}
                        <View style={styles.jobTitle}>
                            {item.title && (
                                <Text numberOfLines={2} style={styles.jobTitleText}>{item.title}</Text>
                            )}
                        </View>
                        <Pressable onPress={handleBookmark}>
                            {(isBookmarked) ? (
                                <MaterialCommunityIcons name="bookmark" size={30} color="#6494f1" />
                            ) : (
                                <MaterialCommunityIcons name="bookmark-outline" size={30} color="#6494f1" />
                            )}
                        </Pressable>
                    </View>
                    
                    {item.primary_details && item.primary_details.Salary && (
                        <View style={styles.jobSalary}>
                            <FontAwesome6 name="money-bills" size={17} color="#727c85" />
                            <Text style={styles.jobSalaryText}> {item.primary_details.Salary}</Text>
                        </View>
                    )}
                    
                    {item.company_name && (
                        <View style={styles.companyName}>
                            <MaterialCommunityIcons name="office-building-outline" size={20} color="#727c85" />
                            <Text style={styles.companyNameText}>{item.company_name}</Text>
                        </View>
                    )}

                    {item.primary_details && item.primary_details.Place && (
                        <View style={styles.jobLocation}>
                            <Octicons name="location" size={20} color="#727c85" />
                            <Text style={styles.jobLocationText}> {item.primary_details.Place}</Text>
                        </View>
                    )}

                    {item.job_tags && item.job_tags.length > 0 && (
                        <ScrollView horizontal={true} style={styles.jobTags}>
                            {item.job_tags.map((tag, index) => (
                                tag.value ? (
                                    <View style={styles.jobTagItem} key={index}>
                                        <Text style={styles.tagText}>{tag.value}</Text>
                                    </View>
                                ) : null
                            ))}
                        </ScrollView>
                    )}
                </View>
                
                <Seperator />
                
                <View style={styles.jobHighlightsCard}>
                    <View>
                        <Text style={styles.highlightHeaderText}>Job Highlights</Text>
                    </View>
                    <View style={styles.highlights}>
                        {item.primary_details && item.primary_details.Experience && (
                            <View style={styles.highlightItem}>
                                <AntDesign name="staro" size={20} color="#3f3f3f" />
                                <View>
                                    <Text style={styles.highlightText}>Experience : </Text>
                                </View>
                                <View>
                                    <Text style={styles.highlightText}>{item.primary_details.Experience}</Text>
                                </View>
                            </View>
                        )}
                        
                        {item.primary_details && item.primary_details.Qualification && (
                            <View style={styles.highlightItem}>
                                <MaterialIcons name="menu-book" size={20} color="#3f3f3f" />
                                <View>
                                    <Text style={styles.highlightText}>Qualifications : </Text>
                                </View>
                                <View>
                                    <Text style={styles.highlightText}>{item.primary_details.Qualification}</Text>
                                </View>
                            </View>
                        )}
                        
                        {item.openings_count && (
                            <View style={styles.highlightItem}>
                                <Ionicons name="people-outline" size={20} color="#3f3f3f" />
                                <View>
                                    <Text style={styles.highlightText}>Number of openings : </Text>
                                </View>
                                <View>
                                    <Text style={styles.highlightText}>{item.openings_count}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                
                {parsedContent && Object.keys(parsedContent).length > 0 && (
                    <View style={styles.aboutCard}>
                        <Text style={styles.aboutHeader}>Job Description</Text>
                        <View style={styles.contentContainer}>
                            {Object.entries(parsedContent).map(([key, value]) => (
                                value ? (
                                    <View key={key} style={styles.section}>
                                        <Text style={styles.contentText}>{String(value)}</Text>
                                    </View>
                                ) : null
                            ))}
                        </View>
                    </View>
                )}
                
                <Seperator />
                
                {item.primary_details && item.primary_details.Fees_Charged === "-1" && (
                    <>
                        <View style={styles.warningCard}>
                            <Text style={styles.warningTitle}>! Fee not required</Text>
                            <View style={styles.warningContent}>
                                <Text style={styles.warningLabel}>Avoid paying fees</Text>
                            </View>
                            <Text style={styles.warningText}>
                                Recruiter should not charge you any fee. In case they do, please complain to us
                            </Text>
                            <View style={styles.complainButton}>
                                <Text style={styles.complainButtonText}>Complain</Text>
                            </View>
                        </View>
                        <Seperator/>
                    </>
                )}

                <View style={styles.disclaimerCard}>
                    <Text style={styles.disclaimerTitle}>Disclaimer</Text>
                    <Text style={styles.disclaimerText}>
                        Lokal App is not responsible for the accuracy of the job details or the claims made by the advertiser in this job post.
                    </Text>
                    <View style={styles.statsRow}>
                        {formattedDate && (
                            <Text style={styles.statsText}>Posted on {formattedDate}</Text>
                        )}
                        {item.views && (
                            <Text style={styles.statsText}>{item.views} views</Text>
                        )}
                    </View>
                </View>
                
                <Seperator />
                
                <View style={styles.jobContact}>
                    {item.contact_preference && item.contact_preference.whatsapp_link && (
                        <Pressable style={styles.whatsapp} onPress={() => Linking.openURL(item.contact_preference.whatsapp_link)}>
                            <FontAwesome name="whatsapp" size={24} color="green" />
                            <Text style={styles.callText}> Chat </Text>
                        </Pressable>
                    )}

                    {item.custom_link && (
                        <Pressable style={styles.call} onPress={() => Linking.openURL(item.custom_link)}>
                            {item.button_text && (
                                <Text style={styles.callText}>{item.button_text}</Text>
                            )}
                        </Pressable>
                    )}
                </View>
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
        padding: 10,
    },
    detailsCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        gap: 10,
    },
    detailsHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
    },
    cardImage: {
        flex: 1,
        width: 40,
        height: 40,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    jobTitle: {
        flex: 4,
        marginRight: 8,
    },
    jobTitleText: {
        fontSize: 15,
        color: "#111111",
        fontFamily: 'Exo2Bold'
    },
    companyName: {
        flex: 0,
        padding: 3,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    companyNameText: {
        fontSize: 12,
        color: "#727c85",
        fontFamily: 'Exo2Medium',
    },
    jobSalary: {
        flex: 0,
        padding: 3,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    jobSalaryText: {
        fontSize: 12,
        color: "#727c85",
        fontFamily: 'Exo2Medium',
    },
    jobLocation: {
        flex: 0,
        padding: 3,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    jobLocationText: {
        fontSize: 12,
        color: "#727c85",
        fontFamily: 'Exo2Medium',
    },
    jobTags: {
        flex: 0,
        padding: 2,
    },
    jobTagItem: {
        padding: 5,
        backgroundColor: '#f1f1f1',
        borderRadius: 7,
        marginRight: 5,
    },
    tagText: {
        fontSize: 12,
        color: "#111111",
        fontFamily: 'Exo2Medium',
    },
    jobHighlightsCard: {
        backgroundColor: "#E7F3FF",
        margin: 7,
        borderRadius: 5,
        padding: 10,
        elevation: 3,
        shadowColor: "#3f3f3f",
    },
    highlightHeaderText: {
        fontSize: 14,
        fontFamily: 'Exo2Bold',
    },
    highlights: {
        display: 'flex',
        flexDirection: 'column',
    },
    highlightItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        margin: 5,
        gap: 5,
    },
    highlightText: {
        fontFamily: 'Exo2Medium',
        fontSize: 12,
        color: "#3f3f3f"
    },
    aboutCard: {
        padding: 7,
    },
    aboutHeader: {
        fontSize: 14,
        fontFamily: 'Exo2Bold',
    },
    contentContainer: {
        gap: 7,
        display: 'flex',
        flexDirection: 'column',
    },
    section: {
        flex: 1,
    },
    contentText: {
        fontSize: 12,
        fontFamily: 'Exo2Regular',
        color: "#727c85"
    },
    jobContact: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10, 
    },
    whatsapp: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#111111',
        borderWidth: 1,
        paddingVertical: 7,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    call: {
        flex: 1,
        display: 'flex',
        borderRadius: 7,
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffbb00',
    },
    callText: {
        fontSize: 13,
        fontFamily: 'Exo2Bold',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        color: 'red',
        fontFamily: 'Exo2Medium'
    },
    warningCard: {
        backgroundColor: '#FEF2F2',
        padding: 16,
        borderRadius: 8,
        gap: 12,
        margin: 5,
    },
    warningTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#991B1B',
        fontFamily: 'Exo2Bold'
    },
    warningContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    warningLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#991B1B',
        fontFamily: 'Exo2Medium'
    },
    warningText: {
        fontSize: 14,
        color: '#7F1D1D',
        fontFamily: 'Exo2Medium'
    },
    complainButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
    },
    complainButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#DC2626',
        fontFamily: 'Exo2Medium'
    },
    disclaimerCard: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 8,
        gap: 12,
        margin: 5,
    },
    disclaimerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        fontFamily: 'Exo2Bold'
    },
    disclaimerText: {
        fontSize: 14,
        color: '#64748B',
        fontFamily: 'Exo2Medium'
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    statsText: {
        fontSize: 12,
        color: '#64748B',
        fontFamily: 'Exo2Medium'
    },
});