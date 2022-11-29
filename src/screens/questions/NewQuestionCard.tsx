import {Button, useTheme} from 'react-native-paper';
import AppStyles from '../../theme/AppStyles';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import DropDownPicker from 'react-native-dropdown-picker';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import React, {useState} from 'react';
import {AppCard} from '../../components/AppCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    padding: 16,
  },
  title: {
    paddingVertical: 16,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const NewQuestionCard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'John Doe', value: '1'},
    {label: 'Jane Doe', value: '2'},
  ]);

  return (
    <AppCard padding={16} backgroundColor={theme.colors.primary}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <AppText variant={'h3'} color={'white'}>
          Your latest questions
        </AppText>
        <AppSpacing gap={8} />
        <AppText textAlign={'center'} color={'white'}>
          Do you like sports?
        </AppText>
        <AppSpacing gap={8} />
        <AppText textAlign={'center'} color={'white'}>
          If so, who is your favorite sports team?
        </AppText>
      </View>
      <AppSpacing gap={16} />
      <AppBottomSheet
        action={
          <Button
            textColor={theme.colors.primary}
            mode="contained"
            style={[AppStyles.button, {backgroundColor: 'white'}]}>
            Answer the Question
          </Button>
        }>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.centerContainer}>
            <AppText variant={'h2'}>New Questions</AppText>
            <AppText textAlign={'center'}>
              Would you like to be famous? is what way?
            </AppText>
          </View>
          <AppSpacing gap={16} />
          <AppText fontWeight={'bold'}>Answer</AppText>
          <AppSpacing gap={4} />
          <BottomSheetTextInput
            multiline={true}
            style={[AppStyles.textInput, {padding: 16, minHeight: 100}]}
          />
          <AppSpacing gap={16} />
          <AppText fontWeight={'bold'}>Parents</AppText>
          <AppSpacing gap={4} />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select Username"
            style={AppStyles.dropdownInput}
            containerStyle={{height: 40, marginTop: 10, marginBottom: 10}}
            dropDownContainerStyle={AppStyles.dropdownContainerStyle}
          />
          <AppSpacing gap={16} />
          <Button mode="contained" style={[AppStyles.button]}>
            Add Answer
          </Button>
        </View>
      </AppBottomSheet>
    </AppCard>
  );
};
