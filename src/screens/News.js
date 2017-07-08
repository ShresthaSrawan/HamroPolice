import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class News extends Component {
    static navigationOptions =  {
        tabBarLabel: 'News & Events',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='flag' size={25} style={{tintColor: tintColor}} />
        )
    };
    render() {
        return <Text>News & Events</Text>
    }
}