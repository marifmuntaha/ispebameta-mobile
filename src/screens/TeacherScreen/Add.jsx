import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Header from "../../layouts/Header";
import React, {useEffect, useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {APICore} from "../../utils/APICore";

const Add = ({navigation}) => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const content = StyleSheet.create({
        formInputLabel: {
            alignSelf: 'flex-start',
            fontSize: 14,
            fontWeight: "bold",
            color: "#161D6F",
            marginBottom: 5,
        },
        formInput: {
            backgroundColor: "#F5F6F9",
            borderRadius: 5,
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            padding: 20
        },
        selectInput: {
            backgroundColor: "#F5F6F9",
            borderRadius: 100,
            borderWidth: 1,
            marginBottom: 20,
            justifyContent: "center",
            padding: 20
        },
        formInputPlaceholder: {
            fontSize: 14,
            height: 60,
            color: "black"
        },
        formButton: {
            backgroundColor: "#FFC14F",
            borderRadius: 5,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10
        },
        formButtonLabel: {
            fontWeight: 'bold',
            color: "white",
            fontSize: 14
        }
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [subjectOption, setSubjectOption] = useState([]);
    const [formData, setFormData] = useState({
        user: user.id,
        name: '',
        nip: '',
        subject: '',
        phone: '',
    });
    useEffect(() => {
        api.get('/subject', {type: 'select'}).then(resp => {
            setSubjectOption(resp.data.result)
        }).catch(error => {
            console.log('error', error)
        })
    }, []);
    return (
        <View style={{flex: 2}}>
            <Header navigation={navigation} backTo="TeacherScreen" title="TAMBAH GURU" subtitle="Silahkan memasukkan Informasi guru baru."/>
            <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{alignSelf: "center", width: "80%", marginTop: 30}}>
                    {error && (
                        <View style={{backgroundColor: 'red', padding: 5, marginBottom: 20, borderRadius: 5}}>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>Kesalahan! {error}</Text>
                        </View>
                    )}
                    {success && (
                        <View style={{backgroundColor: 'green', padding: 5, marginBottom: 20, borderRadius: 5}}>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>Berhasil! {success}</Text>
                        </View>
                    )}
                    <Text style={content.formInputLabel}>Nama Lengkap</Text>
                    <View style={content.formInput}>
                        <TextInput
                            style={content.formInputPlaceholder}
                            placeholder="Masukkan Nama Lengkap Guru"
                            placeholderTextColor="#929090"
                            onChangeText={(e) => setFormData({...formData, name: e})}
                        />
                    </View>
                    <Text style={content.formInputLabel}>NIP/NPK</Text>
                    <View style={content.formInput}>
                        <TextInput
                            style={content.formInputPlaceholder}
                            placeholder="Masukkan NIP/NPK"
                            placeholderTextColor="#929090"
                            onChangeText={(e) => setFormData({...formData, nip: e})}
                        />
                    </View>
                    <Text style={content.formInputLabel}>Mata Pelajaran</Text>
                    <Picker style={content.selectInput} selectedValue={formData.subject} onValueChange={(item) => {
                        setFormData({...formData, subject: item});
                    }}>
                        {subjectOption && subjectOption.map((subject, idx) => (
                            <Picker.Item label={subject.label} value={subject.value} style={content.formInputLabel} key={idx}/>
                        ))}
                    </Picker>
                    <Text style={content.formInputLabel}>Nomor Whatsapp</Text>
                    <View style={content.formInput}>
                        <TextInput
                            style={content.formInputPlaceholder}
                            placeholder="Masukkan Nomor Whatsapp"
                            placeholderTextColor="#929090"
                            onChangeText={(e) => setFormData({...formData, phone: e})}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setLoading(true);
                            api.create('/teacher', formData).then((resp) => {
                                setSuccess(resp.data.message);
                                setFormData({
                                    user: user.id,
                                    name: '',
                                    nip: '',
                                    subject: '',
                                    phone: '',
                                });
                                setLoading(false);
                            }).catch(error => {
                                setError(error.response.data.message);
                                setLoading(false);
                            })
                        }}
                        style={content.formButton}
                    >
                        {
                            loading
                                ? <ActivityIndicator size="large"/>
                                : <Text style={content.formButtonLabel}>SIMPAN</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 5}}>
                <Text style={{fontSize: 14, color: '#161D6F', textAlign: 'center', width: '100%'}}>Version 1.0.24</Text>
            </View>
        </View>
    )
}
export default Add;