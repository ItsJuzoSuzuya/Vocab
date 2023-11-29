import React, {useEffect, useState} from "react";
import {View, Text, Pressable, ScrollView} from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"
import { fetchData } from "../scripts/api"

export const LanguageBody = ({navigation}) => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const storedLanguages = localStorage.getItem('languages');
        if (storedLanguages) {
            setLanguages(JSON.parse(storedLanguages));
        }
    }, []);
    const saveLanguage = (language) => {
        fetchData('saveLanguage',  {language: language});
        if (!languages.includes(language)) {
            const updatedLanguages = [...languages, language];
            localStorage.setItem('languages', JSON.stringify(updatedLanguages));

            setLanguages(updatedLanguages);
        }
    };

    const LanguageButton = ({language}) => {
        const navigateToTopicPage = () => {
            navigation.navigate('TopicPage', { currentLanguage: language });
        };

        return(
            <Pressable style={styles.button} onPress={navigateToTopicPage}>
                <Text> {language} </Text>
            </Pressable>
        );
    };

    return (
        <View style={{flex: 1}}>
            <TopBar navigation={navigation}/>
            <ScrollView style={styles.body}>
                <Text> Welcome! </Text>
                {languages.map((language) => (
                    <LanguageButton language={language} />
                ))}
                <Pressable style={styles.button} onPress={() => navigation.navigate('NewLanguage', { saveLanguage })}>
                    <Text> + Add Language</Text>
                </Pressable>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </View>
    );
};