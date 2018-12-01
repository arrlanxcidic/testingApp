/* @flow */

import * as React from 'react';
import moment from 'moment';
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { Title, Paragraph, Card, Button, withTheme } from 'react-native-paper';
import { DialogDetailHabit } from './Dialogs';

type State = {
  dialogDetailVisible: boolean,
  dataDetail: Object,
  list: Array,
};

class HabitView extends React.Component<{}, State> {
  state = {
    dialogDetailVisible: false,
    dataDetail: {},
    list: [],
  };
  componentDidMount() {
    console.log(12, moment().weekday());
    this._getMasterData().then(data => {
      this._setStateHabit(data);
    });
  }
  _setStateHabit = value => {
    this.setState({ list: value });
  };
  _handleStart = item => {
    const habit = item;
    habit.active = true;
    habit.isFinished = false;
    habit.start = moment().format('DD-MM-YYYY');
    const endDate = moment().add(habit.duration, 'days');
    habit.end = moment(endDate).format('DD-MM-YYYY');
    let listHabit = this.state.list;
    listHabit = listHabit.filter(itm => itm.id !== habit.id);
    listHabit = [habit, ...listHabit];
    // this._updateMasterData(listHabit);
  };
  _openDialogDetail = dataDetail =>
    this.setState({ dialogDetailVisible: true, dataDetail });

  _closeDialogDetail = () =>
    this.setState({ dialogDetailVisible: false, dataDetail: {} });
  _getMasterData = async () => {
    try {
      let value = await AsyncStorage.getItem('@masterdata');
      if (value !== null) {
        value = JSON.parse(value);
        return value;
      }
    } catch (error) {
      console.log(error);
      return null;
      // Error retrieving data
    }
    return null;
  };
  _updateMasterData = async data => {
    try {
      await AsyncStorage.setItem('@masterdata', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      return null;
      // Error retrieving data
    }
    return null;
  };
  render() {
    const limit = desc => desc.slice(0, 100);
    const { dialogDetailVisible, dataDetail, list } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.content}>
        {list &&
          list.map((item, k) => (
            <Card
              key={`habit${k + 1}`}
              style={styles.card}
              onPress={() => {
                this._openDialogDetail(item);
              }}
            >
              <Card.Content>
                <Title>{item.title.toUpperCase()}</Title>
                <Paragraph>{limit(item.description)}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  disabled={item.active || item.isFinished}
                  primary
                  onPress={() => {
                    this._openDialogDetail(item);
                  }}
                >
                  {item.active
                    ? 'Dipilih'
                    : (item.isFinished && 'Selesai') || 'Mulai Habit'}
                </Button>
                {/* <Button
                  secondary
                  onPress={() => {
                    this._openDialogDetail(item);
                  }}
                >
                  Details
                </Button> */}
              </Card.Actions>
            </Card>
          ))}
        {dataDetail && (
          <DialogDetailHabit
            visible={dialogDetailVisible}
            close={this._closeDialogDetail}
            data={dataDetail}
            startHabit={this._handleStart}
          />
        )}
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
});

export default withTheme(HabitView);
