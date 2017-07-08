import React, {Component} from 'react';
import {View} from 'react-native';
import {Tab, Tabs} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.store = props.store;
    }

    render() {
        const { tabWrap, tabIcon, tabOuter } = styles;
        return (
            <View style={tabWrap}>
                <Tabs tabBarStyle={tabOuter}>
                    <Tab
                        titleStyle={{fontWeight: 'bold', fontSize: 10}}
                        title='Home'
                        renderIcon={() => <Icon containerStyle={tabIcon} color={'#5e6977'} name='home' size={33} />}
                        onPress={() => console.log('switch tab')}>
                    </Tab>
                    <Tab
                        titleStyle={{fontWeight: 'bold', fontSize: 10}}
                        title='Call'
                        renderIcon={() => <Icon containerStyle={tabIcon} color={'#5e6977'} name='call' size={33} />}
                        onPress={() => console.log('switch tab')}>
                    </Tab>
                    <Tab
                        titleStyle={{fontWeight: 'bold', fontSize: 10}}
                        title='message'
                        renderIcon={() => <Icon containerStyle={tabIcon} color={'#5e6977'} name='comment' size={33} />}
                        onPress={() => console.log('switch tab')}>
                    </Tab>
                    <Tab
                        titleStyle={{fontWeight: 'bold', fontSize: 10}}
                        title='News & Events'
                        renderIcon={() => <Icon containerStyle={tabIcon} color={'#5e6977'} name='markunread-mailbox' size={33} />}
                        onPress={this.store.toggleTabView}>
                    </Tab>
                    <Tab
                        titleStyle={{fontWeight: 'bold', fontSize: 10}}
                        title='Profile'
                        renderIcon={() => <Icon containerStyle={tabIcon} color={'#5e6977'} name='account-circle' size={33} />}
                        onPress={() => console.log('switch tab')}>
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

const styles = {
    tabWrap: {
        backgroundColor: 'white',
        height: 70,
        paddingTop: 10,
        paddingBottom: 8
    },
    tabIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    tabOuter: {
        height: 70,
        borderWidth: 0
    }
}