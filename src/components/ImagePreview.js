import React, {Component} from 'react';
import {View, Image, TouchableHighlight, Text} from 'react-native';

export default ImagePreview = (props) => {
    return (
        <View style={{margin: 15}}>
            <TouchableHighlight style={{backgroundColor: 'white', borderRadius: 10}} onPress={props.onDismiss}>
                <Text> x </Text>
            </TouchableHighlight>
            <Image source={props.source} style={{height: 100, width: 100}} />
        </View>
    );
}