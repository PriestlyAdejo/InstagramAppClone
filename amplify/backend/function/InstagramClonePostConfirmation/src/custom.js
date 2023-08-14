/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const env = process.env.ENV;
const AppSyncId = process.env.API_INSTAGRAMCLONE_GRAPHQLAPIKEYOUTPUT;
const TableName = `User-${AppSyncId}-${env}`; // TableName - AppSyncId - Env

const userExists = async (id) => {
  const params = {
    TableName,
    Key: id,
  };

  try {
    const getCommand = new GetCommand(params);
    const response = await docClient.send(getCommand);
    console.log('GET_COMMAND_RESPONSE', response);
    return !!response?.Item;
  } catch (error) {
    console.log('ERROR_GETTING_DB_DATA', error);
    return false;
  }
};

const saveUser = async (user) => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();

  const Item = {
    ...user,
    __typename: 'User',
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };

  const params = {
    TableName,
    Item,
  };

  try {
    const putCommand = new PutCommand(params);
    const response = await docClient.send(putCommand);
    console.log('PUT_COMMAND_RESPONSE', response);
  } catch (error) {
    console.log('ERROR_SAVING_DB_DATA', error);
  }
};

export const handler = async (event, context) => {
  console.log('Lambda function is working', event);

  if (!event?.request?.userAttributes) {
    console.log('No user data available');
    return;
  }

  const { sub, name, email } = event?.request?.userAttributes; // {sub, user, name}
  const newUser = {
    id: sub,
    name,
    email,
  };

  // Check if user already exists
  try {
    // If not, save the user to the database
    if (!(await userExists(newUser.id))) {
      await saveUser(newUser);
      console.log('USER_SAVED_IN_DB', `USER.ID:${newUser.id}`);
    } else {
      console.log('USER_ALREADY_EXISTS', `USER.ID:${newUser.id}`);
    }
  } catch (error) {
    console.log('ERROR_SAVING_DB_USER', error);
  }
  return event;
};
