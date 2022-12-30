export type NavigationKeyType =
    | 'AuthNavigator'
    | 'RootNavigator'
    | 'Login'
    | 'Signup'
    | 'Verify'
    | 'Profile'
    | 'Home'
    | 'CommunityPosts'
    | 'MotherDetails'
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
    | 'WaitingSurrogate';

const Screens: {[key in NavigationKeyType]: string} = {
    AuthNavigator: 'AuthNavigator',
    RootNavigator: 'RootNavigator',
    Login: 'Login',
    Signup: 'Signup',
    Verify: 'Verify',
    Profile: 'Profile',
    Home: 'Home',
    CommunityPosts: 'CommunityPosts',
    MotherDetails: 'MotherDetails',
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
};

export default Screens;
