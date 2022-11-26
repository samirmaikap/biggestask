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
  | 'DetailedSettings';

const Screens: {
  AuthNavigator: string;
  RootNavigator: string;
  Login: string;
  Signup: string;
  Verify: string;
  Profile: string;
  Home: string;
  CommunityPosts: string;
  MotherDetails: string;
  CommunityProfile: string;
  Notifications: string;
  Questions: string;
  Settings: string;
  Help: string;
  Milestones: string;
  MilestoneDetails: string;
  Privacy: string;
  Terms: string;
  DetailedSettings: string;
} = {
  AuthNavigator: 'AuthNavigator',
  RootNavigator: 'RootNavigator',
  Login: 'Login',
  Signup: 'Signup',
  Verify: 'Verify',
  Profile: 'Profile',
  Home: 'Home',
  CommunityPosts: 'CommunityPosts',
  MotherDetails: 'MotherDetails',
  CommunityProfile: 'CommunityProfile',
  Notifications: 'Notifications',
  Questions: 'Questions',
  Settings: 'Settings',
  Help: 'Help',
  Milestones: 'Milestones',
  MilestoneDetails: 'MilestoneDetails',
  Privacy: 'Privacy',
  Terms: 'Terms',
  DetailedSettings: 'DetailedSettings',
};

export default Screens;
