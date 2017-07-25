import {Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Utils from '../Utils';
import Article from './Article';
import Loader from '../components/Loader';

export default class Lost extends Component {
    static navigationOptions = (props) => {
        return {
            title: 'Lost & Found',
            headerLeft: <Icon name='arrow-back' onPress={() => props.navigation.navigate('Home')} size={25} />,
            headerMode: 'float'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            lostList: null
        };

        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    componentDidMount() {
        this.store.getArticles('LOST_AND_FOUND')
            .then(response => this.setState({lostList: response.data}))
            .catch(e=>Utils.dd(e));
    }

    render() {
        if(this.state.lostList !== null)
            return <Article data={this.state.lostList} type='LOST_AND_FOUND' store={this.store} navigation={this.navigation} />;
        else
            return <Loader />
    }
}