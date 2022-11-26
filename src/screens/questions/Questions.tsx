import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import TabHeader from '../../components/TabHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const QuestionsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <TabHeader title={'Questions'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Text>sdsd</Text>
      </ScrollView>
    </View>
  );
};
