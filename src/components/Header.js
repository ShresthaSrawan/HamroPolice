import React from 'react';
import {Text, View, Platform} from "react-native";

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 40;

export default Header = (props) => {
    const { title, right, left, titleText, container} = styles;
    return (
        <View style={container}>
            {<View style={left}>{props.left ? props.left : <Text> </Text>}</View>}
            <View style={title}><Text style={titleText}>{props.title}</Text></View>
            {<View style={right}>{props.right ? props.right : <Text> </Text>}</View>}
        </View>
    );
}

const styles = {
    container: {
        height: APPBAR_HEIGHT+STATUSBAR_HEIGHT,
        backgroundColor: '#f1f1f1',
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 20
    },
    title: {
        flex:1,
        height: APPBAR_HEIGHT+STATUSBAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        flex:1,
        height: APPBAR_HEIGHT+STATUSBAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    left: {
        flex: 1,
        height: APPBAR_HEIGHT+STATUSBAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
};