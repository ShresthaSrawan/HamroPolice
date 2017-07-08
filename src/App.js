import Store from './Store';
import Utils from './Utils';
import SOS from './screens/SOS';
import {View} from 'react-native';
import Home from './screens/Home';
import Thank from './screens/Thank';
import Thread from './screens/Thread';
import Report from './screens/Report';
import React, {Component} from 'react';
import Traffic from './screens/Traffic';
import Station from './screens/Station';
import {autobind} from 'core-decorators';
import Loader from './components/Loader';
import Register from './screens/Register';
import {observer} from 'mobx-react/native';
import Complaint from './screens/Complaint';
import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation';
import News from "./screens/News";
import Alerts from "./screens/Alerts";
import Lost from "./screens/Lost";
import Missing from "./screens/Missing";
import Wanted from "./screens/Wanted";
import Header from "./components/Header";
import Icon from "react-native-vector-icons/MaterialIcons";

const UnauthenticatedNavigator = StackNavigator({
    SOS: {screen: SOS, navigationOptions: {header: null}},
    Register: {screen: Register, navigationOptions: {header: null}},
}, {mode: 'modal'});

const MainNavigator = DrawerNavigator({
    Home: {screen: Home},
    Report: {screen: Report},
    Complaint: {screen: Complaint},
    Station: {screen: Station},
    Thank: {screen: Thank},
    Traffic: {screen: Traffic},
    Thread: {screen: Thread},
}, {
    mode: 'modal'
});

const NewsNavigator = TabNavigator({
    News: {screen: News},
    Alerts: {screen: Alerts},
    Lost: {screen: Lost},
    Missing: {screen: Missing},
    Wanted: {screen: Wanted},
}, {
    mode: 'modal'
});

@autobind @observer
export default class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            isOpen: false
        };
        this.store = new Store();
    }

    returnRelevantNavigator() {
        if(this.store.isAuthenticated) {
            if(this.store.tabView) {
                return <View style={{ flex: 1 }}>
                    <Header left={<Icon name='arrow-back' onPress={() => this.store.toggleTabView()} size={25} />} title='News & Shit' />
                    <NewsNavigator screenProps={{store: this.store}} />
                </View>;
            } else {
                return <MainNavigator screenProps={{store: this.store}} />
            }
        } else {
            return <UnauthenticatedNavigator screenProps={{store: this.store}} />
        }
    }

    render() {
        if (this.store.isAuthenticating)
            return <Loader />;
        else
            return (
                <View style={{flex: 1}}>
                    { this.returnRelevantNavigator() }
                </View>
            );
    }
}
