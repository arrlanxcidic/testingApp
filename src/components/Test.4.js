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
  TouchableOpacity
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
import RNGooglePlaces from 'react-native-google-places';

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
  handler = () => {
    const n = this.state.input;
    if (n) {
      let bilangan = n > 0 && n.toString();
      let length = bilangan.split('').length;
      let result = [];
      for (let i = 0; i < length; i++) {
        const head = bilangan.slice(i, i + 1) ;
        const end = bilangan.slice(i + 1).split('').map(() => 0).join('')
        result.push(head + end)
      }
      this.setState({ result: result })
    }
  }
  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
    .then((results) => console.log(results))
    .catch((error) => console.log(error.message));
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
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.openSearchModal()}
          >
            <Text>Cari Tempat?</Text>
          </TouchableOpacity>
        </View>
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
