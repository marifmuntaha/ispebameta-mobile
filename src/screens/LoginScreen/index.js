import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import IconLogo from '../../images/IconLogo.png';
import {actionType, Dispatch} from "../../reducer";
import {useContext, useState} from "react";
import Toast from "react-native-root-toast";
import {UserContext} from "../UserScreen/UserContext";

const LoginScreen = ({navigation}) => {
    const {setUser} = useContext(UserContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#161D6F',
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerBlock: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        headerLogo: {
            marginBottom: 10
        },
        headerTitle: {
            fontWeight: "bold",
            fontSize: 30,
            color: "#fff",
        },
        headerSubtitle: {
            fontSize: 20,
            color: "#fff",
            marginBottom: 40,
        },
        formBlock: {
            width: "80%",
        },
        formInputLabel: {
            fontSize: 18,
            color: "white",
            marginBottom: 5
        },
        formInput: {
            backgroundColor: "#FFF",
            borderRadius: 15,
            height: 60,
            marginBottom: 20,
            justifyContent: "center",
            padding: 20
        },
        formInputPlaceholder: {
            fontSize: 18,
            height: 60,
            color: "black"
        },
        formButtonLogin: {
            backgroundColor: "#FFC14F",
            borderRadius: 15,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
        },
        formButtonRegister: {
            backgroundColor: "#161D6F",
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "white",
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
        },
        formButtonLabel: {
            fontWeight: 'bold',
            color: "white",
            fontSize: 18
        }
    });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.headerBlock}>
                <Image source={IconLogo} style={styles.headerLogo}/>
                <Text style={styles.headerTitle}>MASUK</Text>
                <Text style={styles.headerSubtitle}>Silahkan masuk menggunakan akun anda</Text>
            </View>
            <View style={styles.formBlock}>
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
                        Dispatch(actionType.AUTH_LOGIN, {
                            formData: formData,
                            setLoading: setLoading,
                        }).then(resp => {
                            resp ? navigation.replace('DashboardScreen') : null
                            
                        }).catch(error => {
                            Toast.show(error.response ? error.response.data.message : error.message, {
                                duration: 2000,
                            });
                            setLoading(false);
                        })
                    }}
                    style={styles.formButtonLogin}>
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
        </KeyboardAvoidingView>
    )
}
export default LoginScreen