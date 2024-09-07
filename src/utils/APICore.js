
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
    const auth = SecureStore.getItem('auth')
    return auth ? (typeof auth == 'object' ? auth : JSON.parse(auth)) : null
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

    update = (url, data) => {
        return axios.put(url, data)
    }

    delete = (url) => {
        return axios.delete(url)
    }

    setLoggedInUser = (session) => {
        session
            ? SecureStore.setItem('auth', JSON.stringify(session))
            : SecureStore.deleteItemAsync('auth');
    }

    getLoggedInUser = () => {
        return getUserFromCookie();
    }
}

const auth = getUserFromCookie();
if (auth) {
    const {token} = auth;
    if (token) {
        setAuthorization(token)
    }
}

export {APICore, setAuthorization}