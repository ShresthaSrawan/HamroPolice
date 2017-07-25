import SOS from '../screens/SOS';
import Register from '../screens/Register';
import {StackNavigator} from 'react-navigation';

const UnauthenticatedNavigator = StackNavigator({
    SOS: {screen: SOS, navigationOptions: {header: null}},
    Register: {screen: Register, navigationOptions: {header: null}},
}, {mode: 'modal'});

export default UnauthenticatedNavigator;