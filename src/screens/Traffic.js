import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Traffic extends Component {
    static navigationOptions =  {
        drawerLabel: 'Complaint',
        drawerIcon: ({ tintColor }) => (
            <Icon name='traffic' size={25} />
        )
    };
    render() {
        return <Text>Traffic</Text>
    }
}