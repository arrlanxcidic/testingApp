/* @flow */

import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Title,
  Paragraph,
  Card,
  Banner,
  withTheme,
  TextInput,
  HelperText,
  Button,
} from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';

type State = {
  name: string,
  email: string,
};
type Props = {
  theme: Theme,
};

class ReminderView extends React.Component<Props, State> {
  state = {
    name: 'Rudi Hartanto',
    email: 'rudi.h@mail.com',
  };
  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView style={[styles.container, { backgroundColor: background }]}>
          <TextInput
            mode="outlined"
            disabled
            style={styles.inputContainerStyle}
            label="Nama"
            value="Rudi Susanto"
          />
          <TextInput
            mode="outlined"
            disabled
            style={styles.inputContainerStyle}
            label="Email"
            value="rudi@gmail.com"
          />
          <TextInput
            mode="outlined"
            disabled
            style={styles.inputContainerStyle}
            label="No Hp"
            value="+6293743847838"
          />
          <Button onPress={() => {}} style={styles.button}>
            Edit
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
  button: {
    margin: 4,
  },
});

export default withTheme(ReminderView);
