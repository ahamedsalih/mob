import React from 'react';

import {View, PermissionsAndroid, Image, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';

const DownloadImg = () => {
  const REMOTE_IMAGE_PATH =
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg';
  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = (filename) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '100%', height: '80%', top: 40}}>
        <Image
          style={{
            width: '100%',
            height: '70%',
            padding: 5,
            marginBottom: 5,
          }}
          resizeMode="contain"
          source={{uri: REMOTE_IMAGE_PATH}}
        />
      </View>
      <Button
        onPress={checkPermission}
        style={{width: '70%', height: 40, bottom: '18%'}}
        mode="contained">
        Download
      </Button>
    </View>
  );
};

export default DownloadImg;
