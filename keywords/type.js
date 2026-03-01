import { getType } from '../utils/getType.js';

export function type(schema, instance){
    const typeOfInstance = getType(instance);
    if (typeof schema === "string") {
    return (typeOfInstance === schema) || (schema === "number" && typeOfInstance === "integer");
  }

  return schema.some((t) => {
    return (typeOfInstance === t) || (t === "number" && typeOfInstance === "integer");
  });
}