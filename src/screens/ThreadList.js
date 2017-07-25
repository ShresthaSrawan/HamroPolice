import Thread from './Thread';
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Utils from '../Utils';
import ThreadCreate from './ThreadCreate';
import Loader from '../components/Loader';


export default class ThreadList extends Component {
    static navigationOptions = (props) => {
        return {
            title: 'Threads',
            headerRight: <Text onPress={() => props.navigation.navigate('ThreadCreate')}>Create</Text>,
            headerLeft: <Icon name='arrow-back' onPress={() => props.navigation.navigate('Home')} size={25} />
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            threads: null
        };

        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    componentDidMount() {
        this.store.getThreads()
            .then((response) => this.setState({threads: response.data}))
            .catch(e => Utils.dd(e));
    }

    openThread(thread) {
        this.navigation.navigate('Thread', {id: thread.id})
    }

    render() {
        if(this.state.threads !== null)
            if(this.state.threads.length)
                return (
                    <ScrollView>
                        <View>
                            {this.state.threads.map(thread => (
                                <ListItem
                                    roundAvatar
                                    key={thread.id}
                                    title={thread.title}
                                    subtitle={thread.created_at_formatted}
                                    onPress={() => this.openThread(thread) }
                                    leftIcon={<Avatar small rounded title={thread.title.charAt(0)} containerStyle={{ width: 50, alignItems: 'center', justifyContent: 'center' }} />}
                                />
                            ))}
                        </View>
                    </ScrollView>
                );
            else
                return (
                    <View style={{ flex:1, alignItems: 'center', justifyItems: 'center'}}>
                        <Text>No Threads !! Click Create ont the right to create one.</Text>
                    </View>
                );
        else
            return <Loader />
    }
}
