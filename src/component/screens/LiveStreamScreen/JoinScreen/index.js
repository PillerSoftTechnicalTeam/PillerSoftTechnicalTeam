import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View ,Image,Dimensions,BackHandler} from "react-native";
import Button from '../../../Common/Button';

import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from "react-native-webrtc";
import { db } from "../utilities/firebase";
const { width } = Dimensions.get('window');

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function JoinScreen({ setScreen, screens, roomId }) {
  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
    // cleanup
    setScreen(screens.ROOM);
    removePeer(roomId);
  }

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();

  const [isMuted, setIsMuted] = useState(false);
  const [watching, setWatching] = useState(0);
  const [user, setUser] = useState(0);


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
return()=>{
  BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

}
  }, [handleBackButtonClick]);

const  handleBackButtonClick=()=> {
    // this.props.navigation.goBack(null);
    return true;
}

  useEffect(() => {
    startLocalStream();

    watcher(roomId);
    const user = "p-" + Math.floor(Math.random() * 100) + 1;
    setUser(user);
  }, []);

  const startLocalStream = async () => {
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? "front" : "environment";
    const videoSourceId = devices.find(
      (device) => device.kind === "videoinput" && device.facing === facing
    );
    const facingMode = isFront ? "user" : "environment";
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const watcher = async (id) => {
    const roomRef = await db.collection("rooms").doc(id);
    const roomSnapshot = await roomRef.get();
    if (!roomSnapshot.exists) return;
    roomRef.collection("peers").onSnapshot((snapshot) => {
      console.log("All Watching Data: ", snapshot.size);
      setWatching(snapshot.size);
    });
  };

  const joinCall = async (id, isWait) => {
    console.log("roomid1", id);
    console.log("roomid2", roomId);

    await addPeer(roomId);

    setTimeout(
      async (id) => {
        const roomRef = await db.collection("rooms").doc(id);
        const roomSnapshot = await roomRef.get();

        if (!roomSnapshot.exists) {
          console.log("not availble", id);
          return;
        }
        const localPC = new RTCPeerConnection(configuration);
        localPC.addStream(localStream);

        const calleeCandidatesCollection = roomRef.collection(
          "calleeCandidates"
        );
        localPC.onicecandidate = (e) => {
          if (!e.candidate) {
            console.log("Got final candidate!");
            return;
          }
          calleeCandidatesCollection.add(e.candidate.toJSON());
        };

        localPC.onaddstream = (e) => {
          if (e.stream && remoteStream !== e.stream) {
            console.log("RemotePC received the stream join", e.stream);
            setRemoteStream(e.stream);
          }
        };

        const offer = roomSnapshot.data().offer;
        await localPC.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await localPC.createAnswer();
        await localPC.setLocalDescription(answer);

        const roomWithAnswer = { answer };
        await roomRef.update(roomWithAnswer);

        roomRef.collection("callerCandidates").onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              let data = change.doc.data();
              await localPC.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });

        setCachedLocalPC(localPC);
      },
      isWait ? 2000 : 100,
      id
    );
  };

  const addPeer = async (id) => {
    const roomRef = await db.collection("rooms").doc(id);
    const roomSnapshot = await roomRef.get();

    if (!roomSnapshot.exists) return;

    const calleeCandidatesCollection = roomRef.collection("peers");
    calleeCandidatesCollection.doc(user).set({ uid: "11", doc: user });
  };

  const removePeer = async (id) => {
    const roomRef = await db.collection("rooms").doc(id);
    const roomSnapshot = await roomRef.get();

    if (!roomSnapshot.exists) return;

    const calleeCandidatesCollection = roomRef.collection("peers");
    calleeCandidatesCollection.doc(user).delete();
  };

  return (
    <>
      {/* <Text style={styles.heading}>Join Screen</Text>
      <Text style={styles.heading}>Room : {roomId}</Text> */}

      <View style={styles.callButtons}>
        <View styles={styles.buttonContainer}>
          {/* <Button style={{backgroundColor: '#530D89',}} title="Leave" onPress={onBackPress} /> */}
          <Button
                    customStyle={[styles.publishContainer, { width: width / 5.5, borderRadius: 6, height: width / 10.5, backgroundColor: '#530D89', marginStart: 5}]}
                    titleStyle={{ fontSize: 12 }}
                  title="Leave"
                  onPress={onBackPress}
                />
        </View>
        <Image style={{  height: width / 10.39, width: width / 4.39,}} source={require('../../../../resources/images/ic_live.png')} />

        <View styles={styles.buttonContainer}>
          {!localStream && (
            // <Button style={{backgroundColor: '#530D89',}} title="Click to Join Live" onPress={startLocalStream} />
            <Button
                    customStyle={[styles.publishContainer, { width: width / 5.5, borderRadius: 6, height: width / 10.5, backgroundColor: '#530D89', marginStart: 5}]}
                    titleStyle={{ fontSize: 12 }}
                  title="Click to Join Live"
                  onPress={startLocalStream}
                />
          )}
          {localStream && (
            <>
              {/* <Button style={{backgroundColor: '#530D89',}}
                title="Join Live"
                onPress={() => {
                  console.log("watching called", watching);
                  if (watching < 1) {
                    console.log("true called", roomId);
                    joinCall(roomId, false);
                  } else {
                    console.log("false called", roomId + user);
                    joinCall(roomId + user, true);
                  }
                }}
                disabled={!!remoteStream}
              /> */}
                <Button
                    customStyle={[styles.publishContainer, { width: width / 5.5, borderRadius: 6, height: width / 10.5, backgroundColor: '#530D89', marginStart: 5}]}
                    titleStyle={{ fontSize: 12 }}
                    title="Join Live"
                    onPress={() => {
                      console.log("watching called", watching);
                      if (watching < 1) {
                        console.log("true called", roomId);
                        joinCall(roomId, false);
                      } else {
                        console.log("false called", roomId + user);
                        joinCall(roomId + user, true);
                      }
                    }}
                    disabled={!!remoteStream}
                />
            </>
          )}
        </View>
      </View>

      <View style={{ display: "flex", flex: 1, padding: 10 }}>
        <View style={styles.rtcview}>
          {remoteStream && (
            <RTCView
              style={styles.rtc}
              streamURL={remoteStream && remoteStream.toURL()}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center",
    fontSize: 30,
  },
  rtcview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    // margin: 5,
  },
  rtc: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  toggleButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  callButtons: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    margin: 5,
  },
});
