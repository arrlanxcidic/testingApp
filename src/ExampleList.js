/* @flow */

import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { List, Divider, withTheme } from 'react-native-paper';
import Homepage from './HomePage'
import type { Theme } from 'react-native-paper/types';

type Props = {
  theme: Theme,
  navigation: any,
};

export const examples = {
  homePage: Homepage,
};

const data = Object.keys(examples).map(id => ({ id, data: examples[id] }));

class ExampleList extends React.Component<Props> {
  static navigationOptions = {
    title: 'Islamic Habit',
  };

  _renderItem = ({ item }) => (
    <List.Item
      title={item.data.title}
      onPress={() => this.props.navigation.navigate(item.id)}
    />
  );

  _keyExtractor = item => item.id;

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return <Homepage />;
  }
}

export default withTheme(ExampleList);
