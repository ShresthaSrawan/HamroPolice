import React, {Component} from 'react';
import {View} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import { NavigationActions } from 'react-navigation'

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    title: 'Report',
                    icon: 'report',
                    onPress(){
                        console.log();
                    }
                },
                {
                    title: 'Trips',
                    icon: 'flight-takeoff',
                    onPress(){console.log('pressed')}
                },
                {
                    title: 'Logout',
                    icon: 'input',
                    onPress() {
                        console.log(props);
                        props.store.promptForLogout();
                    }
                }
            ]
        };
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        this.state.list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                onPress={item.onPress}
                                leftIcon={{name: item.icon}}
                            />
                        ))
                    }
                </List>
            </View>
        );
    }
}