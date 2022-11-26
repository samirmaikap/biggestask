import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import appStyles from '../theme/AppStyles';
import {ChevronLeftIcon} from './icons/ChevronLeftIcon';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 8,
    flex: 1,
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  title: string;
  actions?: any[];
  goBackAction?: Function;
};

const StackHeader = (props: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const {title, actions, goBackAction = onPressGoBack} = props;

  return (
    <View style={[appStyles.appBarContainer, {marginTop: insets.top}]}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => goBackAction()}>
          <ChevronLeftIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={[
            appStyles.textMedium,
            {color: theme.colors.secondary, fontWeight: 'bold'},
          ]}>
          {title}
        </Text>
      </View>
      <View style={styles.row}>{actions}</View>
    </View>
  );
};

export default StackHeader;
