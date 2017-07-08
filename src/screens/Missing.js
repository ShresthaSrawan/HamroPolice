import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Missing extends Component {
    static navigationOptions =  {
        tabBarLabel: 'Missing Person',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='flag' size={25} style={{tintColor: tintColor}} />
        )
    };
    render() {
        return <Text>Missing & Events</Text>
    }
}