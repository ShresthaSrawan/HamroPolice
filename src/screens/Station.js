import {View, ScrollView, Animated, Text, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import pinImg from './../images/pin.png';
import Utils from './../Utils';
import {ListItem} from 'react-native-elements';
import {autobind} from 'core-decorators';
import Loader from '../components/Loader';
import update from 'react-addons-update';
import {StackNavigator} from 'react-navigation';
import TouchableItem from "react-navigation/lib-rn/views/TouchableItem";
import Communications from "react-native-communications";

const LATITUDE = 27.69748516986756;
const LATITUDE_DELTA = 0.1316978937620803;
const LONGITUDE = 85.31699080020188;
const LONGITUDE_DELTA = 0.09280208498240938;

@autobind
export default class Station extends Component {

    static navigationOptions = (props) => {
        return {
            title: 'Stations',
            headerLeft: <Icon name='arrow-back' onPress={() => props.navigation.navigate('Home')} size={25} />,
            headerMode: 'float',
            headerStyle: styles.header,
            drawerLabel: 'Stations',
            drawerIcon: ({tintColor}) => (
                <Icon name='location-on' size={25} />
            )
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 27.69748516986756,
                latitudeDelta: 0.1316978937620803,
                longitude: 85.31699080020188,
                longitudeDelta: 0.09280208498240938
            },
            markers: [],
            dataSource: null
        };

        this.store = props.screenProps.store;
        this.navigation = props.navigation;
    }

    componentWillMount() {
        this.store.getStationList()
            .then((response) => {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    markers: response.data,
                    dataSource: ds.cloneWithRows(response.data)
                });
            })
            .catch(e => Utils.dd(e));
    }

    renderRow(station) {
        return (
            <View key={station.id} style={{flex: 1, flexDirection: 'row', padding: 10}}>
                <View style={{flex: 4}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TouchableItem onPress={() => this._mapView.animateToCoordinate(station.coordinates, 500)}>
                                <Image source={require('./../images/pin.png')}  />
                            </TouchableItem>
                        </View>
                        <View style={{flex: 3}}>
                            <TouchableItem onPress={() => this.navigation.navigate('SingleStation', {id: station.id})}>
                                <View>
                                    <View>
                                        <Text>{station.title}</Text>
                                    </View>
                                    <View>
                                        <Text>{station.description}</Text>
                                    </View>
                                </View>
                            </TouchableItem>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => Communications.phonecall(station.phone, false)} style={{padding: 10}}>
                        <Icon name='call' style={styles.callIcon} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        if(this.state.markers.length) {
            return (
                <View style={styles.container}>
                    <MapView
                        ref = {(mapView) => { this._mapView = mapView; }}
                        style={ styles.map }
                        initialRegion={this.state.region}
                        onRegionChange={(region) => this.setState({region: region})}>
                        {
                            this.state.markers.map(marker => {
                                return (
                                    <MapView.Marker.Animated
                                        key={marker.id}
                                        coordinate={marker.coordinates}
                                        title={marker.title}
                                        description={marker.description}
                                        image={pinImg}
                                    />
                                )
                            }
                        )}
                    </MapView>
                    <ListView
                        style={styles.stationList}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
                </View>
            );
        } else {
            return <Loader />
        }
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 300,
        zIndex: 1
    },
    header: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        backgroundColor: 'transparent',
        zIndex: 2
    },
    stationList: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 300,
        zIndex: 2
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    callIcon: {
        height: 50,
        width: 50
    }
};