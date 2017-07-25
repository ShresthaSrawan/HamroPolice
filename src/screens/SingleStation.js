import React, {Component} from 'react';
import {Dimensions, Text, TouchableOpacity, View, WebView} from 'react-native';
import Loader from '../components/Loader';
import {autobind} from 'core-decorators';
import Utils from '../Utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';

@autobind
export default class SingleStation extends Component {
    static navigationOptions = () => {
        return {
            title: 'Create a Thread'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            station: null
        };
        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    componentWillMount() {
        this.store.getStation(this.props.navigation.state.params.id)
            .then(({data}) => this.setState({station: data}))
            .catch(e => Utils.dd(e));
    }

    render() {
        if(this.state.station) {
            return (
                <View style={styles.container}>
                    <View>
                        <Text>{this.state.station.title}</Text>
                    </View>
                    <View>
                        <Text>{this.state.station.description}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => Communications.phonecall(station.phone, false)} style={{padding: 10}}>
                            <Icon name='call' style={styles.callIcon} size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return <Loader />
        }
    }
}

const win = Dimensions.get('window');

const styles = {
    container: {
        flex: 1
    }
};