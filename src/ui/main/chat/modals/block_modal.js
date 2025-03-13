import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Button from '../../../components/button';
import CloseIcon from '../../../../assets/icons/close.svg';
import SlashIcon from '../../../../assets/icons/slash.svg';

const BlockModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.dialogBox}>
          <View style={styles.dialogBar}>
            <CloseIcon onPress={onClose} />
          </View>
          <SlashIcon />
          <Text style={styles.modal_title}>Block User</Text>
          <Text style={styles.messageTextModal}>
            Are you sure you want to block this user?{'\n'}This user will no longer be able to message you or view your profile.
          </Text>
          <Button
            title="Confirm Block"
            fontFamily="Roboto_500"
            backgroundColor="#C3313C"
            fontSize={14}
            height={48}
            width={302}
            borderRadius={100}
            onPress={onConfirm}
          />
          <Button
            title="No, cancel"
            fontFamily="Roboto_400"
            backgroundColor="#17261E"
            borderWidth={1}
            borderColor="#747474"
            marginTop={12}
            fontSize={14}
            height={48}
            width={302}
            borderRadius={100}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A0F0DE5',
      },
      dialogBox: {
        width: 350,
        height: 372,
        backgroundColor: '#17261E',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#21362C',
      },
      dialogBar: {
        height: 36,
        alignItems: 'flex-end',
        backgroundColor: '#17261F',
        width: '100%',
        paddingStart: 10,
      },
      modal_title: {
        fontFamily: 'Roboto_500',
        fontSize: 22,
        color: '#FFFFFF',
        marginVertical: 5,
        textAlign: 'center',
      },
      messageTextModal: {
        fontFamily: 'Roboto_400',
        fontSize: 14,
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
      },
});

export default BlockModal;
