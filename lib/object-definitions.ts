import { OBJECT_DEFINITION_DATA } from "./object-definition-data";

export type ObjectType = keyof typeof OBJECT_DEFINITION_DATA;

export type ObjectFieldFormat = "text" | "currency" | "date" | "badge";

export type ObjectField = {
  key: string;
  label: string;
  format?: ObjectFieldFormat;
  linkType?: ObjectType;
};

export type ObjectPanel = {
  title: string;
  fields: ObjectField[];
};

export type ObjectDefinition = {
  type: ObjectType;
  label: string;
  pluralLabel: string;
  dataPath: string;
  idKey: string;
  titleKey: string;
  meta?: ObjectField[];
  badges?: ObjectField[];
  summary?: ObjectField[];
  details?: ObjectField[];
  panels?: ObjectPanel[];
};

export const OBJECT_DEFINITIONS: Record<ObjectType, ObjectDefinition> =
  OBJECT_DEFINITION_DATA;

export function isObjectType(value: string): value is ObjectType {
  return Object.prototype.hasOwnProperty.call(OBJECT_DEFINITION_DATA, value);
}

export function getObjectDefinition(type: string): ObjectDefinition | null {
  if (!isObjectType(type)) return null;
  return OBJECT_DEFINITIONS[type];
}
