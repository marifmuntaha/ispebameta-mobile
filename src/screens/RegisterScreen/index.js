import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView, Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import IconLogo from '../../images/IconLogo.png';
import {actionType, Dispatch} from "../../reducer";
import React, {useState} from "react";
import Toast from 'react-native-root-toast';
import {SafeAreaView} from "react-native-safe-area-context";
import LogoUniv from "../../images/logo-univ.png";
import {APICore} from "../../utils/APICore";

const RegisterScreen = ({navigation}) => {
    const api = new APICore();
    const styles = StyleSheet.create({
        formInputLabel: {
            fontSize: 14,
            color: "white",
            marginBottom: 5
        },
        formInput: {
            backgroundColor: "#FFF",
            borderRadius: 5,
            height: 45,
            marginBottom: 10,
            justifyContent: "center",
            padding: 20
        },
        formInputPlaceholder: {
            fontSize: 14,
            height: 60,
            color: "black"
        },
        formButtonLogin: {
            backgroundColor: "#FFC14F",
            borderRadius: 5,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
        },
        formButtonRegister: {
            backgroundColor: "#161D6F",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "white",
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
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        nip: '',
        institution: '',
        position: '',

    });
    return (
        <SafeAreaView style={{flex: 2, backgroundColor: '#161D6F'}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 2}}>
                <ScrollView style={{flex: 2, width: '100%', height: '100%', marginTop: 20}}>
                    <View style={{alignItems: "flex-start", justifyContent: 'flex-start'}}>
                        <Image source={LogoUniv} style={{marginLeft: 20}}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                        <Image source={IconLogo} style={{marginBottom: 10, width: 100, height: 100}}/>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "#fff",
                            textAlign: 'center'
                        }}>PENDAFTARAN</Text>
                        <Text style={{fontSize: 14, color: "#fff", marginBottom: 10, textAlign: 'center'}}>Silahkan
                            melakukan pendaftaran untuk memulai menggunakan
                            ISPEBAMETA</Text>
                        <View style={{width: '85%'}}>
                            {error && (
                                <View style={{backgroundColor: 'red', padding: 8, marginBottom: 5, borderRadius: 2}}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}>Kesalahan! {error.message}</Text>
                                </View>
                            )}
                            {success && (
                                <View style={{backgroundColor: 'green', padding: 8, marginBottom: 5, borderRadius: 2}}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}>Berhasil! {success}</Text>
                                </View>
                            )}
                            <Text style={styles.formInputLabel}>Nama Lengkap</Text>
                            <View style={styles.formInput}>
                                <TextInput
                                    style={styles.formInputPlaceholder}
                                    placeholder="Masukkan Nama Lengkap"
                                    placeholderTextColor="#929090"
                                    onChangeText={(e) => setFormData({...formData, name: e})}
                                />
                            </View>
                            <Text style={styles.formInputLabel}>Alamat Email</Text>
                            <View style={styles.formInput}>
                                <TextInput
                                    style={styles.formInputPlaceholder}
                                    placeholder="Masukkan Alamat Email"
                                    placeholderTextColor="#929090"
                                    onChangeText={(e) => setFormData({...formData, email: e})}
                                />
                            </View>
                            <Text style={styles.formInputLabel}>Kata Sandi</Text>
                            <View style={styles.formInput}>
                                <TextInput
                                    style={styles.formInputPlaceholder}
                                    placeholder="Masukkan Kata Sandi"
                                    placeholderTextColor="#929090"
                                    onChangeText={(e) => setFormData({...formData, password: e})}
                                />
                            </View>
                            <Text style={styles.formInputLabel}>Ulangi Sandi</Text>
                            <View style={styles.formInput}>
                                <TextInput
                                    style={styles.formInputPlaceholder}
                                    placeholder="Ulangi Kata Sandi"
                                    placeholderTextColor="#929090"
                                    onChangeText={(e) => setFormData({...formData, password_confirmation: e})}
                                />
                            </View>
                            <Text style={styles.formInputLabel}>NIP</Text>
                            <View style={styles.formInput}>
                                <TextInput
                                    style={styles.formInputPlaceholder}
                                    placeholder="Masukkan NIP"
                                    placeholderTextColor="#929090"
                                    onChangeText={(e) => setFormData({...formData, nip: e})}
                                />
                            </View>
                            <Text style={styles.formInputLabel}>Nama Lembaga</Text>
                            <View style={styles.formInput}>
                                <TextInput
                                    style={styles.formInputPlaceholder}
                                    placeholder="Masukkan Nama Lembaga"
                                    placeholderTextColor="#929090"
                                    onChangeText={(e) => setFormData({...formData, institution: e})}
                                />
                            </View>
                            <Text style={styles.formInputLabel}>Jabatan</Text>
                            <View style={styles.formInput}>
                                <TextInput
                                    style={styles.formInputPlaceholder}
                                    placeholder="Masukkan Jabatan"
                                    placeholderTextColor="#929090"
                                    onChangeText={(e) => setFormData({...formData, position: e})}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setLoading(true);
                                    api.create('/auth/register', formData).then((resp) => {
                                        setSuccess(resp.data.message);
                                        setLoading(false);
                                    }).catch(error => {
                                        setError(error.response.data);
                                        setLoading(false);
                                    })
                                }}
                                style={styles.formButtonLogin}>
                                <Text style={styles.formButtonLabel}>{
                                    loading
                                        ? <ActivityIndicator size="large" color="#FFF"/>
                                        : 'DAFTAR'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.replace('LoginScreen')}
                                style={styles.formButtonRegister}>
                                <Text style={styles.formButtonLabel}>MASUK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 5}}>
                <Text style={{fontSize: 14, color: 'white', textAlign: 'center', width: '100%'}}>Version 1.0.24</Text>
            </View>
        </SafeAreaView>
    )
}
export default RegisterScreen