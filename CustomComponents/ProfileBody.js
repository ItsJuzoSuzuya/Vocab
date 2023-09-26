import React from "react";
import {View} from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";

export default function ProfileBody({navigation}){
    return (
        <View>
            <TopBar navigation={navigation}/>
            <NavBar navigation={navigation}/>
        </View>
    );
}
