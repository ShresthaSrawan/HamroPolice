import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Utils from '../Utils';
import Article from './Article';
import Loader from '../components/Loader';

export default class Wanted extends Component {
    static navigationOptions = (props) => {
        return {
            title: 'Most Wanted',
            headerLeft: <Icon name='arrow-back' onPress={() => props.navigation.navigate('Home')} size={25} />,
            headerMode: 'float'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            wantedList: null
        };

        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    componentDidMount() {
        this.store.getArticles('MOST_WANTED')
            .then(response => this.setState({wantedList: response.data}))
            .catch(e=>Utils.dd(e));
    }

    render() {
        if(this.state.wantedList !== null)
            return <Article data={this.state.wantedList} type='MOST_WANTED' store={this.store} navigation={this.navigation} />;
        else
            return <Loader />
    }
}