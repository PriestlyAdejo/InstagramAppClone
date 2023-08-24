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

  return (
    <Image
      source={{
        uri: imageUri || DEFAULT_USER_IMAGE,
      }}
      style={[styles.image, { width }]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    borderRadius: 250,
    marginRight: 10,
  },
});

export default UserImage;
