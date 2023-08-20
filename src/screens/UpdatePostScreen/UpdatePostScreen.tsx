import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  CreateNavigationProp,
  UpdatePostRouteProp,
} from '../../types/navigation';
import colors from '../../theme/colors';
import Button from '../../components/Button';
import { updatePost } from './mutations';
import { useMutation, useQuery } from '@apollo/client';
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import { getPost } from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const UpdatePostScreen = () => {
  const [description, setDescription] = useState('');

  const navigation = useNavigation<CreateNavigationProp>();
  const route = useRoute<UpdatePostRouteProp>();
  const { id } = route.params;
  const { data, loading, error } = useQuery<
    GetPostQuery,
    GetPostQueryVariables
  >(getPost, { variables: { id } });

  const post = data?.getPost;

  const [doUpdatePost, { error: updateError, data: updateData }] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  useEffect(() => {
    if (post) {
      setDescription(post.description || '');
    }
  }, [post]);

  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  }, [updateData, navigation]);

  const submit = async () => {
    if (!post) {
      return;
    }
    doUpdatePost({
      variables: {
        input: { id: post.id, _version: post._version, description },
      },
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="Failed to fetch the post"
        message={error?.message || updateError?.message}
      />
    );
  }

  return (
    <View style={styles.root}>
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

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default UpdatePostScreen;
