import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {AppCard} from '../../components/AppCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <StackHeader title={'Profile'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <AppCard>
          <Text>adsad</Text>
        </AppCard>
      </ScrollView>
      <Text>Profile</Text>
    </View>
  );
};
