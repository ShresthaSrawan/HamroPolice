import React, { Component } from 'react';
import {autobind} from 'core-decorators';
import {DrawerItems} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableItem from 'react-navigation/src/views/TouchableItem';
import { View, Image, Text, ScrollView, StyleSheet, Platform } from 'react-native';

@autobind
export default class DrawerContent extends Component {
    constructor(props) {
        super(props);
        console.log('drawer component', props);
        this.store = props.screenProps.store;
    }

    render() {
        const { container, profile, avatar, name } = styles;
        const user = this.store.user;

        return (
            <ScrollView style={container}>
                <View style={profile}>
                    <Image source={{ uri: user.thumbnail }} style={avatar} />
                    <Text style={name}>{user.name || ''}</Text>
                </View>
                <DrawerItems {...this.props} />
                <View style={styles.logout}>
                    <TouchableItem
                        key={'logout'}
                        onPress={this.store.promptForLogout}
                        delayPressIn={0}>
                        <View style={styles.item}>
                            <View style={styles.icon}>
                                <Icon name='exit-to-app' size={25} />
                            </View>
                            <Text style={styles.label}>
                                Logout
                            </Text>
                        </View>
                    </TouchableItem>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    profile: {
        height: 300,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 16,
        width: 24,
        alignItems: 'center',
    },
    label: {
        margin: 16,
        fontWeight: 'bold',
    },
    logout: {
        borderTopColor: '#bbb',
        borderTopWidth: StyleSheet.hairlineWidth,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        paddingVertical: 4,
    }
};