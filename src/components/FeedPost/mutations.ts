import { gql } from '@apollo/client';

export const deletePost = gql`
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
