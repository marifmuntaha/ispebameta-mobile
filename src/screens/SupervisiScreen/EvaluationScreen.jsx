import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../layouts/Header";
import Accordion from "../../layouts/Accordion";
import React, {useEffect, useState} from "react";
import {APICore} from "../../utils/APICore";

const EvaluationScreen = ({route, navigation}) => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const {aspectID, teacherID} = route.params;
    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        formButton: {
            backgroundColor: "#FFC14F",
            borderRadius: 5,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30
        },
        formButtonLabel: {
            fontWeight: 'bold',
            color: "white",
            fontSize: 14
        }
    });
    const [evaluation, setEvaluation] = useState([]);
    const [data, setData] = useState([])
    const [aspect, setAspect] = useState([]);
    const [teacher, setTeacher] = useState();
    const [instrument, setInstrument] = useState([]);
    const [reference, setReference] = useState([]);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        api.get(`${'/teacher/' + teacherID}`, {with: 'subject'}).then(resp => {
            setTeacher(resp.data.result);
        }).catch(error => console.log(error));
        api.get('/evaluation', {teacher: teacherID, aspect: aspectID}).then(resp => {
            setEvaluation(resp.data.result);
        }).catch(error => console.log(error));
        api.get(`/aspect/${aspectID}`).then(resp => {
            setAspect(resp.data.result);
        }).catch(error => console.log(error));
        api.get('/instrument', {aspect: aspectID, with: 'indicator'}).then(resp => {
            setInstrument(resp.data.result);
            setData(resp.data.result);
        }).catch(error => console.log(error));
    }, []);
    useEffect(() => {
        setReference(() => {
            return result.filter((value) => {
                return value.instrument === instrument.id
            })
        })
    }, [result, instrument]);
    useEffect(() => {
        setResult(() => {
            return evaluation.length > 0 ? JSON.parse(evaluation[0].result) : [];
        });
    }, [evaluation]);
    return (
        <View style={{flex: 3}}>
            <Header navigation={navigation} backTo="SupervisiScreen" title="PENILAIAN" subtitle={teacher !== undefined && teacher['name'] + " - " + teacher['subject'].name}/>
            <View style={{width: "90%", backgroundColor:"#FFC14F", borderRadius:20, height:50, alignSelf: "center", alignItems:"center", justifyContent:"center", marginTop: 20}}>
                <Text style={{fontWeight: 'bold', color:"white", fontSize: 16}}>{aspect.name}</Text>
            </View>
            <ScrollView style={{padding: 20}}>
                <Accordion data={data} result={result} setResult={setResult}/>
                <TouchableOpacity
                    onPress = {() => {
                        setLoading(true);
                        evaluation && evaluation.length > 0
                            ? api.update(`${'/evaluation/' + evaluation[0].id}`, {
                                id: evaluation[0].id,
                                user: user.id,
                                teacher: teacherID,
                                aspect: aspectID,
                                finish: 0,
                                result: JSON.stringify(result)
                            }).then(() => {
                                setLoading(false);
                            }).catch(error => {
                                setLoading(false);
                                console.log('error', error);
                            })
                            : api.create('/evaluation', {
                                user: user.id,
                                teacher: teacherID,
                                aspect: aspectID,
                                finish: 0,
                                result: JSON.stringify(result)
                            }).then(() => {
                                setLoading(false);
                            }).catch(error => {
                                setLoading(false);
                                console.log('error', error)
                            })
                    }}
                    style={styles.formButton}>
                    {
                        loading
                            ? <ActivityIndicator size="large"/>
                            : <Text style={styles.formButtonLabel}>SIMPAN</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 5}}>
                <Text style={{fontSize: 14, color: '#161D6F', textAlign: 'center', width: '100%'}}>Version 1.0.24</Text>
            </View>
        </View>
    )
}
export default EvaluationScreen;