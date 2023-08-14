/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppSyncId = process.env.API_INSTAGRAMCLONE_GRAPHQLAPIKEYOUTPUT;
const TableName = `User-${AppSyncId}-${env}`; // TableName - AppSyncId - Env

const userExists = async (id) => {
  const params = {
    TableName,
    Key: id,
  };

  try {
    const response = await docClient.get(params).promise();
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
    await docClient.put(params).promise();
  } catch (error) {
    console.log('ERROR_SAVING_DB_DATA', error);
  }
};

exports.handler = async (event, context) => {
  console.log('Lambda function is working', event);

  if (!event?.request?.userAttributes) {
    console.log('No user data available');
    return;
  }

  const { sub, name, email } = event?.request?.userAttributes; // {sub, user, name}
  const newUser = {
    id: userAttributes.sub,
    name,
    email,
  };

  // Check if user already exists
  if (!userExists(newUser.id)) {
    saveUser(newUser);
  }

  // If not, save the user to the database

  return event;
};
