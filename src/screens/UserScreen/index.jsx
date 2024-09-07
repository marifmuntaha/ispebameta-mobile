import {StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput} from "react-native";
import Header from "../../layouts/Header";
import React from "react";
import {APICore} from "../../utils/APICore";
import {SafeAreaView} from "react-native-safe-area-context";

const UserScreen = ({navigation}) => {
    const api = new APICore()
    const {user} = api.getLoggedInUser();
    const content = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff"
        },
        formBlock: {
            alignSelf: "center",
            width: "80%",
            marginTop: 30
        },
        formInputLabel: {
            alignSelf: 'flex-start',
            fontSize: 18,
            fontWeight: "bold",
            color: "#161D6F",
            marginBottom: 5,
        },
        formInput: {
            backgroundColor: "#F5F6F9",
            borderRadius: 15,
            height: 60,
            marginBottom: 20,
            justifyContent: "center",
            padding: 20
        },
        formInputPlaceholder: {
            fontSize: 18,
            height: 60,
            color: "black"
        },
        formButton: {
            backgroundColor: "#FFC14F",
            borderRadius: 5,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
        },
        formButtonLabel: {
            fontWeight: 'bold',
            color: "white",
            fontSize: 14
        }
    })
    return (
        <>
            <SafeAreaView style={{flex: 2}}>
                <Header
                    navigation={navigation}
                    backTo="DashboardScreen"
                    title="DATA PENGGUNA"
                    subtitle="Informasi Data Pengguna"
                />
                <ScrollView style={content.container}>
                    <View style={content.formBlock}>
                        <Text style={content.formInputLabel}>Nama Lengkap</Text>
                        <View style={content.formInput}>
                            <TextInput
                                style={content.formInputPlaceholder}
                                placeholderTextColor="#929090"
                                value={user.name}
                            />
                        </View>
                        <Text style={content.formInputLabel}>Alamat Email</Text>
                        <View style={content.formInput}>
                            <TextInput
                                style={content.formInputPlaceholder}
                                placeholderTextColor="#929090"
                                value={user.email}
                            />
                        </View>
                        <Text style={content.formInputLabel}>Jabatan</Text>
                        <View style={content.formInput}>
                            <TextInput
                                style={content.formInputPlaceholder}
                                placeholderTextColor="#929090"
                                value={user.position}
                            />
                        </View>
                        <Text style={content.formInputLabel}>Institusi</Text>
                        <View style={content.formInput}>
                            <TextInput
                                style={content.formInputPlaceholder}
                                placeholderTextColor="#929090"
                                value={user.institution}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                api.setLoggedInUser()
                                navigation.replace('SplashScreen')
                            }}
                            style={content.formButton}
                        >
                            <Text style={content.formButtonLabel}>KELUAR</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
export default UserScreen;