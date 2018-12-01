/* @flow */

import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Paragraph,
  Button,
  Portal,
  Dialog,
  withTheme,
} from 'react-native-paper';

type Props = {
  visible: boolean,
  close: Function,
  startHabit: Function,
  data: Object,
};

class DialogWithLongText extends React.Component<Props, {}> {
  _handleStart = (data: any) => {
    this.props.startHabit(data);
    this.props.close();
  };
  render() {
    const { visible, close, data } = this.props;
    return (
      <Portal>
        <Dialog onDismiss={close} visible={visible}>
          <Dialog.Title>{data.title || ''}</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: 220, paddingHorizontal: 0 }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <Paragraph style={styles.contentDetail}>
                {data.details || ''}
              </Paragraph>
              <Paragraph />
              {data && data.reminder ? (
                data.reminder.map((r, i) => (
                  <React.Fragment key={r.name}>
                    <Paragraph>
                      {`Reminder ${data.reminder.length > 1 ? i + 1 : ''}:`}
                    </Paragraph>
                    <Paragraph>{`${r.hariReminder}, Jam ${r.time}`}</Paragraph>
                  </React.Fragment>
                ))
              ) : (
                <Paragraph />
              )}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button primary onPress={close}>
              Kembali
            </Button>
            <Button
              disabled={data.active}
              primary
              onPress={() => {
                this._handleStart(data);
              }}
            >
              Mulai Habit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  contentDetail: {
    textAlign: 'justify',
    justifyContent: 'space-between',
  },
});

export default withTheme(DialogWithLongText);
