import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../layouts/Header";
import UserIconDefault from "../../images/IconUserDefault.png";
import ArrowRight from "../../images/icon-arrow-right.png";
import React, {useEffect, useState} from "react";
import {APICore} from "../../utils/APICore";
const SupervisiScreen = ({navigation}) => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const content = StyleSheet.create({
        container: {
            padding: 20
        },
        box: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 30,
            width: "100%",
            height: 70,
            backgroundColor: '#E9EAEC',
            marginBottom: 20
        },
        boxContent: {
            flexDirection: "row"
        },
        boxImage: {
            width: 70,
            height: 70,
            borderRadius: 70,
            borderColor: "#161D6F",
            borderWidth: 3,
            alignItems: 'center',
            justifyContent: 'center'
        },
        boxText: {
            marginLeft: 10,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        boxButton: {
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 20,
            borderColor: "#F1F107",
            borderWidth: 3,
            alignSelf: "center",
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
    const [teachers, setTeachers] = useState([]);
    const [aspects, setAspects] = useState([]);
    useEffect(() => {
        api.get('/teacher', {user: user.id}).then(resp => {
            setTeachers(resp.data.result)
        }).catch(err => console.log(err));
        api.get('/aspect').then(resp => {
            setAspects(resp.data.result);
        }).catch(err => console.log(err));
    }, []);
    return (
        <View style={{flex: 2}}>
            <Header navigation={navigation} backTo="DashboardScreen" title="SUPERVISI" subtitle="Silahkan melakukan penilaian Guru"/>
            <ScrollView style={{padding: 20}}>
                {teachers && teachers.map((teacher) => (
                    <View key={teacher.id}>
                        {aspects && aspects.map((aspect) => (
                            <View style={{flex: 3, flexDirection: 'row', justifyContent: "space-between", alignItems: "center", borderRadius: 5, paddingLeft: 10, paddingRight: 10, width: "100%", backgroundColor: '#E9EAEC', marginBottom: 20}} key={aspect.id}>
                                <View style={{flex: 2, flexDirection: "row"}}>
                                    <View style={{
                                        width: 'auto',
                                        height: 'auto',
                                        borderColor: "#161D6F",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Image source={UserIconDefault} style={{width: 30, height: 30}}/>
                                    </View>
                                    <View style={{margin: 10, alignItems: 'flex-start', justifyContent: 'center', width: '80%'}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 14, color: "#161D6F", width: '100%'}}>{teacher.name}</Text>
                                        <Text style={{fontSize: 14, color: "#161D6F", width: '100%'}}>{aspect.name}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        width: 'auto',
                                        height: '100%',
                                        borderColor: "#BC0808",
                                        alignSelf: "flex-end",
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        navigation.navigate('EvaluationScreen', {
                                            aspectID: aspect.id,
                                            teacherID: teacher.id
                                        })
                                    }}>
                                    <Image source={ArrowRight} style={{width: 20, height: 20}}/>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
export default SupervisiScreen;