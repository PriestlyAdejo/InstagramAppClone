import { gql } from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      image
      bio
      username
      website
      nofPosts
      nofFollowers
      nofFollowings
      Posts {
        nextToken
        startedAt
        __typename
        items {
          id
          image
          images
          video
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
