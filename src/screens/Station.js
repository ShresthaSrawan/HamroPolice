import {ScrollView, Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import MapView from 'react-native-maps';

export default class Station extends Component {
    static navigationOptions =  {
        drawerLabel: 'Station',
        drawerIcon: ({ tintColor }) => (
            <Icon name='location-on' size={25} />
        )
    };

    onRegionChange(region) {
        this.setState({ region });
    }

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers:[
                {
                    title: 'Random',
                    description: 'lorem epsum dolor sitamet',
                    latlong: '121.3223,23.2323'
                }
            ]
        }
    }
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <Header left={<Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} size={25} />} title='Locate' />
                <MapView
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                    style={{ flex: 1, backgroundColor: 'red'}}
                >
                    {/*{this.state.markers.map(marker => (*/}
                        {/*<MapView.Marker*/}
                            {/*coordinate={marker.latlng}*/}
                            {/*title={marker.title}*/}
                            {/*description={marker.description}*/}
                        {/*/>*/}
                    {/*))}*/}
                </MapView>
            </ScrollView>
        );
    }
}