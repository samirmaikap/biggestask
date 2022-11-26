import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import appStyles from '../theme/AppStyles';
import {MenuIcon} from './icons/MenuIcon';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 8,
    flex: 1,
    alignItems: 'center',
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

const TabHeader = (props: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const {title, actions} = props;

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[appStyles.appBarContainer, {marginTop: insets.top}]}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => openMenu()}>
          <MenuIcon />
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
      <View style={[styles.row, {minWidth: 40}]}>{actions}</View>
    </View>
  );
};

export default TabHeader;
