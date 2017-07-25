import Station from '../screens/Station';
import {StackNavigator} from 'react-navigation';
import SingleStation from "../screens/SingleStation";

const StationScreen = StackNavigator({
    Station: {screen: Station},
    SingleStation: {screen: SingleStation, path: 'station/:id',}
});

export default StationScreen;