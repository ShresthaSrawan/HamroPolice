import store from 'react-native-simple-store';

token = store.get('@Auth:token').then();

const config = {
    axios: {
        method: 'POST',
        baseURL: 'http://hamropolice.featherwebs.com/api/',
        timeout: 2000,
        data: {
            'api_token': token
        }
    }
}

export {config};