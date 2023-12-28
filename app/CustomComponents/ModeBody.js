import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style"

export const ModeBody = ({navigation, route}) => {

    return (
        <View style={{flex: 1}}>
            <TopBar navigation={navigation}/>
            <ScrollView style={styles.body}>
                <Text> Select The Mode </Text>

                <Pressable style={styles.button} onPress={() => navigation.navigate('WordPage', route.params)}>
                    <Text> Show List </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('WordPage', route)}>
                    <Text> Big Cards </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('WordPage', route)}>
                    <Text> Find Pairs </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('WordPage', route)}>
                    <Text> Guessing Game </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('WordPage', route)}>
                    <Text> Remembrance Test </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('WordPage', route)}>
                    <Text> Write Translation </Text>
                </Pressable>

            </ScrollView>
            <NavBar navigation={navigation}/>
        </View>
    );
};