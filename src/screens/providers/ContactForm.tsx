import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import {Button} from 'react-native-paper';
import AppStyles from '../../theme/AppStyles';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppSpacing} from '../../components/AppSpacing';
import DropDownPicker from 'react-native-dropdown-picker';
import {PlusIcon} from '../../components/icons/PlusIcon';

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: 8,
    zIndex: -1,
  },
  input: {
    backgroundColor: Colors.grey_bg,
  },
});

export const ContactForm = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Fertility Doctor', value: '1'},
    {label: 'Agency Case Manager', value: '2'},
    {label: 'Surrogacy Lawyer', value: '3'},
    {label: 'ObGyn', value: '4'},
  ]);

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.inputGroup}>
        <AppText>Title</AppText>
        <AppSpacing />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select Title"
          style={AppStyles.dropdownInput}
          containerStyle={{height: 40, marginBottom: 10}}
          dropDownContainerStyle={AppStyles.dropdownContainerStyle}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText>Contact Rep Name</AppText>
        <AppSpacing />
        <BottomSheetTextInput style={[AppStyles.textInput, {padding: 16}]} />
      </View>
      <View style={styles.inputGroup}>
        <AppText>Contact Email</AppText>
        <AppSpacing />
        <BottomSheetTextInput
          textContentType={'emailAddress'}
          style={[AppStyles.textInput, {padding: 16}]}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText>Contact phone number</AppText>
        <AppSpacing />
        <BottomSheetTextInput style={[AppStyles.textInput, {padding: 16}]} />
      </View>
      <AppSpacing gap={16} />
      <Button
        contentStyle={AppStyles.buttonContent}
        mode={'contained'}
        icon={() => <PlusIcon color={'white'} />}
        style={AppStyles.button}>
        Add New Contact
      </Button>
    </View>
  );
};
