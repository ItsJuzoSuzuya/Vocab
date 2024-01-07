import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"
import {getLanguages, saveLanguage} from "../scripts/api"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageBody = ({navigation}) => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const getLocalLanguages = async () => {
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

        getLocalLanguages();

        getLanguages().then(data => {
            console.log(data);
            console.log(languages);
            if (languages === data) {
                syncLanguages(data);
            } else setLanguages(data);
        });

    }, []);

    async function saveLanguageToDB(language) {
        if (!languages.includes(language)) {
            await saveLanguage(language);
            const updatedLanguages = [...languages, language];
            setLanguages(updatedLanguages);
            await AsyncStorage.setItem('languages', JSON.stringify(updatedLanguages));
        }
    }

    function syncLanguages(dbData) {
        let langSet = new Set(languages);
        console.log("lol");
        for (let item of dbData) {
            if (!langSet.has(item)) {
                langSet.add(item);
            }
        }

        setLanguages(Array.from(langSet));
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
                {languages.map((language) => (
                    <LanguageButton language={language} />
                ))}
                <Pressable style={styles.button} onPress={() => {
                    navigation.navigate('NewLanguage')}}>
                    <Text> + Add Language</Text>
                </Pressable>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </View>
    );
};