import React from 'react';
import {Platform} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import Home from '../screens/Home';
import Report from '../screens/Report';
import Complaint from '../screens/Complaint';
import Thank from '../screens/Thank';
import Traffic from '../screens/Traffic';
import Profile from '../screens/Profile';
import NewsNavigator from './NewsNavigator';
import ThreadNavigator from './ThreadNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DrawerContent from '../components/DrawerContents';
import StationNavigator from "./StationNavigator";

const MainNavigator = DrawerNavigator({
    Home: {screen: Home},
    Report: {screen: Report},
    Complaint: {screen: Complaint},
    Station: {screen: StationNavigator},
    Thank: {screen: Thank},
    Traffic: {screen: Traffic},
    Thread: {
        screen: ThreadNavigator, navigationOptions: {
            drawerLabel: 'Threads',
            drawerIcon: ({tintColor}) => <Icon name='chat' size={25} />,
        }
    },
    NewsNavigator: {
        screen: NewsNavigator, navigationOptions: {
            drawerLabel: 'News & Events',
            drawerIcon: ({tintColor}) => <Icon name='markunread-mailbox' size={25} />
        }
    },
    Profile: {screen: Profile},
}, {
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    contentComponent: (props) => <DrawerContent {...props} />
});

export default MainNavigator;