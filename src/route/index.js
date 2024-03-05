import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import TeacherScreen from "../screens/TeacherScreen";
import TeacherAddScreen from "../screens/TeacherScreen/Add"
import SupervisiScreen from "../screens/SupervisiScreen";
import EvaluationScreen from "../screens/SupervisiScreen/EvaluationScreen";
import ReportScreen from "../screens/ReportScreen";
import {useEffect, useState} from "react";
import {actionType, Dispatch} from "../reducer";
import {UserContext} from "../screens/UserScreen/UserContext";

const Route = () => {
    const Stack = createNativeStackNavigator();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        Dispatch(actionType.AUTH_INFO, {
            setData: setUser,
            setAuth: setAuth
        }).then(() => setLoading(false));
    },[]);
    return !loading && (
        <UserContext.Provider value={user}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={auth ? 'DashboardScreen' : 'LoginScreen'}>
                    <Stack.Screen
                        name="DashboardScreen"
                        component={DashboardScreen}
                        options={{headerShown: false, statusBarTranslucent: true, statusBarStyle: 'light'}}
                        initialParams={user}
                    />
                    <Stack.Screen
                        name="TeacherScreen"
                        component={TeacherScreen}
                        options={{headerShown: false, statusBarTranslucent: true, statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="TeacherAddScreen"
                        component={TeacherAddScreen}
                        options={{headerShown: false, statusBarTranslucent: true, statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="SupervisiScreen"
                        component={SupervisiScreen}
                        options={{headerShown: false, statusBarTranslucent: true, statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="EvaluationScreen"
                        component={EvaluationScreen}
                        options={{headerShown: false, statusBarTranslucent: true, statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="ReportScreen"
                        component={ReportScreen}
                        options={{headerShown: false, statusBarTranslucent: true, statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{headerShown: false, statusBarTranslucent: true, statusBarStyle: 'light'}}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{headerShown: false, statusBarTranslucent: true, statusBarStyle: 'light'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
}
export default Route;