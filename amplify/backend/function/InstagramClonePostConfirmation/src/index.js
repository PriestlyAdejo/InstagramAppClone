/* Amplify Params - DO NOT EDIT
	API_INSTAGRAMCLONE_GRAPHQLAPIENDPOINTOUTPUT
	API_INSTAGRAMCLONE_GRAPHQLAPIIDOUTPUT
	API_INSTAGRAMCLONE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @fileoverview
 *
 * This CloudFormation Trigger creates a handler which awaits the other handlers
 * specified in the `MODULES` env var, located at `./${MODULE}`.
 */

/**
 * The names of modules to load are stored as a comma-delimited string in the
 * `MODULES` env var.
 */
// const moduleNames = process.env.MODULES.split(',');
/**
 * The array of imported modules.
 */
// const modules = moduleNames.map(async (name) => await import(`./${name}`));
const moduleNames = process.env.MODULES.split(',');
const modules = moduleNames.map(async (name) => {
  const importedModuleHandler = await import(`./${name}.js`); // Already exported so now need to import again
  if (importedModuleHandler.handler) {
    return importedModuleHandler.handler;
  }
  return importedModuleHandler;
});

/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */
//exports.handler = async (event, context) => {
/**
 * Instead of naively iterating over all handlers, run them concurrently with
 * `await Promise.all(...)`. This would otherwise just be determined by the
 * order of names in the `MODULES` var.
 */
//await Promise.all(modules.map((module) => module.handler(event, context)));
//return event;
//};

export const handler = async (event, context) => {
  await Promise.all(modules.map((module) => module(event, context)));
  return event;
};
