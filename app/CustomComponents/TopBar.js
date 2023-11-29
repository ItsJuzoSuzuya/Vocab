import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useRoute } from '@react-navigation/native';

function TopBar({ navigation }) {
    let route = useRoute();

    return (
        <View style={topBarStyles.topBar}>
            {route.name !== 'LanguagePage' && (
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={require('../Icons/Arrow_left_Icon.png')} style={topBarStyles.backButton}/>
                </Pressable>
            )}

            <View style={[
                topBarStyles.rightButtons,
                { marginLeft: route.name !== 'LanguagePage' ? 0 : '98%'},
            ]}>
                <Pressable onPress={() => navigation.navigate('ProfilePage')}>
                    <Image source={require('../Icons/Profil_Icon.png')} style={topBarStyles.profileButton}/>
                </Pressable>
            </View>
        </View>
    );
}

const topBarStyles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',

        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        paddingHorizontal: 16,
    },
    backButton: {
        width: 24,
        height: 24,
    },
    rightButtons: {
        flexDirection: 'row',
    },
    profileButton: {
        width: 24,
        height: 24,
    },
});

export default TopBar;
