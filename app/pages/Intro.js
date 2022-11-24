import {StyleSheet, Dimensions, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import RoundIconButton from '../components/RoundIconButton';
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Intro = ({onUserSet}) => {
  const handleSubmit = async () => {
    await AsyncStorage.setItem('user', name);
    if (onUserSet) onUserSet();
  };
  let [name, setName] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>Enter Your Name</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="name ..."
        style={styles.textInput}
      />
      {name.length > 3 && (
        <RoundIconButton
          style={styles.btnRound}
          icon="arrowright"
          clickEvent={handleSubmit}
        />
      )}
    </View>
  );
};

export default Intro;
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width,
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    padding: 10,
  },
  btnRound: {
    marginTop: 10,
  },
  inputTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 50 / 2,
  },
});
