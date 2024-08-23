import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ArrowLeftIcon from "../../images/icon-arrow-left.png";
import UserIcon from "../../images/IconUserOutlineWhite.png";

const Header = ({navigation, backTo, title, subtitle}) => {
    const header = StyleSheet.create({
        container: {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            width: "100%",
            height: 200,
            backgroundColor: '#161D6F',
        },
        navbarTitle: {
            flexDirection: 'row',
            marginTop: 45,
            marginLeft: 10
        },
        navbarTitleIcon: {

        },
        navbarTitleText: {

        },
        navbarUser: {

        },
        navbarUserIcon: {
            width: 30,
            height: 37
        },
        greeting: {
            marginTop: 45,
            marginLeft: 10
        },
        greetingText: {

        },
    });
    return (
        <View style={header.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, padding: 5}}>
                <View style={{flexDirection: 'row', marginLeft: 10, justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.replace(backTo)}>
                        <Image source={ArrowLeftIcon} style={{height: 30, width: 30}}/>
                    </TouchableOpacity>
                    <Text style={{fontWeight: "bold", fontSize: 18, color: "white", marginLeft: 10}}>{title}</Text>
                </View>
                <View style={{marginRight: 20,}}>
                    <TouchableOpacity onPress={() => navigation.replace("UserScreen")}>
                        <Image source={UserIcon} style={{width: 25, height: 30}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={header.greeting}>
                <Text style={{fontWeight: "bold", fontSize: 20, color: "white", marginLeft: 20, marginRight: 20}}>{subtitle}</Text>
            </View>
        </View>
    )
}
export default Header