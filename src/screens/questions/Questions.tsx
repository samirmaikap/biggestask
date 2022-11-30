import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import TabHeader from '../../components/TabHeader';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import AppStyles from '../../theme/AppStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import {NewQuestionCard} from './NewQuestionCard';
import {QuestionCard} from './QuestionCard';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        padding: 16,
    },
});

export const QuestionsScreen = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Every day', value: '1'},
        {label: 'Every 3 days', value: '2'},
        {label: 'Every Week', value: '2'},
    ]);

    return (
        <View style={styles.container}>
            <StatusBar />
            <TabHeader title={'Question Bank'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <AppText>
                        Get to know your surrogacy partner as the journey
                        unfolds. The app will send you and your surrogacy
                        partner questions and exchange the answers. As the
                        journey progresses, the questions become more
                        interesting and intimate, so that you bond naturally
                        with each other. Select how often you'd like to answer a
                        question
                    </AppText>
                    <AppSpacing gap={16} />
                    <AppText variant={'custom'} fontWeight={'800'} size={16}>
                        New questions in the profile
                    </AppText>
                    <AppSpacing gap={16} />
                    <AppText>Frequency of the questions:</AppText>
                    <DropDownPicker
                        open={openDropdown}
                        value={value}
                        items={items}
                        setOpen={setOpenDropdown}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select Frequency"
                        style={AppStyles.dropdownInput}
                        containerStyle={{
                            height: 40,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        dropDownContainerStyle={
                            AppStyles.dropdownContainerStyle
                        }
                    />
                    <AppSpacing gap={16} />
                    <NewQuestionCard />
                    <AppSpacing gap={16} />
                    <AppText variant={'custom'} fontWeight={'800'} size={16}>
                        Existing questions in the profile
                    </AppText>
                    <AppSpacing gap={8} />
                    {[1, 2, 3].map((item, index) => {
                        return (
                            <View
                                style={{marginVertical: 8}}
                                key={`i-${index}`}>
                                <QuestionCard
                                    title={'What is your favorite snack?'}
                                    user={'Martha Smith'}
                                    answer={'Chocolate all the way!!'}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};
