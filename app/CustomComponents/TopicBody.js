import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, Pressable, ScrollView, TextInput} from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"

const TopicBody = ({navigation, route}) => {
    const { currentLanguage } = route.params;
    const [showNewTopic, setShowNewTopic] = useState(false);
    const [topics, setTopics] = useState([]);
    const [topicInput, setTopicInput] = useState('');

    useEffect(() => {
        const storedTopics = localStorage.getItem(currentLanguage + 'topics');
        if (storedTopics) {
            setTopics(JSON.parse(storedTopics));
        }
    }, []);
    const saveTopic = (topic) => {
        if (!topics.includes(topic)) {
            const updatedTopics = [...topics, topic];
            localStorage.setItem(currentLanguage + 'topics', JSON.stringify(updatedTopics));
            setTopics(updatedTopics);
        }
        setTopicInput('');
    }

    const renderView = () => {
        if (showNewTopic) {
            return newTopic();
        } else {
            return defaultTopicPage();
        }
    };

    const TopicButton = ({ topic }) => {
        return(
            <Pressable style={bodyStyles.addButton}>
                <Text> {topic} </Text>
            </Pressable>
        )
    }

    const defaultTopicPage = () => {
        return (
            <View style={{ flex: 1 }}>
                <TopBar navigation={navigation}/>
                <ScrollView style={styles.body}>
                    <Text> Welcome! </Text>
                    {topics.map((topic) => (
                        <TopicButton topic={topic} />
                    ))}
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={() => setShowNewTopic(true)}
                    >
                        <Text> + Add Topic</Text>
                    </Pressable>
                </ScrollView>
                <NavBar navigation={navigation}/>
            </View>
        );
    }

    const newTopic = () => {
        return (
            <View style={{flex: 1}}>
                <TopBar navigation={navigation}/>
                <View style={styles.body}>
                    <TextInput
                        value={topicInput}
                        onChangeText={setTopicInput}
                        placeholder="Enter topic"
                    />
                    <Pressable onPress={() => {
                        saveTopic(topicInput);
                        setShowNewTopic(false)
                    }}>
                        <Text> Save </Text>
                    </Pressable>
                    <Pressable>
                        <Text> Cancel </Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return renderView();
}

const bodyStyles = StyleSheet.create({
    addButton: {
        alignSelf: 'center'
    }
})

export default TopicBody;