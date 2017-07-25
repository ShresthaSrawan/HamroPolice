import React, {Component} from 'react';
import {Dimensions, WebView} from 'react-native';
import Loader from '../components/Loader';
import {autobind} from 'core-decorators';

@autobind
export default class SingleArticle extends Component {
    static navigationOptions = () => {
        return {
            headerStyle: styles.header,
            headerBackTitleStyle: styles.backTitle,
            headerTintColor: 'white'
        }
    };

    constructor(props) {
        super(props);

        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    render() {
        return <WebView source={{uri: this.store.getArticle(this.navigation.state.params.id)}} style={styles.container} renderLoading={<Loader />}/>;
    }
}

const win = Dimensions.get('window');

const styles = {
    container: {
        flex: 1
    },
    header: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        backgroundColor: 'transparent',
        zIndex: 2
    },
    backTitle: {
        textShadowColor: 'black',
        textShadowRadius: 5
    }
};