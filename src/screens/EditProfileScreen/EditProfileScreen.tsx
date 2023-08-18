import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import user from '../../assets/data/user.json';
import { useEffect, useState } from 'react';
import { useForm, Controller, Control } from 'react-hook-form';
import colors from '../../theme/colors';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../API';
import { useMutation, useQuery } from '@apollo/client';
import { getUser } from './queries';
import { useAuthContext } from '../../Context/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { updateUser } from './mutations';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rues?: object;
}

const CustomInput = ({
  control,
  label,
  name,
  multiline = false,
  rules = {},
}: ICustomInput) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => {
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={{ flex: 1 }}>
              <TextInput
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={label}
                style={[
                  styles.input,
                  { borderColor: error ? colors.error : colors.border },
                ]}
                multiline={multiline}
              />
              {error && (
                <Text style={{ color: colors.error }}>
                  {error.message || 'Error'}
                </Text>
              )}
            </View>
          </View>
        );
      }}
    />
  );
};

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const { control, handleSubmit, setValue } = useForm<IEditableUser>();

  const { userId } = useAuthContext();

  const { data, loading, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, { variables: { id: userId } });

  const user = data?.getUser;

  const [
    doUpdateUser,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('bio', user.bio);
      setValue('website', user.website);
    }
  }, [user, setValue]);

  const onSubmit = (formData: IEditableUser) => {
    console.log(formData);
    doUpdateUser({
      variables: {
        input: { id: userId, ...formData, _version: user?._version },
      },
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

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="Error fetching or updating the user"
        message={error?.message || updateError?.message}
      />
    );
  }

  return (
    <View style={styles.page}>
      <Image
        source={{ uri: selectedPhoto?.uri || user.image }}
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
        rules={{ required: 'Username is required' }}
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
    </View>
  );
};

export default EditProfileScreen;
