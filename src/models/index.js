// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Post, Like, Comment } = initSchema(schema);

export {
  User,
  Post,
  Like,
  Comment
};