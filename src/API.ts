/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  email: string,
  name: string,
  image?: string | null,
  bio?: string | null,
  username?: string | null,
  website?: string | null,
  nofPosts: number,
  nofFollowers: number,
  nofFollowings: number,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  username?: ModelStringInput | null,
  website?: ModelStringInput | null,
  nofPosts?: ModelIntInput | null,
  nofFollowers?: ModelIntInput | null,
  nofFollowings?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  name: string,
  image?: string | null,
  bio?: string | null,
  username?: string | null,
  website?: string | null,
  nofPosts: number,
  nofFollowers: number,
  nofFollowings: number,
  Posts?: ModelPostConnection | null,
  Comments?: ModelCommentConnection | null,
  Likes?: ModelLikeConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  description?: string | null,
  image?: string | null,
  images?: Array< string > | null,
  video?: string | null,
  nofComments: number,
  nofLikes: number,
  userID: string,
  User?: User | null,
  Likes?: ModelLikeConnection | null,
  Comments?: ModelCommentConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelLikeConnection = {
  __typename: "ModelLikeConnection",
  items:  Array<Like | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Like = {
  __typename: "Like",
  id: string,
  userID: string,
  postID: string,
  User?: User | null,
  Post?: Post | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  comment: string,
  userID: string,
  postID: string,
  User?: User | null,
  Post?: Post | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  name?: string | null,
  image?: string | null,
  bio?: string | null,
  username?: string | null,
  website?: string | null,
  nofPosts?: number | null,
  nofFollowers?: number | null,
  nofFollowings?: number | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreatePostInput = {
  id?: string | null,
  description?: string | null,
  image?: string | null,
  images?: Array< string > | null,
  video?: string | null,
  nofComments: number,
  nofLikes: number,
  userID: string,
  _version?: number | null,
};

export type ModelPostConditionInput = {
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  images?: ModelStringInput | null,
  video?: ModelStringInput | null,
  nofComments?: ModelIntInput | null,
  nofLikes?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePostInput = {
  id: string,
  description?: string | null,
  image?: string | null,
  images?: Array< string > | null,
  video?: string | null,
  nofComments?: number | null,
  nofLikes?: number | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeletePostInput = {
  id: string,
  _version?: number | null,
};

export type CreateLikeInput = {
  id?: string | null,
  userID: string,
  postID: string,
  _version?: number | null,
};

export type ModelLikeConditionInput = {
  userID?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  and?: Array< ModelLikeConditionInput | null > | null,
  or?: Array< ModelLikeConditionInput | null > | null,
  not?: ModelLikeConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UpdateLikeInput = {
  id: string,
  userID?: string | null,
  postID?: string | null,
  _version?: number | null,
};

export type DeleteLikeInput = {
  id: string,
  _version?: number | null,
};

export type CreateCommentInput = {
  id?: string | null,
  comment: string,
  userID: string,
  postID: string,
  _version?: number | null,
};

export type ModelCommentConditionInput = {
  comment?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UpdateCommentInput = {
  id: string,
  comment?: string | null,
  userID?: string | null,
  postID?: string | null,
  _version?: number | null,
};

export type DeleteCommentInput = {
  id: string,
  _version?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  username?: ModelStringInput | null,
  website?: ModelStringInput | null,
  nofPosts?: ModelIntInput | null,
  nofFollowers?: ModelIntInput | null,
  nofFollowings?: ModelIntInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  images?: ModelStringInput | null,
  video?: ModelStringInput | null,
  nofComments?: ModelIntInput | null,
  nofLikes?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelLikeFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  and?: Array< ModelLikeFilterInput | null > | null,
  or?: Array< ModelLikeFilterInput | null > | null,
  not?: ModelLikeFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  comment?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
  website?: ModelSubscriptionStringInput | null,
  nofPosts?: ModelSubscriptionIntInput | null,
  nofFollowers?: ModelSubscriptionIntInput | null,
  nofFollowings?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPostFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  description?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  images?: ModelSubscriptionStringInput | null,
  video?: ModelSubscriptionStringInput | null,
  nofComments?: ModelSubscriptionIntInput | null,
  nofLikes?: ModelSubscriptionIntInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionLikeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  postID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionLikeFilterInput | null > | null,
  or?: Array< ModelSubscriptionLikeFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  comment?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  postID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    image?: string | null,
    bio?: string | null,
    username?: string | null,
    website?: string | null,
    nofPosts: number,
    nofFollowers: number,
    nofFollowings: number,
    Posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    image?: string | null,
    bio?: string | null,
    username?: string | null,
    website?: string | null,
    nofPosts: number,
    nofFollowers: number,
    nofFollowings: number,
    Posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    image?: string | null,
    bio?: string | null,
    username?: string | null,
    website?: string | null,
    nofPosts: number,
    nofFollowers: number,
    nofFollowings: number,
    Posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    description?: string | null,
    image?: string | null,
    images?: Array< string > | null,
    video?: string | null,
    nofComments: number,
    nofLikes: number,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    description?: string | null,
    image?: string | null,
    images?: Array< string > | null,
    video?: string | null,
    nofComments: number,
    nofLikes: number,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    description?: string | null,
    image?: string | null,
    images?: Array< string > | null,
    video?: string | null,
    nofComments: number,
    nofLikes: number,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateLikeMutationVariables = {
  input: CreateLikeInput,
  condition?: ModelLikeConditionInput | null,
};

export type CreateLikeMutation = {
  createLike?:  {
    __typename: "Like",
    id: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateLikeMutationVariables = {
  input: UpdateLikeInput,
  condition?: ModelLikeConditionInput | null,
};

export type UpdateLikeMutation = {
  updateLike?:  {
    __typename: "Like",
    id: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteLikeMutationVariables = {
  input: DeleteLikeInput,
  condition?: ModelLikeConditionInput | null,
};

export type DeleteLikeMutation = {
  deleteLike?:  {
    __typename: "Like",
    id: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    comment: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    comment: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    comment: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    image?: string | null,
    bio?: string | null,
    username?: string | null,
    website?: string | null,
    nofPosts: number,
    nofFollowers: number,
    nofFollowings: number,
    Posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    description?: string | null,
    image?: string | null,
    images?: Array< string > | null,
    video?: string | null,
    nofComments: number,
    nofLikes: number,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPostsQuery = {
  syncPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type PostsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByUserIDQuery = {
  postsByUserID?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetLikeQueryVariables = {
  id: string,
};

export type GetLikeQuery = {
  getLike?:  {
    __typename: "Like",
    id: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListLikesQueryVariables = {
  filter?: ModelLikeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLikesQuery = {
  listLikes?:  {
    __typename: "ModelLikeConnection",
    items:  Array< {
      __typename: "Like",
      id: string,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncLikesQueryVariables = {
  filter?: ModelLikeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncLikesQuery = {
  syncLikes?:  {
    __typename: "ModelLikeConnection",
    items:  Array< {
      __typename: "Like",
      id: string,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type LikesByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLikeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LikesByUserIDQuery = {
  likesByUserID?:  {
    __typename: "ModelLikeConnection",
    items:  Array< {
      __typename: "Like",
      id: string,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type LikesByPostIDQueryVariables = {
  postID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLikeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LikesByPostIDQuery = {
  likesByPostID?:  {
    __typename: "ModelLikeConnection",
    items:  Array< {
      __typename: "Like",
      id: string,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    comment: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      comment: string,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCommentsQuery = {
  syncComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      comment: string,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type CommentsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByUserIDQuery = {
  commentsByUserID?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      comment: string,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type CommentsByPostIDQueryVariables = {
  postID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByPostIDQuery = {
  commentsByPostID?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      comment: string,
      userID: string,
      postID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    image?: string | null,
    bio?: string | null,
    username?: string | null,
    website?: string | null,
    nofPosts: number,
    nofFollowers: number,
    nofFollowings: number,
    Posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    image?: string | null,
    bio?: string | null,
    username?: string | null,
    website?: string | null,
    nofPosts: number,
    nofFollowers: number,
    nofFollowings: number,
    Posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    image?: string | null,
    bio?: string | null,
    username?: string | null,
    website?: string | null,
    nofPosts: number,
    nofFollowers: number,
    nofFollowings: number,
    Posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    description?: string | null,
    image?: string | null,
    images?: Array< string > | null,
    video?: string | null,
    nofComments: number,
    nofLikes: number,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    description?: string | null,
    image?: string | null,
    images?: Array< string > | null,
    video?: string | null,
    nofComments: number,
    nofLikes: number,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    description?: string | null,
    image?: string | null,
    images?: Array< string > | null,
    video?: string | null,
    nofComments: number,
    nofLikes: number,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Likes?:  {
      __typename: "ModelLikeConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateLikeSubscriptionVariables = {
  filter?: ModelSubscriptionLikeFilterInput | null,
};

export type OnCreateLikeSubscription = {
  onCreateLike?:  {
    __typename: "Like",
    id: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateLikeSubscriptionVariables = {
  filter?: ModelSubscriptionLikeFilterInput | null,
};

export type OnUpdateLikeSubscription = {
  onUpdateLike?:  {
    __typename: "Like",
    id: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteLikeSubscriptionVariables = {
  filter?: ModelSubscriptionLikeFilterInput | null,
};

export type OnDeleteLikeSubscription = {
  onDeleteLike?:  {
    __typename: "Like",
    id: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    comment: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    comment: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    comment: string,
    userID: string,
    postID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      image?: string | null,
      bio?: string | null,
      username?: string | null,
      website?: string | null,
      nofPosts: number,
      nofFollowers: number,
      nofFollowings: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Post?:  {
      __typename: "Post",
      id: string,
      description?: string | null,
      image?: string | null,
      images?: Array< string > | null,
      video?: string | null,
      nofComments: number,
      nofLikes: number,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
