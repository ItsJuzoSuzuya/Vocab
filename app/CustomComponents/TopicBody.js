import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, Pressable, ScrollView, TextInput} from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"
import {fetchData} from "../scripts/api";

export const TopicBody = ({navigation, route}) => {
    const {currentLanguage} = route.params;
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const storedTopics = localStorage.getItem(currentLanguage + 'topics');
        if (storedTopics) {
            setTopics(JSON.parse(storedTopics));
        }
    }, []);
    const saveTopic = (topic) => {
        fetchData('saveTopic',{topic: topic, language: currentLanguage});
        if (!topics.includes(topic)) {
            const updatedTopics = [...topics, topic];
            localStorage.setItem(currentLanguage + 'topics', JSON.stringify(updatedTopics));
            setTopics(updatedTopics);
        }
    }

    const TopicButton = ({ topic }) => {
        return(
            <Pressable style={styles.button}>
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