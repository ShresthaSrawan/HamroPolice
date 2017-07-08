import React, {Component} from 'react';
import {View,Text, Image, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements';

class SOS extends Component {
    triggerCall() {
        console.log('calling 100');
    }
    triggerMessage() {
        console.log('Messaging 100');
    }
    render() {
        const {
            container,
            content,
            title,
            nepali,
            english,
            logo,
            buttons,
            button,
            emergency,
            contentWrap,
            footer,
            footerText
        } = styles;
        const { navigate } = this.props.navigation;
        return (
            <View style={container}>
                <View style={content}>
                    <Image source={require('./../images/logo.png')} style={logo}/>
                    <View style={title}>
                        <Text style={nepali}>महानगरीय प्रहरी</Text>
                        <Text style={english}>Metropolitan Police</Text>
                    </View>
                    <View style={contentWrap}>
                        <Text style={emergency}>Emergency</Text>
                        <View style={buttons}>
                            <Icon
                                reverse
                                name='call'
                                color='#8bcb13'
                                onPress={this.triggerCall}
                            />
                            <Icon
                                reverse
                                name='message'
                                color='#007aff'
                                onPress={this.triggerMessage}
                            />
                        </View>
                    </View>
                </View>
                <TouchableHighlight style={footer} onPress={() => navigate('Register')}>
                    <Text style={footerText}>Skip To Registration ></Text>
                </TouchableHighlight>
            </View>
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
    title: {
    },
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
        marginTop: 150,
        width: 500
    },
    emergency: {
        textAlign: 'center'
    },
    footer: {
        padding: 10,
        backgroundColor: '#f3f3f3'
    },
    footerText: {
        textAlign: 'right'
    },
    buttons: {
        alignItems: 'center'
    },
    button: {
        flex: 1
    }
};

export default SOS;