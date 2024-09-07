import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Header from "../../layouts/Header";
import IconPrinter from "../../images/IconPrinter.png";
import {useEffect, useState} from "react";
import * as WebBrowser from 'expo-web-browser';
import {APICore} from "../../utils/APICore";
import IconUser from "../../images/IconUserDefault.png";

const ReportScreen = ({navigation}) => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const [loading, setLoading] = useState(0);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        api.get('/evaluation', {
            user: user.id,
            withTeacher: true,
            withAspect: true
        }).then((resp) => {
            setReports(resp.data.result);
        }).catch((error) => console.log('error', error))
    }, []);
    return (
        <View style={{flex: 3}}>
            <Header navigation={navigation} backTo="DashboardScreen" title="LAPORAN" subtitle="Hasil Supervisi bisa dicetak/dikirim."/>
            <ScrollView style={{padding: 20}}>
                {reports && reports.map((report) => (
                    <View style={{flex: 3, flexDirection: 'row', justifyContent: "space-between", alignItems: "center", borderRadius: 5, paddingLeft: 10, paddingRight: 10, width: "100%", backgroundColor: '#E9EAEC', marginBottom: 20}} key={report.id}>
                        <View style={{flex: 2, flexDirection: "row"}}>
                            <View style={{
                                width: 'auto',
                                height: 'auto',
                                borderColor: "#161D6F",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image source={IconUser} style={{width: 30, height: 30}}/>
                            </View>
                            <View style={{margin: 10, alignItems: 'flex-start', justifyContent: 'center', width: '80%'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 14, color: "#161D6F", width: '100%'}}>{report.teacher.name}</Text>
                                <Text style={{fontSize: 14, color: "#161D6F", width: '100%'}}>{report.aspect.name}</Text>
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
                                setLoading(report.id);
                                api.create('/evaluation/print', {
                                    id: report.id,
                                    user: report.user,
                                    teacher: report.teacher.id,
                                    aspect: report.aspect.id,
                                    finish: 0,
                                    result: report.result,
                                    feedback: report.feedback,
                                }).then((resp) => {
                                    setLoading(0)
                                    WebBrowser.openBrowserAsync(resp.data.result).then()
                                }).catch((error) => {
                                    setLoading(0);
                                    console.log(error)
                                })
                            }}
                        >
                            {
                                loading === report.id
                                    ? <ActivityIndicator size="large"/>
                                    : <Image source={IconPrinter} style={{width: 30, height: 30}}/>
                            }
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={content.boxButton} onPress={() => {*/}
                        {/*    setEvaluation({*/}
                        {/*        id: report.id,*/}
                        {/*        user: report.user,*/}
                        {/*        teacher: report.teacher.id,*/}
                        {/*        aspect: report.aspect.id,*/}
                        {/*        finish: 0,*/}
                        {/*        result: report.result,*/}
                        {/*        feedback: report.feedback,*/}
                        {/*    });*/}
                        {/*    Dispatch(actionType.EVALUATION_PRINT, {formData: evaluation}).then(resp => {*/}
                        {/*        WebBrowser.openBrowserAsync(resp).then()*/}
                        {/*    });*/}
                        {/*}}>*/}
                        {/*    <Image source={IconPrinter} style={{width: 20, height: 20}}/>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
export default ReportScreen;