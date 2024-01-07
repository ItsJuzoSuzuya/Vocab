import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, Pressable, ScrollView, TextInput} from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"
import {fetchData} from "../scripts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TopicBody = ({navigation, route}) => {
    const {currentLanguage} = route.params;
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const getTopics = async () => {
            try {
                const storedTopics = await AsyncStorage.getItem(currentLanguage + 'topics');
                console.log(storedTopics);
                if (storedTopics) {
                    setTopics(JSON.parse(storedTopics));
                }
            } catch (e) {
                console.log(e);
            }
        }

        getTopics();

        // fetchData('getTopics', {language: currentLanguage}).then(data => {
        //     syncTopics(data)
        // });
    }, []);

    async function saveTopic(topic) {
        if (!topics.includes(topic)) {
            const updatedTopics = [...topics, topic];
            localStorage.setItem(currentLanguage + 'topics', JSON.stringify(updatedTopics));
            setTopics(updatedTopics);
        }
    }

    function syncTopics(dbData) {
        let topicSet = new Set(topics);
        for (let item of dbData) {
            if (!topicSet.has(item)) {
                topicSet.add(item);
            }
        }
        console.log(topicSet)
        setTopics(Array.from(topicSet));
    }

    const TopicButton = ({ topic }) => {
        function navigateToModePage () {
            navigation.navigate('ModePage', { currentLanguage: currentLanguage, currentTopic: topic });
        }

        return(
            <Pressable style={styles.button} onPress={navigateToModePage}>
                <Text> {topic} </Text>
            </Pressable>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <TopBar navigation={navigation}/>
            <ScrollView style={styles.body}>
                <Text> Welcome! </Text>
                {topics.map((topic) => (
                    <TopicButton topic={topic} />
                ))}
                <Pressable style={styles.button} onPress={() => navigation.navigate('NewTopic', { saveTopic })}>
                    <Text> + Add Topic</Text>
                </Pressable>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </View>
    );
}