import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Alerts extends Component {
    static navigationOptions =  {
        tabBarLabel: 'Alerts',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='flag' size={25} style={{tintColor: tintColor}} />
        )
    };
    render() {
        return <Text>Alerts & Events</Text>
    }
}