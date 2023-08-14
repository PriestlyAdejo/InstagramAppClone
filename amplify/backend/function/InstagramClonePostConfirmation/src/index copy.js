const name = 'custom';
const importedModule = await import(`./${name}.js`);
const newModule = importedModule.handler;
const modules = [newModule];
console.log('NEW_MODULE', modules[0]);
console.log('CHECKING', typeof modules[0] === 'function');
console.log('CHECKING', modules[0].handler);

export const handler = async (event, context) => {
  await Promise.all(modules.map((m) => m(event, context)));
  return event;
};
