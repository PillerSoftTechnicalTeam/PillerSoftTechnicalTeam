import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList, Dimensions, Image
} from "react-native";
import { db } from '../utilities/firebase';
import TitleHeader from '../../../Common/TitleHeader';
const { width } = Dimensions.get('window');
import Button from '../../../Common/Button';
import Loading from '../../../Common/Loader';

export default function RoomScreen({ setScreen, screens, setRoomId, roomId, navigation }) {
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getBroadcasts();
  }, []);
  const onCallOrJoin = (screen) => {
    db.collection("Usersxxr")
      .doc("ABC")
      .set({
        name: "Adaxxx Lovelace",
        age: 30,
      })
      .then(() => {
        console.log("User added!");
      });
    // if (roomId.length > 0) {
    if (true) {
      setScreen(screen);
    }
  };
  const CreateBroadCast = (screen) => {
    const roomId = "r-" + Math.floor(Math.random() * 1000) + 1;
    setRoomId(roomId);
    setScreen(screen);
  };

  const flatJoin = (screen, rid) => {
    console.log('screen and id ',rid,screen)
    setRoomId(rid);
    setScreen(screen);
  };

  const getBroadcasts = async () => {
    try {
      const response = await fetch(
        "https://staging.godconnect.online/api/CommonAPI/GetLiveStreamUser"
      );
      const json = await response.json();
      console.log('room.response,', json.response);
      setRooms(json.response);
      setRefreshing(false)
      setLoading(false);
      // return json.response;
    } catch (error) {
      console.error(error);
    }
  };

  const _handleRefresh = () => {
    setRefreshing(true)
    getBroadcasts();
  }
  return (
    <>
      {/* <Text style={styles.heading}>LIVE USERS</Text> */}
      {/* <TextInput style={styles.input} value={roomId} onChangeText={setRoomId} />
      <View style={styles.buttonContainer}>
        <Button
          title="Join BroadCast"
          onPress={() => onCallOrJoin(screens.JOIN)}
        />
      </View> */}
      <TitleHeader
        customHeaderStyle={{ width: width / 2.9, }}
        title={true} title={'LIVE STREAM USERS'} tapOnBack={() => navigation.goBack()} />
      <Loading loading={loading} loaderColor={'white'} />

      <View style={styles.buttonContainer}>
        <Button
          title="Start BroadCast"
          customStyle={[styles.publishContainer, { backgroundColor: '#CEBFDA', width: width / 1.2 }]}
          titleStyle={{ fontSize: 14, color: '#530D89' }}
          // onPress={() => onCallOrJoin(screens.CALL)}
          onPress={() => CreateBroadCast(screens.CALL)}
        />
      </View>
      {!loading && (
        <>
          {/* <Text style={styles.heading}> Available Streams </Text> */}
          {rooms.length > 0 ? <FlatList style={{ marginStart: 8, marginEnd: 8 }}
            data={rooms}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ width: '67%', flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ height: width / 8.39, width: width / 7.39, borderRadius: 25 }}
                    source={{
                      uri: item.CreatedByImage ?
                        'http://staging.godconnect.online/UploadedImages/ProfileImages/' + item.CreatedByImage :
                        'http://staging.godconnect.online/UploadedImages/ProfileImages/dummy.png'
                    }} />
                  {/* <Text style={styles.item}>{item.StreamLink}</Text> */}
                  <Text style={{ fontSize: 16, marginStart: 12, width: '68%' }}>{item.CreatedByName}</Text>
                </View>
                <Button
                  customStyle={[styles.publishContainer, { width: width / 4.5, borderRadius: 10, height: width / 10.5, backgroundColor: '#530D89', marginStart: 5 }]}
                  titleStyle={{ fontSize: 12 }}
                  title="Join"
                  onPress={() => flatJoin(screens.JOIN, item.StreamLink)}
                />
              </View>
            )}
          /> :
            <Text style={styles.heading}>{'No Users Available'}</Text>}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginVertical: 120,
    alignSelf: "center",
    fontSize: 18,
  },
  input: {
    margin: 20,
    height: 40,
    backgroundColor: "#aaa",
  },
  buttonContainer: {
    margin: 5,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    marginBottom: 10,
    borderRadius: 10,
    // backgroundColor: "#D3D3D3",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 8, alignItems: 'center'
  },
});
