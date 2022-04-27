import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ControlsScreen = ({navigation}) => {
  const [playerRef, setPlayerRef] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({email: 'hello'});

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const handleOnPressSignOut = () =>
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        setUser({email: 'hello'});
        navigation.navigate('signInScreen');
      });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(subscriber);
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userString}>{user.email}</Text>

        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={handleOnPressSignOut}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <NodePlayerView
        style={{backgroundColor: '#333', height: 270, width: '100%'}}
        ref={vp => {
          setPlayerRef(vp);
        }}
        inputUrl={'rtsp://192.168.137.9:8554/mjpeg/1'}
        scaleMode={'ScaleAspectFill'}
        bufferTime={300}
        // maxBufferTime={1000}
        autoplay={true}
        onStatus={(code, msg) => {
          console.log('onStatus=' + code + ' msg=' + msg);
        }}
      />

      <View style={styles.controlsBtnSection}>
        <TouchableOpacity style={styles.controlsBtn}>
          {/* <Text style={styles.controlsBtnText}>Left</Text> */}
          <Icon
            style={{marginRight: 7}}
            name="chevron-left"
            size={40}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.screenshotBtn}>
          {/* <Text style={styles.controlsBtnText}>Screen</Text> */}
          <Icon name="camera" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlsBtn}>
          {/* <Text style={styles.controlsBtnText}>Right</Text> */}
          <Icon
            style={{marginLeft: 7}}
            name="chevron-right"
            size={40}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.galleryBtn}>
        <Text style={styles.controlsBtnText}>Go to the gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // justifyContent: 's',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingVertical: 13,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlsBtnSection: {
    width: 320,
    marginVertical: 111,
    marginHorizontal: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  controlsBtn: {
    width: 75,
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#FFCF87',
  },

  screenshotBtn: {
    backgroundColor: '#B680FF',
    width: 75,
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  signOutBtn: {
    backgroundColor: '#ffcf87',
    padding: 10,
    borderRadius: 15,
  },

  controlsBtnText: {
    color: '#ffffff',
  },

  userString: {
    fontSize: 16,
    color: '#000000',
  },

  galleryBtn: {
    padding: 13,
    borderRadius: 15,
    width: '80%',
    backgroundColor: '#3FC6EF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ControlsScreen;
