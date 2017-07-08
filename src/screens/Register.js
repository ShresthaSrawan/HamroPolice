import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import {observer} from 'mobx-react/native';

@observer
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
        };
        this.store = this.props.screenProps.store;
    }
    handleSubmit(){
        this.store.authenticate({name: this.state.name, number: this.state.number});
    }
    render() {
        const {container, content, title, nepali, english, contentWrap, logo, input} = styles;
        return (
            <KeyboardAvoidingView style={container}>
                <View style={content}>
                    <Image source={require('./../images/logo.png')} style={logo} />
                    <View style={title}>
                        <Text style={nepali}>महानगरीय प्रहरी</Text>
                        <Text style={english}>Metropolitan Police</Text>
                    </View>
                    <View style={contentWrap}>
                        <TextInput
                            ref='name'
                            style={input}
                            onChangeText={(name) => this.setState({name})}
                            placeholder={'Name'}
                            underlineColorAndroid='transparent'
                            value={this.state.name}
                            autoFocus={true}
                            maxLength = {40}
                            onSubmitEditing={(event) => {
                                this.refs.number.focus();
                            }}
                        />
                        <TextInput
                            ref='number'
                            style={input}
                            onChangeText={(number) => this.setState({number})}
                            placeholder={'Number'}
                            underlineColorAndroid='transparent'
                            value={this.state.number}
                            keyboardType={'numeric'}
                            maxLength = {15}
                            onSubmitEditing={(event) => {
                                this.handleSubmit();
                            }}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {},
    nepali: {
        textAlign: 'center'
    },
    english: {
        textAlign: 'center'
    },
    logo: {
        height: 150,
        width: 150
    },
    contentWrap: {
        marginTop: 50,
        width: 250
    },
    buttons: {},
    emergency: {
        textAlign: 'center'
    },
    footer: {
        padding: 10,
        backgroundColor: '#f3f3f3'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 10
    }
};