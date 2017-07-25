import {ScrollView, Text, View} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Avatar, ListItem} from 'react-native-elements';
import Utils from '../Utils';
import Loader from '../components/Loader';
import FormInput from 'react-native-elements/src/form/FormInput';
import {GiftedChat} from 'react-native-gifted-chat';
import {autobind} from 'core-decorators';
import {NavigationActions} from 'react-navigation';

@autobind
export default class Thread extends Component {
    static navigationOptions = (props) => {
        return {
            title: 'Thread',
            headerLeft:
                <Icon name='arrow-back' onPress={() => props.navigation.navigate('ThreadList')} size={25} />,
            headerRight:
                <Text onPress={() => props.navigation.dispatch(
                    NavigationActions.reset(
                        {
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Thread', params: {id: props.navigation.state.params.id}})
                            ]
                        }
                    ))}>
                    Refresh
                </Text>,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            thread: null
        };
        this.store = this.props.screenProps.store;
    }

    componentWillMount() {
        this.store.getThread(this.props.navigation.state.params.id)
            .then((response) => this.setState({thread: this.formatMessages(response.data)}))
            .catch(e => Utils.dd(e));
    }

    formatMessages(thread) {
        let formattedMessage = [];
        thread.messages.forEach(message => {
            formattedMessage.push({
                _id: message.id,
                text: message.text,
                createdAt: new Date(parseFloat(message.created_at_utc)),
                user: {
                    _id: message.messageable.is_customer ? 'CUSTOMER': 'ADMIN',
                    name: message.messageable.is_customer ? message.messageable.name : 'ADMIN',
                    // avatar: message.messageable.is_customer? null: { uri: require('./../images/pin.png') }
                }
            })
        });

        return {
            _id: thread.id,
            title: thread.title,
            description: thread.description,
            messages: formattedMessage
        };
    }

    prepareData(messages) {
        let data = new FormData();

        let thread = this.state.thread;
        messages.forEach(function (m, i) {
            data.append(`messages[${i}][thread_id]`, thread._id);
            data.append(`messages[${i}][text]`, m.text);
        });

        return data;
    }

    onSend(messages = []) {
        this.store.sendMessage(this.state.thread._id, this.prepareData(messages))
            .then((response) => {
                this.setState((previousState) => {
                    return {
                        thread: {
                            messages: GiftedChat.append(previousState.thread.messages, messages),
                        }
                    };
                });
            })
            .catch(e => Utils.dd(e));
    }

    render() {
        if(this.state.thread) {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.state.thread.title}</Text>
                    </View>
                    <GiftedChat
                        messages={this.state.thread.messages}
                        onSend={this.onSend}
                        user={{
                            _id: 'CUSTOMER',
                        }}
                    />
                </View>
            );
        } else {
            return <Loader />;
        }
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    titleContainer: {
        padding: 10,
        backgroundColor: '#b5d8ff'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
    }
};