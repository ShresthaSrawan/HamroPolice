import {StackNavigator, TabNavigator} from 'react-navigation';
import News from '../screens/News';
import SingleArticle from '../screens/SingleArticle';
import Alerts from '../screens/Alerts';
import Lost from '../screens/Lost';
import Missing from '../screens/Missing';
import Wanted from '../screens/Wanted';

const NewsTabs = TabNavigator({
    News: {screen: News},
    Alerts: {screen: Alerts},
    Lost: {screen: Lost},
    Missing: {screen: Missing},
    Wanted: {screen: Wanted},
},{
    tabBarPosition: 'top',
    tabBarOptions: {
        scrollEnabled: true
    }
});

const NewsNavigator = StackNavigator({
    NewsTabs: {screen: NewsTabs},
    SingleArticle: {
        path: 'article/:id',
        screen: SingleArticle
    }
});


export default NewsNavigator;