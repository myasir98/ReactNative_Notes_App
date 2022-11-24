import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RoundIconButton from './RoundIconButton';
import colors from '../misc/colors';

const NoteInputModal = ({
  isModalVisible,
  setModalVisible,
  onSubmit,
  note,
  isEdit,
}) => {
  const [input, setInput] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      setInput(note);
    }
  }, []);
  let handleTextChange = (key, val) => {
    let obj = {};
    obj[key] = val;
    setInput({
      ...input,
      ...obj,
    });
  };

  let handleSubmit = () => {
    if (!input.title.trim() & !input.description.trim()) return;
    onSubmit(input);
    if (!isEdit)
      setInput({
        title: '',
        description: '',
      });

    setModalVisible(!isModalVisible);
  };
  return (
    <Modal visible={isModalVisible} animationType="fade">
      <View style={styles.container}>
        <TextInput
          value={input.title}
          onChangeText={text => handleTextChange('title', text)}
          placeholder="Title ..."
          style={[styles.input, styles.title]}
        />
        <TextInput
          value={input.description}
          onChangeText={text => handleTextChange('description', text)}
          placeholder="Desc ..."
          multiline={true}
          numberOfLines={8}
          style={[styles.input, styles.desc]}
        />
        <View style={styles.btnContainer}>
          {input.title.trim() && input.description.trim() && (
            <RoundIconButton
              style={styles.iconBtn}
              icon="check"
              clickEvent={handleSubmit}
            />
          )}
          <RoundIconButton
            style={styles.iconBtn}
            icon="close"
            clickEvent={() => {
              if (!isEdit)
                setInput({
                  title: '',
                  description: '',
                });
              else setInput(note);
              setModalVisible(!isModalVisible);
            }}
          />
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={[styles.modalBg, StyleSheet.absoluteFillObject]} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  iconBtn: {
    margin: 10,
  },
  container: {
    padding: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    marginTop: 20,
    fontSize: 20,
  },
  title: {
    height: 40,
    fontWeight: 'bold',
  },
  desc: {
    height: 200,
  },
  modalBg: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
