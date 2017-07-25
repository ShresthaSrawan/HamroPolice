import {StackNavigator} from 'react-navigation';
import ThreadList from '../screens/ThreadList';
import Thread from '../screens/Thread';
import ThreadCreate from '../screens/ThreadCreate';

const ThreadNavigator = StackNavigator({
    ThreadList: { screen: ThreadList},
    Thread: {
        path: 'thread/:id',
        screen: Thread
    },
    ThreadCreate: { screen: ThreadCreate }
});

export default ThreadNavigator;