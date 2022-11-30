import React, {useState} from 'react';
import {Alert, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {AppImage} from '../../components/AppImage';
import {images} from '../../utils/constants';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {Colors} from '../../theme/colors';
import {Divider} from 'react-native-paper';
import {QuestionCard} from '../questions/QuestionCard';
import {toRgba} from '../../utils/utils';
import {CameraIcon} from '../../components/icons/CameraIcon';
import {MotherDetailsForm} from './MotherDetailsForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    padding: 16,
  },
  indicatorContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderBottomWidth: 5,
    borderBottomColor: Colors.grey_2,
  },
  imageOverlay: {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: toRgba(Colors.primary, 0.4),
    zIndex: 999,
    borderRadius: 12,
  },
  imageButton: {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 999,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MotherDetailsScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number>(0);

  return (
    <View style={styles.container}>
      <StatusBar />
      <StackHeader
        title={'Your Surrogate Mother'}
        // actions={[
        //     <TouchableOpacity
        //         activeOpacity={0.8}
        //         onPress={() => setIsEditing(!isEditing)}>
        //         <PencilIcon />
        //     </TouchableOpacity>,
        // ]}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {/*<KeyboardAvoidingView*/}
          {/*  behavior="position"*/}
          {/*  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>*/}
          <View style={styles.centeredContainer}>
            <View style={styles.row}>
              <View style={{marginRight: 8}}>
                <TouchableOpacity onPress={() => setSelectedProfile(0)}>
                  <AppImage size={100} uri={images.FEMALE} isLocal={true} />
                  {selectedProfile !== 0 && (
                    <View style={styles.imageOverlay} />
                  )}
                  {isEditing && selectedProfile === 0 && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.imageButton}
                      onPress={() => Alert.alert('select image')}>
                      <CameraIcon color={'white'} />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <AppSpacing gap={16} />

          {isEditing && <MotherDetailsForm />}
          {/*</KeyboardAvoidingView>*/}

          {!isEditing && (
            <View style={styles.centeredContainer}>
              <AppText variant={'h2'}>Mark Baggins</AppText>
              <AppSpacing />
              <View style={styles.row}>
                <AppText color={Colors.grey_3}>01/02/1988 </AppText>
                <AppSpacing isHorizontal={true} />
                <AppText>(37 Year)</AppText>
              </View>
              <AppSpacing gap={16} />
              <Divider
                style={{
                  backgroundColor: Colors.grey_bg,
                  height: 2,
                  width: 50,
                }}
              />
              <AppSpacing gap={16} />
              <AppText>888 Main St, Seattle, WA 98006</AppText>
              <AppSpacing gap={16} />
              <AppText color={Colors.primary}>+880 9589876</AppText>
              <AppSpacing gap={16} />
              <AppText>marktvan@gmail.ua</AppText>
            </View>
          )}

          <AppSpacing gap={16} />

          {isEditing && (
            <View>
              <AppText fontWeight={'700'}>
                Existing questions in the profile
              </AppText>
              <AppSpacing gap={8} />
            </View>
          )}

          <View>
            <View>
              {[1, 2, 3].map((item, index) => {
                return (
                  <View style={{marginVertical: 8}} key={`q-${index}`}>
                    <QuestionCard
                      title={'What is your favorite snack?'}
                      user={'Martha Smith'}
                      answer={'Chocolate all the way!!'}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
