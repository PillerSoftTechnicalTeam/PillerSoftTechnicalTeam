import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, RecyclerViewBackedScrollView } from 'react-native';
import RoomScreen from './RoomScreen';
import CallScreen from './CallScreen';
import JoinScreen from './JoinScreen';
// import HomeScreen from '../HomeScreen';


export default function App({navigation}) {
  const screens = {
    ROOM: 'JOIN_ROOM',
    CALL: 'CALL',
    JOIN: 'JOIN',
    HOME: 'HOME',

  }

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState('');

  let content;

  switch (screen) {
    case screens.ROOM:
      content = <RoomScreen roomId={roomId} setRoomId={setRoomId} screens={screens} setScreen={setScreen} navigation={navigation} />
      break;

    case screens.CALL:
      content = <CallScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      break;

    case screens.JOIN:
      content = <JoinScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      break;

    //   case screens.HOME:
    //   content = <HomeScreen roomId={roomId} screens={screens} setScreen={setScreen} />
    //   break;
    default:
      content = <Text>Wrong Screen</Text>
    // content = <HomeScreen roomId={roomId} screens={screens} setScreen={setScreen} />

  }

  return (
    <SafeAreaView style={styles.container} >
      {content}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
