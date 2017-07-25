import React from 'react';
import axios from 'axios';
import Utils from './Utils';
import {observable} from 'mobx';
import {Alert} from 'react-native';
import {autobind} from 'core-decorators';
import store from 'react-native-simple-store';

const API_URL = 'http://hamropolice.featherwebs.com/api';
const MAIN_URL = 'http://hamropolice.featherwebs.com';
const PHONE_NUMBER = '1000';
const MESSAGE_NUMBER = '1000';

@autobind
export default class Store {
    @observable isAuthenticated = false;
    @observable user = null;
    @observable isAuthenticating = false;
    @observable api_token = null;
    @observable phone_number = PHONE_NUMBER;
    @observable message_number = MESSAGE_NUMBER;

    constructor() {
        this.authenticate();
    }

    setUser(user) {
        this.user = user;
        return store.save('user', user)
    }

    authenticate(user) {
        this.isAuthenticating = true;
        if(user)
        {
            this.setUser(user)
                .then(() => this.getApiToken(user));
        } else {
            store.get('user')
                .then((user) => {
                    if(user) {
                        this.getApiToken(user)
                    } else {
                        this.isAuthenticating = false;
                    }
                });
        }
    }

    getApiToken(user) {
        axios.post(`${API_URL}/login`, user)
            .then(({data}) => {
                let {user} = data;
                this.api_token = user.api_token;
                console.log(user.api_token);
                // do not store token in local storage
                user.token = null;
                this.setUser(user);
                this.isAuthenticated = true;
                this.isAuthenticating = false;
            })
            .catch(e => {
                this.isAuthenticating = false;
                Utils.dd(e);
            });
    }

    promptForLogout() {
        Alert.alert('Sign Out', 'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel', onPress: () => {}, style: 'cancel'
                },
                {text: 'Yes', onPress: this.logout, style: 'destructive'},
            ]
        );
    }

    logout() {
        // this.app.logout();
        this.user = null;
        this.isAuthenticated = false;
    }

    sendReport(data) {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };

        data.append('api_token', this.api_token);

        return axios.post(`${API_URL}/report`, data, config);
    }

    sendComplaint(data) {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };

        data.append('api_token', this.api_token);

        return axios.post(`${API_URL}/complaint`, data, config);
    }

    sendThank(data) {
        data.append('api_token', this.api_token);

        return axios.post(`${API_URL}/thank`, data);
    }

    getStationList() {
        return axios.get(`${API_URL}/station`, {
            params: {
                api_token: this.api_token
            }
        });
    }

    getThreads() {
        return axios.get(`${API_URL}/thread`, {
            params: {
                api_token: this.api_token
            }
        });
    }

    getThread(id) {
        return axios.get(`${API_URL}/thread/${id}`, {
            params: {
                api_token: this.api_token
            }
        });
    }

    sendMessage(id, data) {
        data.append('api_token', this.api_token);

        return axios.post(`${API_URL}/thread/${id}/message`, data);
    }

    createThread(data) {
        data.append('api_token', this.api_token);

        return axios.post(`${API_URL}/thread`, data);
    }

    updateProfile(data) {
        data.append('api_token', this.api_token);

        return axios.post(`${API_URL}/profile`, data);
    }

    getArticles(type) {
        return axios.get(`${API_URL}/article`, {
            params: {
                type: type,
                api_token: this.api_token
            }
        });
    }

    getArticle(id) {
        return `${MAIN_URL}/article/${id}`;
    }

    getStation(id) {
        return axios.get(`${API_URL}/station/${id}`, {
            params: {
                api_token: this.api_token
            }
        });
    }
}