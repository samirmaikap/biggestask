import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {AppCard} from '../../components/AppCard';
import {Button} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import TabHeader from '../../components/TabHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar />
      <TabHeader title={'Home'} />
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        <Text>Home</Text>
        <AppCard>
          <Text>sdaasdas</Text>
          <View style={{height: 200, backgroundColor: 'yellow'}} />
          <Button
            onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}>
            Click
          </Button>
        </AppCard>
      </ScrollView>
    </View>
  );
};
