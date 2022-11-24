import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from '../components/RoundIconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../context/NoteProvider';
import NoteInputModal from './NoteInputModal';

const NoteDetail = props => {
  const {setNotes} = useNotes();
  let [isModalVisible, setModalVisible] = useState(false);
  let onSubmit = async input => {
    input['updatedAt'] = new Date().toISOString();
    const updatedNotes = [input, ...(await deleteNote(note.id, false))];
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    props.navigation.goBack();
  };
  const displayDeleteAlert = id => {
    Alert.alert(
      'Confirm delete note ?',
      'Your note will be deleted permanently.',
      [
        {
          text: 'Delete',
          onPress: () => {
            deleteNote(id);
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('No thanks');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const deleteNote = async (id, save = true) => {
    let prevNotes = await AsyncStorage.getItem('notes');
    if (prevNotes) {
      let updatedNotes = JSON.parse(prevNotes).filter(val => {
        return val.id != id;
      });
      if (save) {
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        props.navigation.goBack();
      } else return updatedNotes;
    }
  };
  const {note} = props.route.params;
  return (
    <>
      <ScrollView contentContainerStyle={[styles.container]}>
        <Text style={styles.time}>Created At: {note.time}</Text>
        {note.updatedAt && (
          <Text style={styles.time}>Updated At: {note.updatedAt}</Text>
        )}
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.description}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          icon={'delete'}
          style={{backgroundColor: colors.ERROR, margin: 5}}
          clickEvent={() => {
            displayDeleteAlert(note.id);
          }}
        />
        <RoundIconBtn
          icon={'edit'}
          style={{backgroundColor: colors.PRIMARY, margin: 5}}
          clickEvent={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <NoteInputModal
        isEdit={true}
        note={note}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onSubmit={onSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;
