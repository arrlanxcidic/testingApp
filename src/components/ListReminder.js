/* @flow */

import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Title, Paragraph, Card, Banner, withTheme } from 'react-native-paper';
import { DialogDetailHabit } from './Dialogs';

type State = {
  visible: boolean,
};

const listReminders = [
  {
    message:
      'Hi Rudi, hari ini adalah hari rabu, sudah persiapkan makan sahur?',
    status: 'ok',
    created: new Date().toLocaleString(),
  },
  {
    message: 'Rudi, kamu udah olahraga pagi ini?',
    status: 'ok',
    created: new Date().toLocaleString(),
  },
  {
    message: 'Jangan lupa tidur paling lambat jam 9 ya hari ini.',
    status: 'tidak ok',
    created: new Date().toLocaleString(),
  },
];

class ReminderView extends React.Component<{}, State> {
  state = {
    visible: true,
  };
  render() {
    const { visible } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.content}>
        {listReminders &&
          listReminders.map((item, k) => (
            <Card key={`habit${k + 1}`} style={styles.card}>
              <Card.Content>
                <Paragraph>{item.message}</Paragraph>
                <Paragraph style={item.status !== 'ok' && styles.failed}>
                  Status: {item.status}
                </Paragraph>
                <Text style={styles.date}>{item.created}</Text>
              </Card.Content>
            </Card>
          ))}
        <Banner
          style={styles.banner}
          actions={[
            {
              label: 'Belum bisa',
              onPress: () => {
                this.setState({ visible: false });
              },
            },
            {
              label: 'Sudah',
              onPress: () => {
                this.setState({ visible: false });
              },
            },
          ]}
          image={({ size }) => (
            <Image
              source={require('../../assets/favorite.png')}
              style={{
                width: size,
                height: size,
              }}
            />
          )}
          visible={visible}
        >
          Rudi, apakah sudah makan buah-buahan atau sayuran hari ini?
        </Banner>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  card: {
    margin: 4,
  },
  banner: {
    margin: 4,
    width: '98%',
  },
  date: {
    fontSize: 10,
    color: '#bbb',
  },
  failed: {
    color: 'chocolate',
  },
});

export default withTheme(ReminderView);
