const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const env = process.env.ENV;
const AppsyncID = process.env.API_INSTAGRAMCLONE_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`; // TableName-AppsyncID-env

const userExists = async (id) => {
  const params = {
    TableName,
    Key: { id },
  };

  const getCommand = new GetCommand(params);
  const response = await docClient.send(getCommand);
  console.log('GET_COMMAND_RESPONSE', response);
  return !!response?.Item;
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

  const putCommand = new PutCommand(params);
  const response = await docClient.send(putCommand);
  console.log('PUT_COMMAND_RESPONSE', response);
};

exports.handler = async (event, context) => {
  console.log('Heyy, Lambda function is working and is updated');

  if (!event?.request?.userAttributes) {
    console.log('No user data available');
    return;
  }

  const { sub, name, email } = event?.request?.userAttributes; // {sub, email, name}

  const newUser = {
    id: sub,
    name,
    email,
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  };

  // check if the user already exists
  if (!(await userExists(newUser.id))) {
    await saveUser(newUser);
    console.log('USER_SAVED_IN_DB', `USER.ID:${newUser.id}`);
  } else {
    console.log('USER_ALREADY_EXISTS', `USER.ID:${newUser.id}`);
  }

  return event;
};
