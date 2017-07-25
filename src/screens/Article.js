import {Text, Platform, ScrollView, View} from 'react-native';
import React, {Component} from 'react';
import Utils from './../Utils';
import {autobind} from 'core-decorators';
import {Avatar, List, ListItem} from 'react-native-elements';

@autobind
export default class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsList: null
        };

        this.data = props.data;
        this.type = props.type;
        this.store = props.store;
        this.navigation = props.navigation;
    }

    openArticle(article) {
        this.navigation.navigate('SingleArticle', {id: article.id})
    }

    render() {
        if(this.data.length)
            return (
                <ScrollView>
                    <View>
                        <List>
                            {this.data.map(article => (
                                <ListItem
                                    key={article.id}
                                    title={article.title}
                                    subtitle={
                                        <View style={styles.subtitleView}>
                                            <Text style={styles.date}>{article.created_at_formatted}</Text>
                                            <Text style={styles.excerpt}>{article.excerpt}</Text>
                                        </View>
                                    }
                                    onPress={() => this.openArticle(article) }
                                    avatar={{uri: article.thumbnail}}
                                    avatarStyle={{width: 133, height: 100, alignSelf: 'center'}}
                                />
                            ))}
                        </List>
                    </View>
                </ScrollView>
            );
        else
            return (
                <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>No {this.type} !!</Text>
                </View>
            );
    }
}

const styles = {
    subtitleView: {
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingLeft: 10,
        paddingTop: 5
    },
    date: {
        fontSize: 12,
        flex: 1,
        color: 'grey'
    },
    excerpt: {
        flex: 1,
        fontSize: 14,
    }
};