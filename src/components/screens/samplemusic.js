import React, {useEffect, useState} from 'react';
import {Text, Button, View, Image} from 'react-native';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player';
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';
import styles from './styles';
import {isEmpty} from 'lodash';

// const trackPlayerInit = async () => {
//   await TrackPlayer.setupPlayer();
//   TrackPlayer.updateOptions({
//     stopWithApp: true,
//     capabilities: [
//       TrackPlayer.CAPABILITY_PLAY,
//       TrackPlayer.CAPABILITY_PAUSE,
//       TrackPlayer.CAPABILITY_JUMP_FORWARD,
//       TrackPlayer.CAPABILITY_JUMP_BACKWARD,
//     ],
//   });
//   await TrackPlayer.add({
//     id: songDetails.id,
//     url: songDetails.url,
//     type: 'default',
//     title: songDetails.title,
//     album: songDetails.album,
//     artist: songDetails.artist,
//     artwork: songDetails.artwork,
//   });
//   return true;
// };

const SampleMusics = ({route}) => {
  const {musicdata} = route.params;
  console.log('----path-----', musicdata);
  // const [musicsdata, setMusicsdata] = useState([]);
  const songDetails = {
    id: '1',
    url: `${musicdata.path}`,
    title: `${musicdata.title}`,
    album: `${musicdata.album}`,
    artist: `${musicdata.artist}`,
    artwork: `${musicdata.cover}`,
  };

  useEffect(() => {
    const trackPlayerInit = () => {
      TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
      });
      TrackPlayer.add({
        id: songDetails.id,
        url: songDetails.url,
        type: 'default',
        title: songDetails.title,
        album: songDetails.album,
        artist: songDetails.artist,
        artwork: songDetails.artwork,
      });
      return true;
    };

    const startPlayer = () => {
      let isInit = trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, []);

  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const {position, duration} = useTrackPlayerProgress(250);

  // useEffect(() => {
  //   const startPlayer = async () => {
  //     let isInit = await trackPlayerInit();
  //     setIsTrackPlayerInit(isInit);
  //   };
  //   startPlayer();
  // }, []);

  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      //setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      //setIsPlaying(false);
    }
  };

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        {songDetails.artwork === isEmpty ? (
          <Image
            source={{
              uri:
                'https://webstockreview.net/images/clipart-music-muzik-18.png',
            }}
            resizeMode="cover"
            style={styles.albumImage}
          />
        ) : (
          <Image
            source={{
              uri: songDetails.artwork,
            }}
            resizeMode="cover"
            style={styles.albumImage}
          />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.songTitle}>{songDetails.album}</Text>
        <Text style={styles.songTitle}>{songDetails.title}</Text>
        <Text style={styles.artist}>{songDetails.artist}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="#111000"
          maximumTrackTintColor="#000000"
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
          thumbTintColor="#000"
        />
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={onButtonPressed}
          style={styles.playButton}
          disabled={!isTrackPlayerInit}
          color="#000000"
        />
      </View>
    </View>
  );
};

export default SampleMusics;
