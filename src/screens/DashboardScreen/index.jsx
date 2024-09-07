import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import IconLogo from "../../images/IconLogo.png";
import IconUserWhite from "../../images/IconUserOutlineWhite.png";
import IconUserDefault from "../../images/IconUserDefault.png";
import IconPencilDefault from "../../images/IconPencilDefault.png";
import IconFileDefault from "../../images/IconFileDefault.png";
import IconQuestion from "../../images/IconQuestion.png";
import React, {useEffect, useState} from "react";
import {APICore} from "../../utils/APICore";
import {SafeAreaView} from "react-native-safe-area-context";
const DashboardScreen = ({navigation}) => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const [teachers, setTeachers] = useState([]);
    const [reports, setReports] = useState([]);
    const mainmenu = StyleSheet.create({
        boxButton: {
            borderRadius: 20,
            width: "40%",
            height: "100%",
            backgroundColor: '#E9EAEC',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 20,
            paddingTop: 30
        },
        boxButtonImage: {
            width: 90,
            height: 90
        }
    });
    useEffect(() => {
        api.get('/teacher', {user: user.id}).then(resp => {
            setTeachers(resp.data.result)
        }).catch(error => {
            console.log(error.response)
        });
        api.get('/evaluation', {user: user.id}).then(resp => {
            setReports(resp.data.result)
        }).catch(error => {
            console.log(error.response)
        });
    }, []);
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 3, backgroundColor: '#FFF'}}>
                <View style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20, width: "100%", height: '25%', backgroundColor: '#161D6F'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <View style={{flexDirection: 'row', marginLeft: 20}}>
                            <Image source={IconLogo} style={{ width: 35, height: 35}}/>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 20}}>Dashboard</Text>
                        </View>
                        <View style={{marginRight: 20}}>
                            <TouchableOpacity onPress={() => navigation.replace("UserScreen")}>
                                <Image source={IconUserWhite} style={{width: 25, height: 30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop: '10%', marginLeft: 10}}>
                        <Text style={{fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 20}}>Selamat Datang</Text>
                        <Text style={{fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 20}}>{user.name}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: -40}}>
                    <View style={{borderRadius: 30, width: '40%', height: 150, backgroundColor: '#FFC14F', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20, paddingTop: 20}}>
                        <Text style={{fontWeight: "bold", fontSize: 20, color: "#161D6F"}}>{teachers.length} GURU</Text>
                        <TouchableOpacity
                            onPress={() => navigation.replace('TeacherScreen')}
                            style={{width: "80%", backgroundColor:"#FFF", borderRadius:15, height: 40, alignItems:"center", justifyContent:"center"}}
                        >
                            <Text style={{fontWeight: 'bold', color:"#161D6F", fontSize:18}}>LIHAT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderRadius: 30, width: '40%', height: 150, backgroundColor: '#FFC14F', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20, paddingTop: 20}}>
                        <Text style={{fontWeight: "bold", fontSize: 20, color: "#161D6F"}}>{reports.length} LAPORAN</Text>
                        <TouchableOpacity
                            onPress={() => navigation.replace('ReportScreen')}
                            style={{width: "80%", backgroundColor:"#FFF", borderRadius:15, height: 40, alignItems:"center", justifyContent:"center"}}
                        >
                            <Text style={{fontWeight: 'bold', color:"#161D6F", fontSize:18}}>LIHAT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{flex: 3}}>
                    <Text style={{fontWeight: "bold", fontSize: 20, color: "#161D6F", marginTop: 30, marginLeft: 20, marginBottom: 20}}>MAINMENU</Text>
                    <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-evenly', margin: 10}}>
                        <TouchableOpacity
                            onPress = {() => navigation.replace('TeacherScreen')}
                            style={mainmenu.boxButton}>
                            <Image source={IconUserDefault} style={mainmenu.boxButtonImage}/>
                            <Text style={{fontWeight: 'bold', color:"#161D6F", fontSize: 18, marginTop: 5}}>DATA GURU</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => navigation.replace('SupervisiScreen')}
                            style={mainmenu.boxButton}>
                            <Image source={IconPencilDefault} style={mainmenu.boxButtonImage}/>
                            <Text style={{fontWeight: 'bold', color:"#161D6F", fontSize: 18, marginTop: 5}}>PENILAIAN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-evenly', margin: 10}}>
                        <TouchableOpacity
                            onPress = {() => navigation.replace('ReportScreen')}
                            style={mainmenu.boxButton}>
                            <Image source={IconFileDefault} style={{
                                height: 90,
                                width: 66
                            }}/>
                            <Text style={{fontWeight: 'bold', color:"#161D6F", fontSize: 18, marginTop: 5}}>LAPORAN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => Alert.alert('Tentang', 'Aplikasi ini dikembangkan oleh Ali Ma\'sum Effendi, (S.Pd.) Mahasiswa Pascasarjana Program Studi   Pendidikan Guru Madrasah Ibtidaiyah (PGMI) UIN SALATIGA disusun sebagai penyelesaian Studi S-2.')}
                            style={mainmenu.boxButton}>
                            <Image source={IconQuestion} style={{
                                width: 58,
                                height: 90
                            }}/>
                            <Text style={{fontWeight: 'bold', color:"#161D6F", fontSize: 18, marginTop: 5}}>TENTANG</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default DashboardScreen;