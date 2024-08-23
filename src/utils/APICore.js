import axios from "axios";
import * as SecureStore from "expo-secure-store";

axios.defaults.baseURL = `${process.env.EXPO_PUBLIC_API_URL}`;
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const setAuthorization = (token) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    else delete axios.defaults.headers.common['Authorization']
}

const getUserFromCookie = () => {
    const user = SecureStore.getItem('user')
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null
}

class APICore {
    get = (url, params) => {
        let response
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
            response = axios.get(`${url}?${queryString}`, params)
        } else {
            response = axios.get(`${url}`, params)
        }
        return response
    }

    create = (url, data) => {
        return axios.post(url, data)
    }

    setLoggedInUser = (session) => {
        session
            ? SecureStore.setItem('user', JSON.stringify(session))
            : SecureStore.deleteItemAsync('user');
    }

    getLoggedInUser = () => {
        return getUserFromCookie();
    }
}

const user = getUserFromCookie();
if (user) {
    const {token} = user;
    console.log(token)
    if (token) {
        setAuthorization(token)
    }
}

export {APICore, setAuthorization}