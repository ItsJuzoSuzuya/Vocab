import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"
import { fetchData } from "../scripts/api"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageBody = ({navigation}) => {
    const [languages, setLanguages] = useState([]);

    useEffect(  () => {
        const getLanguages = async () => {
            try {
                const storedLanguages = await AsyncStorage.getItem('languages');
                console.log(storedLanguages);
                if (storedLanguages) {
                    setLanguages(JSON.parse(storedLanguages));
                }
            } catch (e) {
                console.log(e);
            }
        }

        getLanguages();

        fetchData('getLanguage').then(data => {
            syncLanguages(data)
        });

    }, []);

    const saveLanguage = async (language) => {
        await fetchData('saveLanguage', {language: language});
        if (!languages.includes(language)) {
            const updatedLanguages = [...languages, language];
            await AsyncStorage.setItem('languages', JSON.stringify(updatedLanguages));

            setLanguages(updatedLanguages);
        }
    };

    const syncLanguages = (dbData) => {
        let langSet = new Set(languages);
        console.log()
        for (let item of dbData) {
            if (!langSet.has(item)) {
                langSet.add(item);
            }
        }

        setLanguages(Array.from(langSet));
    }

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