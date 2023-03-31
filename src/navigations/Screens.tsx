export type NavigationKeyType =
    | 'AuthNavigator'
    | 'RootNavigator'
    | 'Login'
    | 'Email'
    | 'Verify'
    | 'ResetPassword'
    | 'Profile'
    | 'Home'
    | 'CommunityPosts'
    | 'Notifications'
    | 'Questions'
    | 'Settings'
    | 'Help'
    | 'Milestones'
    | 'MilestoneDetails'
    | 'Privacy'
    | 'Terms'
    | 'DetailedSettings'
    | 'Autocomplete'
    | 'About'
    | 'Contacts'
    | 'Intro'
    | 'AccountSetup'
    | 'InviteSurrogate'
    | 'WaitingSurrogate'
    | 'Passcode';

const Screens: {[key in NavigationKeyType]: string} = {
    AuthNavigator: 'AuthNavigator',
    RootNavigator: 'RootNavigator',
    Login: 'Login',
    Email: 'Email',
    ResetPassword: 'ResetPassword',
    Verify: 'Verify',
    Profile: 'Profile',
    Home: 'Home',
    CommunityPosts: 'CommunityPosts',
    Notifications: 'Notifications',
    Questions: 'Questions',
    Settings: 'Settings',
    Help: 'Help',
    About: 'About',
    Milestones: 'Milestones',
    MilestoneDetails: 'MilestoneDetails',
    Privacy: 'Privacy',
    Terms: 'Terms',
    DetailedSettings: 'DetailedSettings',
    Autocomplete: 'Autocomplete',
    Contacts: 'Contacts',
    Intro: 'Intro',
    AccountSetup: 'CreateAccount',
    InviteSurrogate: 'InviteSurrogate',
    WaitingSurrogate: 'WaitingSurrogate',
    Passcode: 'Passcode',
};

export default Screens;
