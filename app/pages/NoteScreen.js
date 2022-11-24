import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import RoundIconButton from '../components/RoundIconButton';
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notes from '../components/Notes';
import {useNotes} from '../context/NoteProvider';
const NoteScreen = ({user, navigation}) => {
  let [isModalVisible, setModalVisible] = useState(false);
  const {notes, setNotes} = useNotes();

  let onSubmit = async input => {
    input['id'] = Date.now();
    input['time'] = new Date().toISOString();
    const updatedNotes = [...notes, input];
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  let loadNotes = async () => {
    let notes = await AsyncStorage.getItem('notes');
    if (notes) setNotes(JSON.parse(notes));
  };
  useEffect(() => {
    // AsyncStorage.removeItem('notes');
    loadNotes();
  }, []);
  const openNote = note => {
    navigation.navigate('NoteDetail', {note});
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Hello ${user ? user : 'Guest'}`}</Text>
          {notes.length > 0 && <SearchBar style={{marginVerticle: 15}} />}
          <FlatList
            data={notes}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 15,
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Notes
                clickEvent={() => {
                  openNote(item);
                }}
                style={styles.notes}
                note={item}
              />
            )}
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              styles.emptyHeaderContainer,
            ]}>
            {notes.length <= 0 && (
              <Text style={styles.emptyHeader}>Add Notes</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <RoundIconButton
        clickEvent={() => setModalVisible(true)}
        icon="plus"
        style={styles.addBtn}
      />
      <NoteInputModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
  },
  notes: {
    margin: 5,
  },
});
