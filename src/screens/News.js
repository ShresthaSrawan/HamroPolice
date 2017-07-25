import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Utils from './../Utils';
import {autobind} from 'core-decorators';
import Loader from '../components/Loader';
import Article from './Article';

@autobind
export default class News extends Component {
    static navigationOptions = (props) => {
        return {
            title: 'News',
            headerLeft: <Icon name='arrow-back' onPress={() => props.navigation.navigate('Home')} size={25} />,
            headerMode: 'float'
        }
    };
    constructor(props) {
        super(props);

        this.state = {
            newsList: null
        };

        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    componentDidMount() {
        this.store.getArticles('NEWS')
            .then(response => this.setState({newsList: response.data}))
            .catch(e=>Utils.dd(e));
    }

    render() {
        if(this.state.newsList !== null)
            return <Article data={this.state.newsList} type='NEWS' store={this.store} navigation={this.navigation} />
        else
            return <Loader />
    }
}