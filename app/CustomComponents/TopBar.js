import React from "react";
import {View, Image, StyleSheet, Button, Pressable} from "react-native";

function TopBar({navigation}) {
    return (
        <View style={topBarStyles.topBar}>
            <Pressable onPress={() => navigation.navigate('ProfilePage')}>
                <Image source={require('../Icons/Profil_Icon.png')}
                    style={topBarStyles.profileButton}/>
            </Pressable>
        </View>
    );
}

const topBarStyles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',

        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    profileButton: {
        width: 24,
        height: 24,
    },
})

export default TopBar;
