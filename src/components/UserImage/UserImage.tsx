import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import { DEFAULT_USER_IMAGE } from '../../config';

interface IUserImage {
  imageKey?: string | null;
  width?: number;
}

const UserImage = ({ imageKey, width = 50 }: IUserImage) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (imageKey) {
      Storage.get(imageKey).then(setImageUri);
    }
  }, [imageKey]);

  const isValidImageUrl = (url: string | null) => {
    // Basic URL validation using a regular expression
    const urlPattern =
      /^(http|https):\/\/[\w\-.]+\.[a-z]{2,}(\/\S*)?[.]{1}[a-z]{2,}$/i;
    return url ? urlPattern.test(url) : false;
  };

  const renderImage = () => {
    if (isValidImageUrl(imageUri)) {
      return (
        <Image
          source={{
            uri: imageUri!,
          }}
          style={[styles.image, { width }]}
        />
      );
    } else {
      return (
        <Image
          source={{
            uri: DEFAULT_USER_IMAGE,
          }}
          style={[styles.image, { width }]}
        />
      );
    }
  };

  return <View>{renderImage()}</View>;
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    borderRadius: 250,
    marginRight: 10,
  },
});

export default UserImage;
