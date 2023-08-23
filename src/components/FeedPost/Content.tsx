import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import { Post } from '../../API';
import styles from './styles';
import { Storage } from 'aws-amplify';

interface IContent {
  post: Post;
  isVisible: boolean;
}

const Content = ({ post, isVisible }: IContent) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagesUri, setImagesUri] = useState<string[] | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const downloadMedia = async () => {
    if (post.image) {
      // download the image
      const uri = await Storage.get(post.image);
      setImageUri(uri);
    } else if (post.images) {
      const uris = await Promise.all(
        post.images.map((img) => Storage.get(img))
      );
      setImagesUri(uris);
    } else if (post.video) {
      const uri = await Storage.get(post.video);
      setVideoUri(uri);
    }
  };

  useEffect(() => {
    downloadMedia();
  }, []);

  if (imageUri) {
    return (
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />
    );
  } else if (imagesUri) {
    return <Carousel images={imagesUri} />;
  } else if (videoUri) {
    return <VideoPlayer uri={videoUri} paused={!isVisible} />;
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Content;
