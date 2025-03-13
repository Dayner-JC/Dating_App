import React from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Button from '../../../components/button';
import CloseIcon from '../../../../assets/icons/close.svg';
import InfoIcon from '../../../../assets/icons/info-circle.svg';

const ReportModal = ({
  visible,
  onClose,
  reasons,
  selectedReason,
  onSelectReason,
  otherReason,
  onChangeOtherReason,
  onSubmit,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.dialogReportBox}>
          <View style={styles.dialogBar}>
            <CloseIcon onPress={onClose} />
          </View>
          <InfoIcon />
          <Text style={styles.modal_title}>Report User</Text>
          <Text style={styles.messageTextModal}>
            Why do you want to report this user?{'\n'}Please select a reason.
          </Text>
          <View style={styles.option_container}>
            {reasons.map((reason) => (
              <TouchableOpacity
                key={reason.id}
                style={[
                  styles.reasonOption,
                  selectedReason === reason.id && styles.selectedOption,
                ]}
                onPress={() => onSelectReason(reason.id)}>
                <Text
                  style={[
                    styles.reasonText,
                    selectedReason === reason.id && styles.selectedText,
                  ]}>
                  {reason.label}
                </Text>
                <View
                  style={[
                    styles.circle,
                    selectedReason === reason.id && styles.selectedCircle,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
          {selectedReason === 'Other' && (
            <TextInput
              style={styles.otherInput}
              placeholder="Describe the reason..."
              placeholderTextColor="#6F6F6F"
              multiline
              value={otherReason}
              onChangeText={onChangeOtherReason}
            />
          )}
          <Button
            title="Submit Report"
            fontFamily="Roboto_500"
            backgroundColor="#C3313C"
            disabledBackgroundColor="rgba(195, 49, 60, 1)"
            disabledTextColor="#a2a8a5"
            fontSize={14}
            height={48}
            width={302}
            borderRadius={100}
            onPress={onSubmit}
            disabled={
              selectedReason === 'Other'
                ? otherReason.trim().length < 20
                : !selectedReason
            }
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
      dialogReportBox: {
        width: 350,
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
      option_container: {
        marginBottom: 20,
        width: '100%',
      },
      reasonOption: {
        flexDirection: 'row',
        backgroundColor: '#5258531A',
        borderColor: '#525853',
        borderWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        height: 56,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
      },
      selectedOption: {
        backgroundColor: '#3A341B',
        borderColor: '#D97904',
      },
      reasonText: {
        color: '#D9D2B0',
        fontSize: 16,
        fontFamily: 'Roboto_400',
      },
      selectedText: {
        color: '#FFFFFF',
      },
      circle: {
        width: 20,
        height: 20,
        borderWidth: 0.5,
        borderColor: '#DADADA',
        borderRadius: 4,
      },
      selectedCircle: {
        borderWidth: 3.5,
        backgroundColor: '#FFFFFF',
        borderColor: '#D97904',
      },
      otherInput: {
        height: 80,
        borderWidth: 1,
        borderColor: '#747474',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#FFFFFF',
        textAlignVertical: 'top',
        marginBottom: 20,
        width: 302,
      },
});

export default ReportModal;
