import React, {useState} from 'react';
import {Image, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {AppCard} from '../../components/AppCard';
import TabHeader from '../../components/TabHeader';
import {AppText} from '../../components/AppText';
import {images} from '../../utils/constants';
import {CalendarIcon} from '../../components/icons/CalendarIcon';
import {AppSpacing} from '../../components/AppSpacing';
import AppStyles from '../../theme/AppStyles';
import {Colors} from '../../theme/colors';
import {QuestionCard} from '../questions/QuestionCard';
import {NewQuestionCard} from '../questions/NewQuestionCard';
import AppButton from '../../components/AppButton';
import {useAppContext} from '../../contexts/AppContext';

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

export const HomeScreen = () => {
    const {state} = useAppContext();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <TabHeader title={'Home'} />

            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <View style={styles.title}>
                        <AppText
                            variant={'custom'}
                            fontWeight={'800'}
                            size={16}>
                            Pregnancy milestone
                        </AppText>
                    </View>
                    <AppCard padding={16}>
                        <View
                            style={[
                                styles.row,
                                {justifyContent: 'space-between'},
                            ]}>
                            <View style={{marginRight: 16, flex: 1}}>
                                <AppText fontWeight={'800'}>
                                    Week seventeen
                                </AppText>
                                <AppSpacing gap={8} />
                                <AppText>
                                    Your baby is the size of avocado!
                                </AppText>
                            </View>
                            <View>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={images.AVOCADO}
                                />
                            </View>
                        </View>
                    </AppCard>
                    {/*Section Next Milestone*/}
                    <View style={styles.title}>
                        <AppText
                            variant={'custom'}
                            fontWeight={'800'}
                            size={16}>
                            Next Milestone
                        </AppText>
                    </View>
                    <AppCard padding={16}>
                        <Image
                            style={{width: '100%', height: 200}}
                            source={images.MEDICAL_EXAM}
                        />
                        <AppText variant="h2">Medical Clearance Exam</AppText>
                        <AppSpacing />
                        <View style={styles.row}>
                            <View>
                                <CalendarIcon size={16} color={Colors.grey_3} />
                            </View>
                            <AppSpacing isHorizontal={true} />
                            <AppText
                                variant={'custom'}
                                size={12}
                                color={Colors.grey_3}>
                                09/22/2021 at 9:30AM
                            </AppText>
                        </View>
                        <AppSpacing gap={16} />
                        <AppButton
                            contentStyle={AppStyles.buttonContent}
                            textColor={Colors.grey_2}
                            style={[
                                AppStyles.button,
                                {borderColor: Colors.grey_4},
                            ]}
                            mode={'outlined'}>
                            Ask Gestational Carrier
                        </AppButton>
                    </AppCard>
                    {/*Section Last Questions*/}
                    <View style={styles.title}>
                        <AppText
                            variant={'custom'}
                            fontWeight={'800'}
                            size={16}>
                            Your latest questions
                        </AppText>
                    </View>
                    <NewQuestionCard />
                    {/*Section Your Surrogate*/}
                    <View style={styles.title}>
                        <AppText
                            variant={'custom'}
                            fontWeight={'800'}
                            size={16}>
                            Your Gestational Carrier
                        </AppText>
                    </View>
                    <QuestionCard
                        title={'What is your favorite snack?'}
                        user={'Martha Smith'}
                        answer={'Chocolate all the way!!'}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
