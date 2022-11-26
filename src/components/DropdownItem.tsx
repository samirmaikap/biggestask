import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {textGreyColor} from '../theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconContainer: {
    // width: 50,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
});

type Props = {
  icon?: any;
  title: string;
  description?: string;
  onPress: Function;
};

export const DropdownItem = (props: Props) => {
  const theme = useTheme();
  const {icon, title, description, onPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress()}
      style={styles.item}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={{fontWeight: '500'}}>
          {title}
        </Text>
        {description && (
          <Text style={{color: textGreyColor, marginTop: 4}}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
