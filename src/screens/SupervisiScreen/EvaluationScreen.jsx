import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../layouts/Header";
import Accordion from "../../layouts/Accordion";
import {useEffect, useState} from "react";
import {actionType, Dispatch} from "../../reducer";
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
            width: "90%",
            backgroundColor: "#FFC14F",
            borderRadius: 30,
            height: 60,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
        },
        formButtonLabel: {
            fontWeight: 'bold',
            color: "white",
            fontSize: 18
        }
    });
    const content = StyleSheet.create({
        container: {
            padding: 20
        }
    });
    const [evaluation, setEvaluation] = useState([]);
    const [data, setData] = useState([])
    const [aspect, setAspect] = useState([]);
    const [teacher, setTeacher] = useState();
    const [instruments, setInstruments] = useState([]);
    const [instrument, setInstrument] = useState([]);
    const [reference, setReference] = useState([]);
    const [result, setResult] = useState([]);
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
            <Header navigation={navigation} backTo="SupervisiScreen" title="PENILAIAN" subtitle={teacher !== undefined && teacher.name + " - " + teacher.subject.name}/>
            <View style={{width: "90%", backgroundColor:"#FFC14F", borderRadius:20, height:50, alignSelf: "center", alignItems:"center", justifyContent:"center", marginTop: 20}}>
                <Text style={{fontWeight: 'bold', color:"white", fontSize: 16}}>{aspect.name}</Text>
            </View>
            <ScrollView style={{padding: 20}}>
                <Accordion data={data} result={result} setResult={setResult} evaluation={evaluation}/>
                <TouchableOpacity
                    onPress = {() => {
                        evaluation.length > 0
                            ? Dispatch(actionType.EVALUATION_UPDATE, {
                                formData: {
                                    id: evaluation[0].id,
                                    user: user.id,
                                    teacher: teacherID,
                                    aspect: aspectID,
                                    finish: 0,
                                    result: JSON.stringify(result)
                                }
                            }).then()
                            : Dispatch(actionType.EVALUATION_STORE, {
                                formData: {
                                    user: user.id,
                                    teacher: teacherID,
                                    aspect: aspectID,
                                    finish: 0,
                                    result: JSON.stringify(result)
                                }
                            }).then()
                    }}
                    style={styles.formButton}>
                    <Text style={styles.formButtonLabel}>SIMPAN</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default EvaluationScreen;