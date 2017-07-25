import {Text, Platform, ScrollView, View} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Alerts from './Alerts';
import Lost from './Lost';
import Missing from './Missing';
import Wanted from './Wanted';
import CustomTabBar from '../components/CustomTabBar';
import Utils from './../Utils';
import {autobind} from 'core-decorators';
import {Avatar, List, ListItem} from 'react-native-elements';
import Loader from '../components/Loader';
import Article from './Article';
import SingleArticle from './SingleArticle';

@autobind
class NewsScreen extends Component {
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

const NewsTabs = TabNavigator({
    News: {screen: NewsScreen},
    Alerts: {screen: Alerts},
    Lost: {screen: Lost},
    Missing: {screen: Missing},
    Wanted: {screen: Wanted},
},{
    tabBarPosition: 'top',
    tabBarOptions: {
        scrollEnabled: true
    }
});

const NewsNavigator = StackNavigator({
    NewsTabs: {screen: NewsTabs},
    SingleArticle: {
        path: 'article/:id',
        screen: SingleArticle
    }
});

export default NewsNavigator;