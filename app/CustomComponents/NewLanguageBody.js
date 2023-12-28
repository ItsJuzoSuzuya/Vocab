import React from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import styles from '../scripts/style';
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import {saveLanguage} from "../scripts/api";

const NewLanguageBody = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <TopBar navigation={navigation}/>
            <ScrollView style={styles.body}>
                <Text>Choose a new language:</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        saveLanguage('German');
                        navigation.navigate('LanguagePage');
                    }}
                >
                    <Text>German</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        saveLanguage('Russian');
                        navigation.navigate('LanguagePage');
                    }}
                >
                    <Text>Russian</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        saveLanguage('English');
                        navigation.navigate('LanguagePage');
                    }}
                >
                    <Text>English</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        saveLanguage('Japanese');
                        navigation.navigate('LanguagePage');
                    }}
                >
                    <Text>Japanese</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        saveLanguage('Chinese');
                        navigation.navigate('LanguagePage');
                    }}
                >
                    <Text>Chinese</Text>
                </Pressable>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </View>
    );
};
export default NewLanguageBody;