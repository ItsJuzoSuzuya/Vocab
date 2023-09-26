import { Pressable, View, StyleSheet } from "react-native";
import React from "react";
import { faHome, faPlus, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavBar({navigation}){
    return(
        <View style={navBarStyles.navbar}>
            <Pressable onPress={() => navigation.navigate('ProfilePage')}>
                <FontAwesomeIcon icon={faHome} style={navBarStyles.image}/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ProfilePage')}>
                <FontAwesomeIcon icon={faPlus} style={navBarStyles.image}/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ProfilePage')}>
                <FontAwesomeIcon icon={faCog} style={navBarStyles.image}/>
            </Pressable>
        </View>
    );
}

const navBarStyles = StyleSheet.create({
    navbar: {
        justifyContent: 'space-around',
        flexDirection: 'row',

        bottom: 0,

        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    image: {
        width: 20,
        height: 20,
    }
})