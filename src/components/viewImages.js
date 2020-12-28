import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
//import ImgToBase64 from 'react-native-image-base64';

const ViewImages = (props) => {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true)
    const {photos} = props.route.params;
    console.log('picssss==>>>', photos);
    console.log('picssss==>>>', photos.length);

    setPhoto(photos);
    setLoading(false);
  }, [{photos}]);

  //  async componentDidMount(){

  //    this.setState({photo:await photos})
  // //    this.images();
  // //  await this.pics();
  //    }

  const {photos} = props.route.params;

  // console.log("paramssss",photos)

  //    console.log("-----route----->>>>>",photos)

  //    console.log("-----routtype----",photos.length)

  //    console.log("----type-----",typeof photos )

  //  images(){
  //     const {photos}=this.props.route.params;
  //     // const pics= await photos;
  //     console.log("picssss==>>>",photos)
  //     console.log("picssss==>>>",photos.length)

  //    this.setState({photos: photos})
  // //    console.log("datassss",this.state.photos)
  // //    console.log("length",this.state.photos.length)
  // //    console.log("datassssttttt",typeof this.state.photos)

  // //uri:`data:image/jpg;base64,${data.imagess}`
  //   }

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator style={{top: 0}} size="medium" color="blue" />
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              left: '12%',
              marginBottom: 10,
            }}>
            {photo.map((data, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('singleimage', {
                      image: data.imagess,
                    })
                  }>
                  <View
                    style={{
                      width: 300,
                      height: 200,
                      backgroundColor: 'white',
                      elevation: 10,
                      marginTop: 10,
                      borderRadius: 7,
                      overflow: 'hidden',
                    }}
                    key={index}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: 5,
                        marginBottom: 5,
                      }}
                      source={{uri: `data:image/jpg;base64,${data.imagess}`}}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewImages;
