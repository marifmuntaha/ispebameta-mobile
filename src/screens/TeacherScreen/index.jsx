import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import IconUser from "../../images/IconUserDefault.png";
import IconTrash from "../../images/IconTrash.png";
import Header from "../../layouts/Header";
import {useEffect, useState} from "react";
import {APICore} from "../../utils/APICore";

const TeacherScreen = ({navigation}) => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        reload && api.get('/teacher', {user: user.id, with: 'subject'}).then((resp) => {
            setTeachers(resp.data.result);
        }).catch((err) => {
            console.log(err)
        })
    }, [reload]);
    return (
        <View style={{flex: 3}}>
            <Header navigation={navigation} backTo="DashboardScreen" title="DATA GURU" subtitle="Anda dapat menambah, mengubah & menghapus data guru"/>
            <TouchableOpacity onPress={() => navigation.replace('TeacherAddScreen')} style={{width: "90%", backgroundColor:"#FFC14F", borderRadius:20, height:50, alignSelf: "center", alignItems:"center", justifyContent:"center", marginTop: 20}}>
                <Text style={{fontWeight: 'bold', color:"white", fontSize: 16}}>TAMBAH GURU</Text>
            </TouchableOpacity>
            <ScrollView style={{padding: 20}}>
                {teachers && teachers.map((teacher) => (
                    <View style={{flex: 3, flexDirection: 'row', justifyContent: "space-between", alignItems: "center", borderRadius: 5, paddingLeft: 10, paddingRight: 10, width: "100%", backgroundColor: '#E9EAEC', marginBottom: 20}} key={teacher.id}>
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
                                <Text style={{fontWeight: 'bold', fontSize: 14, color: "#161D6F", width: '100%'}}>{teacher.name}</Text>
                                <Text style={{fontSize: 14, color: "#161D6F", width: '100%'}}>{teacher.subject.name}</Text>
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
                                setLoading(teacher.id);
                                api.delete(`${'/teacher/' + teacher.id}`).then(() => {
                                    setLoading(false);
                                    setReload(true);
                                }).catch(error => {
                                    console.log(error);
                                    setLoading(false);
                                })
                            }}
                        >
                            {
                                loading === teacher.id
                                    ? <ActivityIndicator size="large"/>
                                    : <Image source={IconTrash} style={{width: 25, height: 30}}/>
                            }
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
export default TeacherScreen;