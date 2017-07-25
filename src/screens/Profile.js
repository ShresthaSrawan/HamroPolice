import {Button} from 'nachos-ui';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {ScrollView, Text, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Avatar, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import Utils from '../Utils';
import {StackNavigator} from 'react-navigation';

@autobind
class ProfileScreen extends Component {
    static navigationOptions = (props) => {
        return {
            title: 'Profile',
            headerLeft: <Icon name='arrow-back' onPress={() => props.navigation.navigate('Home')} size={25} />,
            headerMode: 'float',
            drawerLabel: 'Profile',
            drawerIcon: ({ tintColor }) => (
                <Icon name='account-circle' size={25} />
            )
        }
    };

    constructor(props) {
        super(props);

        this.store = this.props.screenProps.store;
        let user = this.store.user;

        this.state = {
            name: user.name,
            number: user.number,
            address: user.address,
            nameInvalid: false,
            numberInvalid: false,
            addressInvalid: false
        }
    }

    validate(...fields) {
        for(index in fields) {
            let field = fields[index];
            if(this.state[field] && this.state[field].trim().length) {
                this.setState({[field+'Invalid']: false});
            } else {
                this.setState({[field+'Invalid']: true});
                return false;
            }
        }

        return true;
    }

    formValid() {
        return this.validate('name', 'number', 'address')
    }

    formData() {
        let data = new FormData();

        data.append('name', this.state.name);
        data.append('number', this.state.number);
        data.append('address', this.state.address);

        return data;
    }

    submitForm() {
        if(this.formValid()) {
            this.store.updateProfile(this.formData())
                .then((response) => {
                    let user = response.data.user
                    if(user)
                        this.store.setUser(user);
                    Alert.alert(
                        'Profile Updated',
                        response.data.message,
                        [
                            {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                        ],
                        {onDismiss: () => this.props.navigation.navigate('Home')}
                    );
                })
                .catch(e => Utils.dd(e));
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.avatarWrap}>
                    <Avatar xlarge rounded source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}} containerStyle={styles.avatar} />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.formRow}>
                        <FormLabel>Name</FormLabel>
                        <FormInput
                            textInputRef={(c) => this._nameInput = c}
                            value={this.state.name}
                            onChangeText={(name)=> this.setState({name: name, nameInvalid: false})}
                            onSubmitEditing={(e) => {
                                this._numberInput.focus();
                            }}/>
                        {this.state.nameInvalid && <FormValidationMessage>Name Required</FormValidationMessage>}
                    </View>
                    <View style={styles.formRow}>
                        <FormLabel>Number</FormLabel>
                        <FormInput
                            textInputRef={(c) => this._numberInput = c}
                            value={this.state.number}
                            onChangeText={(number)=> this.setState({number: number, numberInvalid: false})}
                            keyboardType={'numeric'}
                            onSubmitEditing={(e) => {
                                this._addressInput.focus();
                            }}/>
                        {this.state.numberInvalid && <FormValidationMessage>Number Required</FormValidationMessage>}
                    </View>
                    <View style={styles.formRow}>
                        <FormLabel>Address</FormLabel>
                        <FormInput
                            textInputRef={(c) => this._addressInput = c}
                            value={this.state.address}
                            onChangeText={(address)=> this.setState({address: address, addressInvalid: false})}
                            onSubmitEditing={(e) => {
                                // this._descriptionInput.focus();
                            }}/>
                        {this.state.addressInvalid && <FormValidationMessage>Address Required</FormValidationMessage>}
                    </View>
                    <Button type='success' iconName='md-paper-plane' style={styles.btnStyle} onPress={this.submitForm}>Submit</Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    avatarWrap: {
        backgroundColor: '#3498db',
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        height: 155,
        width: 155,
    },
    formContainer: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    formRow: {
        flex: 1
    },
    btnStyle: {
        margin: 15
    },
};

const Profile = StackNavigator({
    Profile: { screen: ProfileScreen}
});

export default Profile;