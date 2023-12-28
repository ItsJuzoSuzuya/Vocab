import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"
import { fetchData } from "../scripts/api"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WordBody = ({navigation, route}) => {
    const [words, setWords] = useState([]);
    const { currentLanguage, currentTopic }  = route.params;

    useEffect(  () => {
        const getWords = async () => {
            try {
                const storedWords = await AsyncStorage.getItem('Words');
                console.log(storedWords);
                if (storedWords) {
                    setWords(JSON.parse(storedWords));
                }
            } catch (e) {
                console.log(e);
            }
        }

        getWords();

        // fetchData('getWords').then(data => {
        //     syncWords(data)
        // });

    }, []);

    async function saveWord(language) {
        //await fetchData('saveWord', {language: language});
        if (!words.includes(language)) {
            const updatedWords = [...words, language];
            await AsyncStorage.setItem('Words', JSON.stringify(updatedWords));

            setWords(updatedWords);
        }
    }

    function syncWords(dbData) {
        let langSet = new Set(words);
        console.log()
        for (let item of dbData) {
            if (!langSet.has(item)) {
                langSet.add(item);
            }
        }

        setWords(Array.from(langSet));
    }

    const LanguageButton = ({language}) => {
        function navigateToTopicPage(){
            navigation.navigate('TopicPage', { currentLanguage: language });
        }

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
                {words.map((language) => (
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