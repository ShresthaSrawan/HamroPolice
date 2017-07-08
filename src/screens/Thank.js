import {Button} from 'nachos-ui';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import ImagePicker from 'react-native-image-picker';
import ImagePreview from './../components/ImagePreview';
import {Text,ScrollView, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FormInput,FormLabel,FormValidationMessage} from 'react-native-elements';
import Utils from '../Utils';
import Header from "../components/Header";

@autobind
export default class Thank extends Component {
    static navigationOptions =  {
        drawerLabel: 'Thank',
        drawerIcon: ({ tintColor }) => (
            <Icon name='check-circle' size={25} />
        )
    };
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            latitude: 'unknown',
            longitude: 'unknown',
            titleInvalid: false,
            descriptionInvalid: false,
            imageSources: []
        };

        navigator.geolocation.getCurrentPosition(({coords})=> {
            this.setState({
                longitude: coords.longitude,
                latitude: coords.latitude
            });
        });

        this.store = this.props.screenProps.store;
    }

    formValid() {
        if(!this.state.title.trim().length) {
            this.setState({titleInvalid: true});
            return false;
        } else {
            this.setState({titleInvalid: false});
        }
        if(!this.state.description.trim().length) {
            this.setState({descriptionInvalid: true});
            return false;
        } else {
            this.setState({descriptionInvalid: false});
        }

        return true;
    }

    formData() {
        let data = new FormData();

        data.append('title', this.state.title);
        data.append('description', this.state.description);
        data.append('longitude', this.state.longitude);
        data.append('latitude', this.state.latitude);

        return data;
    }

    submitForm() {
        if(this.formValid()) {
            console.log('submitting Form');
            this.store.sendThank(this.formData())
                .then(response => {
                    Alert.alert(
                        'Thank received',
                        response.data.message,
                        [
                            {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                        ],
                        {onDismiss: () => this.props.navigation.navigate('Home')}
                    );
                })
                .catch(e=>console.log(e.response));
        }
    }

    render() {
        const {btnStyle, previewWrapper, descriptionField} = styles;

        return (
            <ScrollView>
                <Header left={<Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} size={25} />} title='Thank' />
                <View>
                    <FormLabel>Title</FormLabel>
                    <FormInput
                        textInputRef={(c) => this._titleInput = c}
                        value={this.state.title}
                        onChangeText={(title)=> this.setState({title: title, titleInvalid: false})}
                        onSubmitEditing={(event) => {
                            this._descriptionInput.focus();
                        }}
                        autoFocus={true}/>
                    {this.state.titleInvalid && <FormValidationMessage>Title Required</FormValidationMessage>}
                </View>
                <View>
                    <FormLabel>Description</FormLabel>
                    <FormInput
                        textInputRef={(c) => this._descriptionInput = c}
                        value={this.state.description}
                        onChangeText={(description)=> this.setState({description: description, descriptionInvalid: false})}
                        multiline={true}
                        inputStyle={descriptionField}
                        numberOfLines={5}/>
                    {this.state.descriptionInvalid && <FormValidationMessage>Description Required</FormValidationMessage>}
                </View>
                <Button type='success' iconName='md-paper-plane' style={btnStyle} onPress={this.submitForm}>Submit</Button>
            </ScrollView>
        );
    }
}

const styles = {
    btnStyle: {
        margin: 15
    },
    previewWrapper: {
        flexDirection: 'row'
    },
    descriptionField: {
        height: 150
    }
};