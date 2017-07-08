import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Profile extends Component {
    static navigationOptions =  {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) => (
            <Icon name='flag' size={25} />
        )
    };
    render() {
        return <Text>Profile</Text>
    }
}