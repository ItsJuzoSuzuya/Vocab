import {Pressable, ScrollView, Text, TextInput, View} from "react-native";
import TopBar from "./TopBar";
import styles from "../scripts/style";
import React, {useState} from "react";
import NavBar from "./NavBar";

const NewTopicBody = ({ navigation, route }) => {
    const [topicInput, setTopicInput] = useState('');
    const { saveTopic } = route.params;

    return (
        <View style={{flex: 1}}>
            <TopBar navigation={navigation}/>
            <ScrollView style={styles.body}>
                <View style={styles.body}>
                    <TextInput value={topicInput}
                               onChangeText={setTopicInput}
                               placeholder="Enter topic"/>
                    <Pressable onPress={() => {
                        saveTopic(topicInput);
                        navigation.goBack();
                        setTopicInput('');
                    }}>
                        <Text> Save </Text>
                    </Pressable>
                </View>
            </ScrollView>
            <NavBar navigation={navigation}/>
        </View>
    );
}

export default NewTopicBody;