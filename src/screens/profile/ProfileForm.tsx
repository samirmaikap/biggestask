import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from '../../theme/colors';
import {TextInput} from 'react-native-paper';
import {AppText} from '../../components/AppText';
import {UsersIcon} from '../../components/icons/UsersIcon';
import {PhoneIcon} from '../../components/icons/PhoneIcon';
import {EmailIcon} from '../../components/icons/EmailIcon';
import {LocationPin} from '../../components/icons/LocationPin';
import {CalendarIcon} from '../../components/icons/CalendarIcon';
import {UserIcon} from '../../components/icons/UserIcon';
import AppStyles from '../../theme/AppStyles';
import DropDownPicker from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputGroup: {
    marginVertical: 8,
  },
  input: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export const ProfileForm = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
  ]);

  return (
    <View>
      <View style={styles.inputGroup}>
        <AppText>Full name</AppText>
        <TextInput
          mode={'outlined'}
          right={
            <TextInput.Icon icon={() => <UserIcon color={Colors.grey_3} />} />
          }
          outlineStyle={{borderColor: Colors.grey_bg}}
          style={[styles.input, {backgroundColor: Colors.grey_bg}]}
          theme={{roundness: 12}}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText>Gender</AppText>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select gender"
          style={AppStyles.dropdownInput}
          containerStyle={{height: 40, marginTop: 10, marginBottom: 10}}
          dropDownContainerStyle={AppStyles.dropdownContainerStyle}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText>Phone number</AppText>
        <TextInput
          mode={'outlined'}
          right={
            <TextInput.Icon icon={() => <PhoneIcon color={Colors.grey_3} />} />
          }
          outlineStyle={{borderColor: Colors.grey_bg}}
          style={[styles.input, {backgroundColor: Colors.grey_bg}]}
          theme={{roundness: 12}}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText>Email</AppText>
        <TextInput
          mode={'outlined'}
          right={
            <TextInput.Icon icon={() => <EmailIcon color={Colors.grey_3} />} />
          }
          outlineStyle={{borderColor: Colors.grey_bg}}
          style={[styles.input, {backgroundColor: Colors.grey_bg}]}
          theme={{roundness: 12}}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText>Home Address</AppText>
        <TextInput
          mode={'outlined'}
          right={
            <TextInput.Icon
              icon={() => <LocationPin color={Colors.grey_3} />}
            />
          }
          outlineStyle={{borderColor: Colors.grey_bg}}
          style={[styles.input, {backgroundColor: Colors.grey_bg}]}
          theme={{roundness: 12}}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText>Your date of birth</AppText>
        <TextInput
          mode={'outlined'}
          right={
            <TextInput.Icon
              icon={() => <CalendarIcon color={Colors.grey_3} />}
            />
          }
          outlineStyle={{borderColor: Colors.grey_bg}}
          style={[styles.input, {backgroundColor: Colors.grey_bg}]}
          theme={{roundness: 12}}
        />
      </View>
    </View>
  );
};