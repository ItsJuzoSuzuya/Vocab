import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, Pressable, ScrollView} from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"
import { saveLanguageToDB } from "../scripts/api"

const LanguageBody = ({navigation}) => {
    const [showNewLanguage, setShowNewLanguage] = useState(false);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const storedLanguages = localStorage.getItem('languages');
        if (storedLanguages) {
            setLanguages(JSON.parse(storedLanguages));
        }
    }, []);
    const saveLanguage = (language) => {
        saveLanguageToDB(language);
        if (!languages.includes(language)) {
            const updatedLanguages = [...languages, language];
            localStorage.setItem('languages', JSON.stringify(updatedLanguages));

            //setLanguages(updatedLanguages);
        }

    }

    const renderView = () => {
        if (showNewLanguage) {
            return newLanguage();
        } else {
            return defaultLanguagePage();
        }
    };

    const LanguageButton = ({language}) => {
        const navigateToTopicPage = () => {
            navigation.navigate('TopicPage', { currentLanguage: language });
        };

        return(
            <Pressable style={bodyStyles.addButton} onPress={navigateToTopicPage}>
                <Text> {language} </Text>
            </Pressable>
        )
    }

    const defaultLanguagePage = () => {
        return (
            <View style={{flex: 1}}>
                <TopBar navigation={navigation}/>
                <ScrollView style={styles.body}>
                    <Text> Welcome! </Text>
                    {languages.map((language) => (
                        <LanguageButton language={language} />
                    ))}
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={() => setShowNewLanguage(true)}
                    >
                        <Text> + Add Language</Text>
                    </Pressable>
                </ScrollView>
                <NavBar navigation={navigation}/>
            </View>
        );
    }

    const newLanguage = () => {
        return (
            <View style={{flex: 1}}>
                <TopBar navigation={navigation}/>
                <View style={styles.body}>
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={() => {saveLanguage('German'); setShowNewLanguage(false)}}
                    >
                        <Text> German </Text>
                    </Pressable>
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={() => {saveLanguage('English'); setShowNewLanguage(false)}}
                    >
                        <Text> English </Text>
                    </Pressable>
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={() => {saveLanguage('English'); setShowNewLanguage(false)}}
                    >
                        <Text> Japanese </Text>
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

export default LanguageBody;