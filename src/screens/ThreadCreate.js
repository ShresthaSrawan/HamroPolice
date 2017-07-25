import {Button} from 'nachos-ui';
import React, {Component} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import {autobind} from 'core-decorators';
import Utils from '../Utils';

@autobind
export default class ThreadCreate extends Component {

    static navigationOptions =  {
        title: 'Create a Thread'
    };

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            titleInvalid: false,
            descriptionInvalid: false,
        };
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

        return data;
    }

    submitForm() {
        if(this.formValid()) {
            this.store.createThread(this.formData())
                .then(response => {
                    Alert.alert(
                        'Thread Created',
                        response.data.message,
                        [
                            {text: 'OK', onPress: () => this.props.navigation.navigate('Thread', {id: response.data.thread.id})},
                        ],
                        {onDismiss: () => this.props.navigation.navigate('Thread', {id: response.data.thread.id})}
                    );
                })
                .catch(e=>Utils.dd(e));
        }
    }

    render() {
        const {btnStyle, descriptionField} = styles;

        return (
            <ScrollView>
                <View>
                    <FormLabel>Thread Title</FormLabel>
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