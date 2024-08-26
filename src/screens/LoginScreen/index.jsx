import React, {useState} from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform, ScrollView, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import IconLogo from '../../images/IconLogo.png';
import LogoUniv from '../../images/logo-univ.png';
import {SafeAreaView} from "react-native-safe-area-context";
import {APICore, setAuthorization} from "../../utils/APICore";

const LoginScreen = ({navigation}) => {
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
            marginBottom: 20,
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
            marginTop: 20,
        },
        formButtonLabel: {
            fontWeight: 'bold',
            color: "white",
            fontSize: 14
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    return (
        <SafeAreaView style={{flex: 2, backgroundColor: '#161D6F'}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 2}}>
                <ScrollView style={{flex: 2, width: '100%', height: '100%', marginTop: 20}}>
                    <View style={{alignItems: "flex-start", justifyContent: 'flex-start'}}>
                        <Image source={LogoUniv} style={{marginLeft: 20}}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '25%', width: '100%'}}>
                        <Image source={IconLogo} style={{marginBottom: 10, width: 100, height: 100}}/>
                        <Text style={{fontWeight: "bold", fontSize: 20, color: "#fff", textAlign: 'center', width: '100%'}}>MASUK</Text>
                        <Text style={{fontSize: 14, color: "#fff", marginBottom: 10, textAlign: 'center', width: '100%'}}>Silahkan masuk menggunakan akun anda</Text>
                        <View style={{width: '85%'}}>
                            {error && (
                                <View style={{backgroundColor: 'red', padding: 8, marginBottom: 5, borderRadius: 2}}>
                                    <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>Kesalahan! {error['message']}</Text>
                                </View>
                            )}
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
                                    secureTextEntry={true}
                                    style={styles.formInputPlaceholder}
                                    placeholder="Masukkan Kata Sandi"
                                    placeholderTextColor="#929090"
                                    onChangeText={(e) => setFormData({...formData, password: e})}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setLoading(true);
                                    api.create('/auth/login', formData).then((resp) => {
                                        api.setLoggedInUser(resp.data.result);
                                        setLoading(false);
                                        setAuthorization(resp.data.result.token);
                                        navigation.replace('DashboardScreen');
                                    }).catch(error => {
                                        setError(error.response ? error.response.data : error);
                                        setLoading(false);
                                    })
                                }}
                                style={styles.formButtonLogin}
                                disabled={loading}
                            >
                                <Text style={styles.formButtonLabel}>
                                    {loading
                                        ? <ActivityIndicator size="large" color="#FFF"/>
                                        : 'MASUK'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.replace('RegisterScreen')}
                                style={styles.formButtonRegister}>
                                <Text style={styles.formButtonLabel}>PENDAFTARAN</Text>
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
export default LoginScreen