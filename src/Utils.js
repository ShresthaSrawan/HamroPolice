import {Alert} from 'react-native';
export default class Utils{

    static dd(data) {
        console.log(data);
        return Alert.alert('Exception Encountered', JSON.stringify(data.message), [{text: 'Ok', onPress: () => {}}]);
    }
}