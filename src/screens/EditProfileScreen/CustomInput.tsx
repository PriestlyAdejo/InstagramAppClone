import { Control, Controller } from 'react-hook-form';
import { User } from '../../API';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';
import colors from '../../theme/colors';

export type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
export type IEditableUser = Pick<User, IEditableUserField>;

export interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rues?: object;
}

export const CustomInput = ({
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
