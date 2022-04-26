import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';
const ControlsScreen = () => {
  const [playerRef, setPlayerRef] = useState(null);
  useEffect(() => {
    return () => {
      if (playerRef) {
        playerRef.stop();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>User@gmail.com</Text>

        <TouchableOpacity>
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
          <Text style={styles.controlsBtnText}>Left</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlsBtn}>
          <Text style={styles.controlsBtnText}>Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlsBtn}>
          <Text style={styles.controlsBtnText}>Right</Text>
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
    backgroundColor: '#FFBB00',
  },

  controlsBtnText: {
    color: '#ffffff',
  },

  galleryBtn: {
    padding: 13,
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ControlsScreen;
