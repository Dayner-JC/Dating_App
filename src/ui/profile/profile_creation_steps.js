import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import IconButton from '../components/icon_button';
import ArrowIcon from '../../assets/icons/arrow-left.svg';
import * as Progress from 'react-native-progress';
import Step1 from './steps/step_1';
import Step2 from './steps/step_2';
import Step3 from './steps/step_3';
import Step4 from './steps/step_4';
import Step5 from './steps/step_5';
import Step6 from './steps/step_6';
import Step7 from './steps/step_7';
import Step8 from './steps/step_8';

const ProfileCreationSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { component: Step1 },
    { component: Step2 },
    { component: Step3 },
    { component: Step4 },
    { component: Step5 },
    { component: Step6 },
    { component: Step7 },
    { component: Step8 },
  ];

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
        {currentStep > 0 && (
          <IconButton icon={<ArrowIcon/>} onPress={goBack} />
        )}
      </View>

      <Progress.Bar
        progress={(currentStep + 1) / steps.length}
        width={null}
        height={10}
        color="#D97904"
        borderWidth={0}
        unfilledColor="#21362C"
        style={styles.progressBar}
      />

      <View style={styles.content}>
        <StepComponent onNext={goNext} />
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17261F',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#17261F',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  progressBar: {
    width: '100%',
    height: '6',
    marginVertical: 10,
    borderRadius: '0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileCreationSteps;
