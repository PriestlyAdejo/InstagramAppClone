import { Text, View, TextInput } from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateNavigationProp, CreateRouteProp } from '../../types/navigation';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import { CreatePostInput } from '../../API';
import { useAuthContext } from '../../Context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import usePostService from '../../services/PostService/PostService';

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');
  const route = useRoute<CreateRouteProp>();
  const { userId } = useAuthContext();
  const navigation = useNavigation<CreateNavigationProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { image, images, video } = route.params;

  // Post Service
  const { uploadMedia, doCreatePost, content, progress } = usePostService({
    routeParams: route.params,
  });

  // Submitting Post
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
