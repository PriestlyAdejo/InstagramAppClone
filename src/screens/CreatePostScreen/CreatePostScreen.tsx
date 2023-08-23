import { Text, View, FlatList, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateNavigationProp, CreateRouteProp } from '../../types/navigation';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import { createPost } from './mutations';
import { useMutation } from '@apollo/client';
import {
  CreatePostInput,
  CreatePostMutation,
  CreatePostMutationVariables,
} from '../../API';
import { useAuthContext } from '../../Context/AuthContext';
import Carousel from '../../components/Carousel/Carousel';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');
  const route = useRoute<CreateRouteProp>();
  const { userId } = useAuthContext();
  const navigation = useNavigation<CreateNavigationProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  const { image, images, video } = route.params;

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

  const uriToBlob = (uri: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };

  const uploadMedia = async (uri: string) => {
    try {
      // Get blob file of the uri
      const blob = await uriToBlob(uri);
      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];

      // Upload the blob file to S3 using AWS Amplify's Storage
      const filename = `${uuidv4()}.${extension}`;
      const s3Response = await Storage.put(filename, blob, {
        progressCallback(newProgress) {
          setProgress(newProgress.loaded / newProgress.total);
        },
      });
      console.log('S3_RESPONSE', s3Response);
      return s3Response.key;
    } catch (error) {
      Alert.alert('Error uploading the file.', (error as Error).message);
    }
  };

  const submit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const input: CreatePostInput = {
      type: 'POST',
      description,
      image: undefined,
      images: undefined,
      video: undefined,
      nofComments: 0,
      nofLikes: 0,
      userID: userId,
    };

    // upload the media files to S3 and get the key
    if (image) {
      input.image = await uploadMedia(image);
    } else if (images) {
      const imageKeys = await Promise.all(
        images.map((img) => uploadMedia(img))
      );
      input.images = imageKeys.filter((key) => key) as string[];
    } else if (video) {
      input.video = await uploadMedia(video);
    }

    try {
      await doCreatePost({ variables: { input } });
      setIsSubmitting(false);
      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (error) {
      console.log('ERROR_CREATING_POST', error);
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root}>
      <View style={styles.content}>{content}</View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      <Button
        text={isSubmitting ? 'Submitting Post...' : 'Submit'}
        onPress={submit}
      />

      {isSubmitting && (
        <View style={styles.progressContainer}>
          <View style={[styles.progress, { width: `${progress * 100}%` }]} />
          <Text>Uploading {Math.floor(progress * 100)}%</Text>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default CreatePostScreen;
