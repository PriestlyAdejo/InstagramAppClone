import React from 'react';
import styles from './styles';
import { Image } from 'react-native';
import Carousel from '../../components/Carousel/Carousel';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

export interface IContent {
  image?: string | undefined;
  images?: string[] | undefined;
  video?: string | undefined;
}

const contentComponent = (routeParams: IContent) => {
  const { image, images, video } = routeParams;

  let content = null;
  if (image) {
    content = (
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode={'contain'}
      />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} paused={true} />;
  }

  return content;
};

export default contentComponent;
