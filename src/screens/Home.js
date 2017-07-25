import Menu from '../components/Menu';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import Navbar from './../components/Navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, View, ScrollView, TouchableHighlight, NativeModules} from 'react-native';
import {Card, Grid, Col, SideMenu} from 'react-native-elements';
import {StackNavigator} from 'react-navigation';

@autobind
class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.store = this.props.screenProps.store;
        this.navigation = this.props.navigation;
    }

    static navigationOptions = (props) => {
        return {
            title: 'Home',
            headerLeft: <Icon name='menu' onPress={() => props.navigation.navigate('DrawerOpen')} size={25} />,
            headerMode: 'float',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon name='home' size={25} />
            )
        }
    };

    handleCardClick(card) {
        this.navigation.navigate(card);
    }

    render() {
        const {container, cardLabel} = styles;

        return (
            <View style={container}>
                <ScrollView>
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
                                onPress={() => this.handleCardClick('ThreadList')}
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
                <Navbar store={this.store} navigation={this.navigation} />
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

const Home = StackNavigator({
    Home: { screen: HomeScreen}
});

export default Home;