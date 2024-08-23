import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import TeacherScreen from "../screens/TeacherScreen";
import TeacherAddScreen from "../screens/TeacherScreen/Add"
import SupervisiScreen from "../screens/SupervisiScreen";
import EvaluationScreen from "../screens/SupervisiScreen/EvaluationScreen";
import ReportScreen from "../screens/ReportScreen";
import {UserContext} from "../screens/UserScreen/UserContext";
import UserScreen from "../screens/UserScreen";
import SplashScreen from "../screens/SplashScreen";

const Route = ({auth, user}) => {
    const Stack = createNativeStackNavigator();
    return (
        <UserContext.Provider value={user}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen">
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="DashboardScreen"
                        component={DashboardScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                        initialParams={user}
                    />
                    <Stack.Screen
                        name="TeacherScreen"
                        component={TeacherScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="TeacherAddScreen"
                        component={TeacherAddScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="SupervisiScreen"
                        component={SupervisiScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="EvaluationScreen"
                        component={EvaluationScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="ReportScreen"
                        component={ReportScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="UserScreen"
                        component={UserScreen}
                        options={{headerShown: false, statusBarColor: '#161D6F', statusBarStyle: 'light'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    )
}
export default Route;