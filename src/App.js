import Store from './Store';
import Utils from './Utils';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import Loader from './components/Loader';
import {observer} from 'mobx-react/native';
import {View, Platform} from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import DeviceInfo from 'react-native-device-info';
import UnauthenticatedNavigator from './navigators/UnauthenticatedNavigator';

@autobind @observer
export default class App extends Component {
    constructor(props) {
        super(props);

        // remove yellow warning box
        console.disableYellowBox = true;

        this.state = {
            isOpen: false
        };
        console.log('Device Unique ID', DeviceInfo.getUniqueID());
        console.log('Device Manufacturer', DeviceInfo.getManufacturer());
        console.log('Device Brand', DeviceInfo.getBrand());
        console.log('Device Model', DeviceInfo.getModel());
        console.log('Device ID', DeviceInfo.getDeviceId());
        console.log('System Name', DeviceInfo.getSystemName());
        console.log('System Version', DeviceInfo.getSystemVersion());
        console.log('Bundle ID', DeviceInfo.getBundleId());
        console.log('Build Number', DeviceInfo.getBuildNumber());
        console.log('App Version', DeviceInfo.getVersion());
        console.log('App Version (Readable)', DeviceInfo.getReadableVersion());
        console.log('Device Name', DeviceInfo.getDeviceName());
        console.log('User Agent', DeviceInfo.getUserAgent());
        console.log('Device Locale', DeviceInfo.getDeviceLocale());
        console.log('Device Country', DeviceInfo.getDeviceCountry());
        console.log('Timezone', DeviceInfo.getTimezone());
        console.log('App Instance ID', DeviceInfo.getInstanceID());
        console.log('IsEmulator', DeviceInfo.isEmulator());
        console.log('isTablet', DeviceInfo.isTablet());
        this.store = new Store();
    }

    returnRelevantNavigator() {
        if (this.store.isAuthenticated) {
            return <MainNavigator screenProps={{store: this.store}} />
        } else {
            return <UnauthenticatedNavigator screenProps={{store: this.store}} />
        }
    }

    render() {
        if (this.store.isAuthenticating)
            return <Loader />;
        else
            return (
                <View style={{flex: 1}}>
                    { this.returnRelevantNavigator() }
                </View>
            );
    }
}
