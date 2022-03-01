
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View,Image ,Dimensions,BackHandler} from "react-native";

import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from "react-native-webrtc";
const { width } = Dimensions.get('window');
import Button from '../../../Common/Button';

import { db } from "../utilities/firebase";
import AppConstants from '../../../../constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function CallScreen({ setScreen, screens, roomId }) {
  // export default function CallScreen({ setScreen, screens }) {

  function onBackPress() {
    deleteBroadcast(streamId);
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    localStream.getTracks().forEach((track) => track.stop());
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();

    // cleanup
    setScreen(screens.ROOM);
  }

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [streamId, setStreamId] = useState();

  const [isMuted, setIsMuted] = useState(false);
  const [watching, setWatching] = useState(0);
  const [userDetails, setUserDetails] = useState(0);


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
    AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
      if (user_details) {
          let data = JSON.parse(user_details)
         setUserDetails(data)
         saveBroadcast(roomId,data);
         startLocalStream();
      }
  });
   
  }, []);


  const saveBroadcast = async (rid) => {
    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const url =
        "https://staging.godconnect.online/api/CommonAPI/SaveStream?link=" +
        rid +
        "&uid=3737&uname=abdul&streamName=test";
      const response = await fetch(url, config);
      const json = await response.json();
      console.log("📺 Started", json.response);
      setStreamId(json.response.CurrentId);
      // return json.response;
    } catch (error) {
      console.error(error);
    }
  };


  // const saveBroadcast = async (rid,data) => {
  //   let newId=''
  //   let a=''
  //   let b=0
  //   let c=''
    
  //   var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
  //   let oldId='https://godconnect.online/Staging/LiveSteam/WebLive%33852440010657689'
  //   a = oldId !== '' ? oldId.split('338524400106')[1] : ''
  //   b = parseInt(a)+RandomNumber
  //   newId = oldId !== '' ? oldId.split('57689')[0] : ''
  //   c = newId +b
  //   let url = `http://staging.godconnect.online/api/CommonAPI/SaveStream?link=${c}&uid=${data.Id}&uname=${data.Username}`

  //   try {
  //     const config = {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     // const url =
  //     //   "https://staging.godconnect.online/api/CommonAPI/SaveStream?link=" +
  //     //   rid +
  //     //   "&uid=3737&uname=abdul&streamName=test";
  //     // const url =url;
  //     const response = await fetch(url, config);
  //     const json = await response.json();
  //     console.log("📺 Started", json.response);
  //     setStreamId(json.response.CurrentId);
  //     // return json.response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const deleteBroadcast = async (sid) => {
    try {
      console.log("❌ sid", sid);
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "https://staging.godconnect.online/api/CommonAPI/Deletestream?StreamId=" +
          sid,
        config
      );
      const json = await response.json();
      console.log("🛑✋ stopped", json.response);

      // return json.response;
    } catch (error) {
      console.error(error);
    }
  };

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

  const startCall = async (id) => {
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);
    console.log("callig id", id);
    const roomRef = await db.collection("rooms").doc(id);
    const callerCandidatesCollection = roomRef.collection("callerCandidates");
    localPC.onicecandidate = (e) => {
      if (!e.candidate) {
        console.log("Got final candidate!");
        return;
      }
      callerCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = (e) => {
      if (e.stream && remoteStream !== e.stream) {
        console.log("RemotePC received the stream call", e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    const roomWithOffer = { offer };
    await roomRef.set(roomWithOffer);

    roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!localPC.currentRemoteDescription && data.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await localPC.setRemoteDescription(rtcSessionDescription);
      }
    });

    roomRef.collection("calleeCandidates").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    roomRef.collection("peers").onSnapshot((snapshot) => {
      console.log("All peers Data: ", snapshot.size);

      setWatching(snapshot.size);
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          console.log("New peer: ", change.doc.data());
          startCall2(id + change.doc.data().doc);
        }
        if (change.type === "modified") {
          console.log("Modified peer: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed peer: ", change.doc.data());
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const startCall2 = async (id) => {
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);
    console.log("callig id", id);
    const roomRef = await db.collection("rooms").doc(id);
    const callerCandidatesCollection = roomRef.collection("callerCandidates");
    localPC.onicecandidate = (e) => {
      if (!e.candidate) {
        console.log("Got final candidate!");
        return;
      }
      callerCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = (e) => {
      if (e.stream && remoteStream !== e.stream) {
        console.log("RemotePC received the stream call", e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    const roomWithOffer = { offer };
    await roomRef.set(roomWithOffer);

    roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!localPC.currentRemoteDescription && data.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await localPC.setRemoteDescription(rtcSessionDescription);
      }
    });

    roomRef.collection("calleeCandidates").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach((track) => track._switchCamera());
  };

  return (
    <>
      {/* <Text style={styles.heading}>Broadcast</Text> */}
      {/* <Text style={styles.heading}>Bid : {roomId}</Text> */}
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={styles.heading}>watching : {watching}</Text>
      <Image style={{  height: width / 10.39, width: width / 4.39}} source={require('../../../../resources/images/ic_live.png')} />
      </View>
      <View style={styles.callButtons}>
        {/* <View styles={styles.buttonContainer}> */}
          {/* <Button style={{backgroundColor: '#530D89',}} title="Stop Live" onPress={onBackPress} /> */}
          <Button
                    customStyle={[styles.publishContainer, { width: width / 5.5, borderRadius: 6, height: width / 10.5, backgroundColor: '#530D89', marginStart: 5}]}
                    titleStyle={{ fontSize: 12 }}
                  title="Stop Live"
                  onPress={onBackPress}
                />
        {/* </View> */}
        {localStream && (
        // <View style={styles.toggleButtons}>
          // {/* <Button style={{backgroundColor: '#530D89',}} title="Switch camera" onPress={switchCamera} /> */}
          <Button
                    customStyle={[styles.publishContainer, { width: width / 5.5, borderRadius: 6, height: width / 10.5, backgroundColor: '#530D89', marginStart: 5}]}
                    titleStyle={{ fontSize: 12 }}
                  title="Switch camera"
                  onPress={switchCamera}
                />
        // </View>
      )}
        <View styles={styles.buttonContainer}>
          {/* {!localStream && (
            <Button title="Go Live" onPress={startLocalStream} />
          )} */}
          {localStream && (
            // <Button
            // style={{backgroundColor: '#530D89',}}
            //   title="Click to go Live"
            //   onPress={() => startCall(roomId)}
            //   disabled={!!remoteStream}
            // />
            <Button
                    customStyle={[styles.publishContainer, { width: width / 3.5, borderRadius: 6, height: width / 10.5, backgroundColor: '#530D89', marginStart: 5}]}
                    titleStyle={{ fontSize: 12 }}
                  title="Click to go Live"
                    onPress={() => startCall(roomId)}
              disabled={!!remoteStream}
                />
          )}
        </View>
      </View>

      {/* {localStream && (
        <View style={styles.toggleButtons}>
          <Button style={{backgroundColor: '#530D89',}} title="Switch camera" onPress={switchCamera} />
        </View>
      )} */}

      <View style={{ display: "flex", flex: 1, padding: 10 }}>
        <View style={styles.rtcview}>
          {localStream && (
            <RTCView
              style={styles.rtc}
              streamURL={localStream && localStream.toURL()}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    // alignSelf: "center",
    fontSize: 18,
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
    justifyContent: "space-around",
  },
  buttonContainer: {
    margin: 5,
  },
});
