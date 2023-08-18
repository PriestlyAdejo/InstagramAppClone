import { Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import styles from './styles';
import { Asset, launchImageLibrary } from 'react-native-image-picker';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { getUser, usersByUsername } from './queries';
import { useAuthContext } from '../../Context/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { updateUser, deleteUser } from './mutations';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { CustomInput, IEditableUser } from './CustomInput';
import { DEFAULT_USER_IMAGE } from '../../config';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const { control, handleSubmit, setValue } = useForm<IEditableUser>();
  const navigation = useNavigation();
  const { userId, user: authUser } = useAuthContext();

  const { data, loading, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, { variables: { id: userId } });

  const [getUsersByUsername] = useLazyQuery<
    UsersByUsernameQuery,
    UsersByUsernameQueryVariables
  >(usersByUsername);

  const user = data?.getUser;

  const [doUpdateUser, { loading: updateLoading, error: updateError }] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);
  const [doDeleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('bio', user.bio);
      setValue('website', user.website);
    }
  }, [user, setValue]);

  const onSubmit = async (formData: IEditableUser) => {
    console.log(formData);
    await doUpdateUser({
      variables: {
        input: { id: userId, ...formData, _version: user?._version },
      },
    });
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your user profile is permanent.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, delete',
        style: 'destructive',
        onPress: startDeleting,
      },
    ]);
  };

  const startDeleting = async () => {
    if (!user) {
      return;
    }
    // Delete from database
    await doDeleteUser({
      variables: { input: { id: userId, _version: user?._version } },
    });

    // Delete from cognito
    authUser?.deleteUser((err) => {
      if (error) {
        console.log(error);
      }
      Auth.signOut();
    });
  };

  const onChangePhoto = () => {
    launchImageLibrary(
      { mediaType: 'photo' },
      ({ didCancel, errorCode, assets }) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      }
    );
  };

  const validateUsername = async (username: string) => {
    try {
      const response = await getUsersByUsername({ variables: { username } });
      if (response.error) {
        Alert.alert('Failed to fetch username');
        return 'Failed to fetch username';
      }
      const users = response.data?.usersByUsername?.items;
      if (users && users?.length > 0) {
        return 'Username is already taken';
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to fetch username.');
    }

    return true;
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError || deleteError) {
    return (
      <ApiErrorMessage
        title="Error fetching or updating the user"
        message={error?.message || updateError?.message || deleteError?.message}
      />
    );
  }

  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE,
        }}
        style={styles.avatar}
      />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change Profile Photo
      </Text>

      <CustomInput
        name="name"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be more than 3 characters',
          },
        }}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be longer than 3 characters',
          },
          validate: validateUsername,
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{
          pattern: { value: URL_REGEX, message: 'Invalid URL' },
        }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          maxLength: {
            value: 200,
            message: 'Bio must be under than 200 characters',
          },
        }}
        label="Bio"
        multiline
      />

      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        {updateLoading ? 'Submitting...' : 'Submit'}
      </Text>

      <Text onPress={confirmDelete} style={styles.textButtonDanger}>
        {deleteLoading ? 'Deleting...' : 'DELETE USER'}
      </Text>
    </View>
  );
};

export default EditProfileScreen;
