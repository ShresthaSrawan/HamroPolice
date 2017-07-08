import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Wanted extends Component {
    static navigationOptions =  {
        tabBarLabel: 'Most Wanted',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='flag' size={25} style={{tintColor: tintColor}} />
        )
    };
    render() {
        return <Text>Wanted & Events</Text>
    }
}