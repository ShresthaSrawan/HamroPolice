import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Utils from '../Utils';
import Article from './Article';
import Loader from '../components/Loader';

export default class Missing extends Component {
    static navigationOptions = (props) => {
        return {
            title: 'Missing Person',
            headerLeft: <Icon name='arrow-back' onPress={() => props.navigation.navigate('Home')} size={25} />,
            headerMode: 'float'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            missingList: null
        };

        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    componentDidMount() {
        this.store.getArticles('MISSING_PERSON')
            .then(response => this.setState({missingList: response.data}))
            .catch(e=>Utils.dd(e));
    }

    render() {
        if(this.state.missingList !== null)
            return <Article data={this.state.missingList} type='MISSING_PERSON' store={this.store} navigation={this.navigation} />;
        else
            return <Loader />
    }
}