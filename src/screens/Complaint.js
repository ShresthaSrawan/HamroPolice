import {Button} from 'nachos-ui';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import ImagePicker from 'react-native-image-picker';
import ImagePreview from './../components/ImagePreview';
import {ScrollView, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FormInput,FormLabel,FormValidationMessage} from 'react-native-elements';
import Utils from '../Utils';
import Header from "../components/Header";

@autobind
export default class Complaint extends Component {
    static navigationOptions =  {
        drawerLabel: 'Complaint',
        drawerIcon: ({ tintColor }) => (
            <Icon name='send' size={25} />
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

    importMedia() {
        let options = {
            title: 'Select Image',
            customButtons: [],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    imageSources: [...this.state.imageSources, response]
                });
            }
        });
    }

    dismissImagePreview(index) {
        this.setState({
            imageSources: this.state.imageSources.filter((_, i) => i !== index)
        });
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

        for (let i = 0; i < this.state.imageSources.length; i++) {
            let img = this.state.imageSources[i].data;
            data.append(`images[${i}]`, img);
        }

        return data;
    }

    submitForm() {
        if(this.formValid()) {
            console.log('submitting Form');
            this.store.sendComplaint(this.formData())
                .then(response => {
                    Alert.alert(
                        'Complaint received',
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
                <Header left={<Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} size={25} />} title='Complaint' />
                <View>
                    <FormLabel>Complaint Title</FormLabel>
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
                    <Button type='success' iconName='md-photos' style={btnStyle} onPress={this.importMedia}></Button>
                </View>
                <View style={previewWrapper}>
                    {this.state.imageSources.map((image, index)=> <ImagePreview key={index} source={{ uri: 'data:image/jpeg;base64,' + image.data }} onDismiss={() => this.dismissImagePreview(index)} />)}
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