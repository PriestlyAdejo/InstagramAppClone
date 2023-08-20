import { Text, View, FlatList, Image, TextInput } from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { CreateRouteProp } from '../../types/navigation';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import { createPost } from './mutations';
import { useMutation } from '@apollo/client';
import { CreatePostMutation, CreatePostMutationVariables } from '../../API';
import { useAuthContext } from '../../Context/AuthContext';

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');
  const route = useRoute<CreateRouteProp>();
  const { userId } = useAuthContext();

  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  const { image } = route.params;
  const submit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            description,
            image,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
          },
        },
      });
    } catch (error) {
      console.log('ERROR_CREATING_POST', error);
    }
  };

  return (
    <View style={styles.root}>
      <Image source={{ uri: image }} style={styles.image} />
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
