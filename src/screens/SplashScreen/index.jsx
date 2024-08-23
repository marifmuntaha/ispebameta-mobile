import React, {useEffect} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, StatusBar, Text, View} from "react-native";
import LogoUniv from "../../images/logo-univ.png";
import LogoIcon from "../../images/IconLogo.png";
import {APICore} from "../../utils/APICore";

const SplashScreen = ({navigation}) => {
    const api = new APICore();
    useEffect(() => {
        setTimeout(() => {
            api.getLoggedInUser() === null
                ? navigation.replace("LoginScreen")
                : navigation.replace("DashboardScreen")
        }, 2000);
    }, []);
    return (
        <>
            <StatusBar barStyle="white" backgroundColor='#161D6F'/>
            <SafeAreaView style={{flex: 1, backgroundColor: '#161D6F'}}>
                <View style={{flex: 3, height: '100%', width: '100%', marginTop: 20}}>
                    <Image source={LogoUniv} style={{marginLeft: 10}}/>
                    <View style={{flex: 1, justifyContent: 'center', width: '80%', alignSelf: 'center'}}>
                        <Image source={LogoIcon} style={{alignSelf: 'center', justifyContent: 'center', marginTop: -150, width: 150, height: 150}}/>
                        <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>ISPEBAMETA</Text>
                        <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
                            Instrumen Supervisi Pembelajaran Berbasis Media Teknologi Digital
                        </Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: 14, color: 'white', textAlign: 'center', width: '100%'}}>Version 1.0.10</Text>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}
export default SplashScreen;