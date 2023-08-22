import { Text, View, FlatList, Image, TextInput } from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CreateNavigationProp, CreateRouteProp } from '../../types/navigation';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import { createPost } from './mutations';
import { useMutation } from '@apollo/client';
import { CreatePostMutation, CreatePostMutationVariables } from '../../API';
import { useAuthContext } from '../../Context/AuthContext';
import Carousel from '../../components/Carousel/Carousel';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');
  const route = useRoute<CreateRouteProp>();
  const { userId } = useAuthContext();
  const navigation = useNavigation<CreateNavigationProp>();

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
      />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} paused={true} />;
  }

  const submit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            type: 'POST',
            description,
            image: image,
            images: images,
            video: video,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
          },
        },
      });
      console.log(response);
      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (error) {
      console.log('ERROR_CREATING_POST', error);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>{content}</View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      <Button text="Submit" onPress={submit} />
    </View>
  );
};

export default CreatePostScreen;
