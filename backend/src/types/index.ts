export type PrimitiveType = 'string' | 'number' | 'boolean' | 'date';
export type NonPrimitiveType= 'array' | 'object' 

export interface SchemaAttribute {
  type: PrimitiveType | NonPrimitiveType;
  isArray?: boolean;
  isObject?: boolean;
  properties?: { [key: string]: SchemaAttribute };
}

export interface ISchema {
  name: string;
  attributes: { [key: string]: SchemaAttribute };
  createdAt: Date;
  updatedAt: Date;
}
