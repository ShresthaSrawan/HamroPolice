import Menu from '../components/Menu';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import Navbar from './../components/Navbar';
import Header from './../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, View, ScrollView, TouchableHighlight, NativeModules} from 'react-native';
import {Card, Grid, Col, SideMenu} from 'react-native-elements';

@autobind
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.store = this.props.screenProps.store;
    }

    static navigationOptions =  {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Icon name='home' size={25} />
        )
    };

    handleCardClick(card) {
        this.props.navigation.navigate(card);
    }

    render() {
        const {container, cardLabel} = styles;

        return (
            <View style={container}>
                <ScrollView>
                    <Header left={<Icon name='menu' onPress={() => this.props.navigation.navigate('DrawerOpen')} size={25} />} title='Home' />
                    <Grid>
                        <Col>
                            <TouchableHighlight
                                onPress={() => this.handleCardClick('Report')}
                                underlayColor='transparent'>
                                <View>
                                    <Card
                                        image={require('../images/report.png')}>
                                        <Text style={cardLabel}>
                                            Report & Incident
                                        </Text>
                                    </Card>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight
                                onPress={() => this.handleCardClick('Complaint')}
                                underlayColor='transparent'>
                                <View>
                                    <Card
                                        image={require('../images/complaint.png')}>
                                        <Text style={cardLabel}>
                                            Public Complaint
                                        </Text>
                                    </Card>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                    <Grid>
                        <Col>
                            <TouchableHighlight
                                onPress={() => this.handleCardClick('Station')}
                                underlayColor='transparent'>
                                <View>
                                    <Card
                                        image={require('../images/locate.png')}>
                                        <Text style={cardLabel}>
                                            Locate a Station
                                        </Text>
                                    </Card>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight
                                onPress={() => this.handleCardClick('Thank')}
                                underlayColor='transparent'>
                                <View>
                                    <Card
                                        image={require('../images/thank.png')}>
                                        <Text style={cardLabel}>
                                            Thank the Police
                                        </Text>
                                    </Card>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                    <Grid>
                        <Col>
                            <TouchableHighlight
                                onPress={() => this.handleCardClick('Traffic')}
                                underlayColor='transparent'>
                                <View>
                                    <Card
                                        image={require('../images/traffic.png')}>
                                        <Text style={cardLabel}>
                                            Report Traffic Violation
                                        </Text>
                                    </Card>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight
                                onPress={() => this.handleCardClick('Thread')}
                                underlayColor='transparent'
                            >
                                <View>
                                    <Card
                                        image={require('../images/thread.png')}>
                                        <Text style={cardLabel}>
                                            Thread Chat
                                        </Text>
                                    </Card>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Grid>
                </ScrollView>
                <Navbar store={this.store} />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    cardLabel: {
        textAlign: 'center'
    }
};