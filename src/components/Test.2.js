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
  input: string,
  result: Array,
};
type Props = {
  theme: Theme,
};

class AppView extends React.Component<Props, State> {
  state = {
    input: '',
    result: []
  };

  bilanganPrima = (x) => {
    if (x < 2) return false
    for (let y = 2; y < x; y++) {
      if (x % y === 0) {
        return false;
      }
    }
    return true
  }
  handler = () => {
    const n = this.state.input;
    let result = [];
    for (let i = 2; i <= n; i++) {
      if (this.bilanganPrima(i)) {
        result.push(i)
      }
    }
    this.setState({ result: result })
  }
  render() {
    const result = this.state.result;
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
            style={styles.inputContainerStyle}
            label="Masukan Input"
            value={this.state.input}
            onChangeText={(e) => { this.setState({ input: e }) }}
          />
          <Button onPress={this.handler} style={styles.button}>
            Process
          </Button>
          <Card>
            {result.map((value, i) => (
              <Text key={i}>{value}</Text>
            ))}
          </Card>
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

export default withTheme(AppView);
