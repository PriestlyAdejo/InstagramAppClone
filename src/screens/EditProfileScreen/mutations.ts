import { gql } from '@apollo/client';

export const updateUser = gql`
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id

      name
      username
      bio
      website
      image

      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

export const deleteUser = gql`
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id

      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
