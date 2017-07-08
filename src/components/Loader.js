import React from 'react';
import {View} from 'react-native';
import {Spinner} from 'nachos-ui';

export default Loader = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>
    );
};