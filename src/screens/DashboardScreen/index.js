import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import IconLogo from "../../images/IconLogo.png";
import IconUserWhite from "../../images/IconUserOutlineWhite.png";
import IconUserDefault from "../../images/IconUserDefault.png";
import IconPencilDefault from "../../images/IconPencilDefault.png";
import IconFileDefault from "../../images/IconFileDefault.png";
import IconQuestion from "../../images/IconQuestion.png";
import Dimension from "../../layouts/Dimention";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../UserScreen/UserContext";
import {actionType, Dispatch} from "../../reducer";
import {APICore} from "../../utils/APICore";
import {SafeAreaView} from "react-native-safe-area-context";
const DashboardScreen = ({navigation}) => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const [teachers, setTeachers] = useState([]);
    const [reports, setReports] = useState([]);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFF',
        },
        mainmenu: {
            fontWeight: "bold",
            fontSize: 25,
            color: "#161D6F",
            marginTop: 40,
            marginLeft: 30,
            marginBottom: 20
        }
    })
    const header    = StyleSheet.create({
        container: {
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            width: "100%",
            height: 350,
            backgroundColor: '#161D6F',
        },
        navbar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        navbarTitle: {
            flexDirection: 'row',
            marginTop: 45,
            marginLeft: 10
        },
        navbarTitleLogo: {
            width: 40,
            height: 35,
            margin: 5,
            alignSelf: 'center'
        },
        navbarTitleText: {
            fontWeight: "bold",
            fontSize: 25,
            color: "white",
            marginLeft: 20,
            alignSelf: 'center'
        },
        navbarUser: {
            marginTop: 45,
            marginRight: 20,
            alignSelf: 'center'
        },
        navbarUserIcon: {
            width: 30,
            height: 37
        },
        greeting: {
            marginTop: Dimension.screenHeight / 23.59,
            marginLeft: 10
        },
        greetingText: {
            fontWeight: "bold",
            fontSize: 25,
            color: "white",
            marginLeft: 20,
        },
    })
    const widget = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: Dimension.screenHeight / -10.62,
        },
        box: {
            flexDirection: 'column',
            borderRadius: 30,
            width: 200,
            height: 200,
            backgroundColor: '#FFC14F',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 20,
            paddingTop: 30
        },
        boxText: {
            fontWeight: "bold",
            fontSize: 25,
            color: "#161D6F",
        },
        boxButton: {
            width: "80%",
            backgroundColor:"#FFF",
            borderRadius:15,
            height:50,
            alignItems:"center",
            justifyContent:"center",
        },
        boxButtonLabel: {
            fontWeight: 'bold',
            color:"#161D6F",
            fontSize:18
        }
    })
    const mainmenu = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 10
        },
        boxButton: {
            flexDirection: 'column',
            borderRadius: 30,
            width: 200,
            height: 200,
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
        api.get('/report', {user: user.id}).then(resp => {
            setReports(resp.data.result)
        }).catch(error => {
            console.log(error.response)
        });
    }, []);
    return (
        <SafeAreaView style={{flex: 2}}>
            <View style={styles.container}>
                <View style={header.container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1}}>
                        <View style={header.navbarTitle}>
                            <Image source={IconLogo} style={header.navbarTitleLogo}/>
                            <Text style={header.navbarTitleText}>Dashboard</Text>
                        </View>
                        <View style={header.navbarUser}>
                            <TouchableOpacity onPress={() => navigation.replace("UserScreen")}>
                                <Image source={IconUserWhite} style={header.navbarUserIcon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={header.greeting}>
                        <Text style={header.greetingText}>Selamat Datang</Text>
                        <Text style={header.greetingText}>{user.name}</Text>
                    </View>
                </View>
                <View style={widget.container}>
                    <View style={widget.box}>
                        <Text style={widget.boxText}>{teachers.length} GURU</Text>
                        <TouchableOpacity
                            onPress = {() => navigation.replace('TeacherScreen')}
                            style={widget.boxButton}>
                            <Text style={widget.boxButtonLabel}>LIHAT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={widget.box}>
                        <Text style={widget.boxText}>{reports.length} LAPORAN</Text>
                        <TouchableOpacity
                            onPress = {() => navigation.replace('ReportScreen')}
                            style={widget.boxButton}>
                            <Text style={widget.boxButtonLabel}>LIHAT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <Text style={styles.mainmenu}>MAINMENU</Text>
                    <View style={mainmenu.container}>
                        <TouchableOpacity
                            onPress = {() => navigation.replace('TeacherScreen')}
                            style={mainmenu.boxButton}>
                            <Image source={IconUserDefault} style={mainmenu.boxButtonImage}/>
                            <Text style={widget.boxButtonLabel}>DATA GURU</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => navigation.replace('SupervisiScreen')}
                            style={mainmenu.boxButton}>
                            <Image source={IconPencilDefault} style={mainmenu.boxButtonImage}/>
                            <Text style={widget.boxButtonLabel}>PENILAIAN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={mainmenu.container}>
                        <TouchableOpacity
                            onPress = {() => navigation.replace('ReportScreen')}
                            style={mainmenu.boxButton}>
                            <Image source={IconFileDefault} style={{
                                height: 90,
                                width: 66
                            }}/>
                            <Text style={widget.boxButtonLabel}>LAPORAN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => alert('Halaman Tentang')}
                            style={mainmenu.boxButton}>
                            <Image source={IconQuestion} style={{
                                width: 58,
                                height: 90
                            }}/>
                            <Text style={widget.boxButtonLabel}>TENTANG</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default DashboardScreen;