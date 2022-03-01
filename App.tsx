import React from "react";
import { Root, } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from './src/component/screens/SplashScreen'
import LoginScreen from './src/component/screens/LoginScreen'
import ForgetPasswordScreen from './src/component/screens/ForgetPasswordScreen'
import SignUpScreen from './src/component/screens/SignUpScreen'
import HomeScreen from './src/component/screens/HomeScreen'
import CreatePostScreen from './src/component/screens/CreatePostScreen'
import ProfileScreen from './src/component/screens/ProfileScreen'
import OthersProfileScreen from './src/component/screens/OthersProfileScreen'
import AboutMeScreen from './src/component/screens/AboutMeScreen'
import EditInfoScreen from './src/component/screens/EditInfoScreen'
import FriendScreen from './src/component/screens/FriendScreen'
import InviteFriendScreen from './src/component/screens/InviteFriendScreen'
import MarketPlaceScreen from './src/component/screens/MarketPlaceScreen'
import CategoriesScreen from './src/component/screens/CategoriesScreen'
import ItemSaleScreen from './src/component/screens/ItemSaleScreen'
import BiblesScreen from './src/component/screens/BiblesScreen'
// ------------------GroupTabs----------------------
import GroupTab from './src/component/screens/GroupTabs/GroupTabs'
// ----------------------------------------------------
import GroupDetail from "./src/component/screens/GroupDetail";
import RecentActivity from './src/component/screens/RecentActivity'
import CreateGroupScreen from './src/component/screens/CreateGroupScreen'
import EventScreen from './src/component/screens/EventScreen'
import CreateEventScreen from './src/component/screens/CreateEventScreen'
import ChatScreen from './src/component/screens/ChatScreen'
import ChatListScreen from './src/component/screens/ChatListScreen'
import ChurchScreen from './src/component/screens/ChurchScreen'
import MarketPlaceNearYouScreen from './src/component/screens/MarketPlaceNearYouScreen'
import CommentScreen from './src/component/screens/CommentScreen'
import ResetPasswordScreen from './src/component/screens/ResetPasswordScreen'
import PastEventScreen from './src/component/screens/PastEventScreen'
import MyGroupScreen from './src/component/screens/MyGroupScreen'
import GroupSuggestions from "./src/component/screens/GroupSuggestions";
import DiscoverScreen from './src/component/screens/DiscoverScreen'
import GroupNotificationScreen from './src/component/screens/GroupNotificationScreen'
import GroupFeedScreen from './src/component/screens/GroupFeedScreen'
import BrowseEventScreen from './src/component/screens/BrowseEventScreen'
import AllEventScreen from './src/component/screens/AllEventScreen'
import LiveStreamScreen from './src/component/screens/LiveStreamScreen'
import MarketPlaceDetailScreen from './src/component/screens/MarketPlaceDetailScreen'
import EventDetailScreen from './src/component/screens/EventDetailScreen'
import { firebase } from "@react-native-firebase/firestore";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
// const firebaseConfig = {
//   apiKey: "AIzaSyDVkKD5hbD6R815guSExPoQifK3IogwXgw",
//   authDomain: "chatdemo-d0a3b.firebaseapp.com",
//   databaseURL: "https://chatdemo-d0a3b-default-rtdb.firebaseio.com",
//   projectId: "chatdemo-d0a3b",
//   storageBucket: "chatdemo-d0a3b.appspot.com",
//   messagingSenderId: "1046205006946",
//   appId: "1:1046205006946:web:f7f04fcc27a65adc043d3b",
//   measurementId: "G-LBCX4SXQ1W"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCMv1V8D9oIO_4XCmS6CNxyp6j6VFkFzrE",
  authDomain: "godconnect-d5ee3.firebaseapp.com",
  projectId: "godconnect-d5ee3",
  storageBucket: "godconnect-d5ee3.appspot.com",
  messagingSenderId: "147673832328",
  appId: "1:147673832328:web:0c2e25b8c7b9b3fcf9383d",
  measurementId: "G-FJKG2DTTMZ"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const App = () => {
  return (

    <Root >
    <NavigationContainer independent={true}>
<Stack.Navigator initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}
            >

      <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="OthersProfileScreen" component={OthersProfileScreen} />
            <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
            <Stack.Screen name="EditInfoScreen" component={EditInfoScreen} />
            <Stack.Screen name="FriendScreen" component={FriendScreen} />
            <Stack.Screen name="InviteFriendScreen" component={InviteFriendScreen} /> 
            <Stack.Screen name="MarketPlaceScreen" component={MarketPlaceScreen} />
            <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
            <Stack.Screen name="ItemSaleScreen" component={ItemSaleScreen} />
            <Stack.Screen name="BiblesScreen" component={BiblesScreen} />
            <Stack.Screen name="GroupsTabs" component={GroupTab} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} />
            <Stack.Screen name="RecentActivity" component={RecentActivity} />
            <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen} />
            <Stack.Screen name="EventScreen" component={EventScreen} />
            <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
            <Stack.Screen name="ChurchScreen" component={ChurchScreen} />
            <Stack.Screen name="MarketPlaceNearYouScreen" component={MarketPlaceNearYouScreen} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="PastEventScreen" component={PastEventScreen} />
            <Stack.Screen name="MyGroupScreen" component={MyGroupScreen} />
            <Stack.Screen name="GroupSuggestions" component={GroupSuggestions} />
            <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
            <Stack.Screen name="GroupNotificationScreen" component={GroupNotificationScreen} />
            <Stack.Screen name="GroupFeedScreen" component={GroupFeedScreen} />
            <Stack.Screen name="BrowseEventScreen" component={BrowseEventScreen} />
            <Stack.Screen name="AllEventScreen" component={AllEventScreen} />
            <Stack.Screen name="LiveStreamScreen" component={LiveStreamScreen} />
            <Stack.Screen name="MarketPlaceDetailScreen" component={MarketPlaceDetailScreen} />
            <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />

    </Stack.Navigator>
        </NavigationContainer>
      </Root>

  )
};
