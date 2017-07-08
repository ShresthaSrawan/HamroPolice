import React from 'react';
import {Alert} from 'react-native';
import store from 'react-native-simple-store';
import axios from 'axios';
import Utils from './Utils';
import {observable} from 'mobx';
import {autobind} from 'core-decorators';

const API_URL = 'http://hamropolice.featherwebs.com/api/';

@autobind
export default class Store {
    @observable isAuthenticated = false;
    @observable user = null;
    @observable isAuthenticating = false;
    @observable api_token = null;
    @observable tabView = false;

    constructor() {
        this.authenticate();
    }

    authenticate(user) {
        this.isAuthenticating = true;
        if(user)
        {
            console.log('saving user');
            store.save('user', user)
                .then(() => this.getApiToken(user));
        } else {
            console.log('fetching user');
            store.get('user')
                .then((user) => {
                    console.log('user fetched', user);
                    if(user) {
                        this.getApiToken(user)
                    } else {
                        this.isAuthenticating = false;
                    }
                });
        }
    }

    getApiToken(user) {
        console.log('fetching api token for user ' + user.name);
        axios.post(API_URL+'login', user)
            .then((response) => {
                console.log(response.data.api_token);
                this.api_token = response.data.api_token;
                this.isAuthenticated = true;
                this.isAuthenticating = false;
                this.user = user;
            })
            .catch(e => {
                this.isAuthenticating = false;
                Alert.alert('Connection Interrupted!', e.message, [{text: 'Ok', onPress: () => {}}]);
                console.log(e);
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

        return axios.post(API_URL+'report', data, config);
    }

    sendComplaint(data) {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };

        data.append('api_token', this.api_token);

        return axios.post(API_URL+'complaint', data, config);
    }

    sendThank(data) {
        data.append('api_token', this.api_token);

        return axios.post(API_URL+'thank', data);
    }

    toggleTabView() {
        this.tabView = !this.tabView;
    }
}