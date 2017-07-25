import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Utils from '../Utils';
import Article from './Article';
import Loader from '../components/Loader';

export default class Alerts extends Component {
    static navigationOptions = (props) => {
        return {
            title: 'Alerts',
            headerLeft: <Icon name='arrow-back' onPress={() => props.navigation.navigate('Home')} size={25} />,
            headerMode: 'float'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            alertList: null
        };

        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    componentDidMount() {
        this.store.getArticles('ALERT')
            .then(response => this.setState({alertList: response.data}))
            .catch(e=>Utils.dd(e));
    }

    render() {
        if(this.state.alertList !== null)
            return <Article data={this.state.alertList} type='ALERT' store={this.store} navigation={this.navigation} />;
        else
            return <Loader />
    }
}

const styles = {
    icon: {
        width: 26,
        height: 26,
    },
};