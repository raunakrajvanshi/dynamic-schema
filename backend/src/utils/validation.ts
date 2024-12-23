// validation.ts
import { SchemaAttribute, PrimitiveType, NonPrimitiveType } from '../types';

interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

const validTypes: (PrimitiveType | NonPrimitiveType)[] = [
  'string', 
  'number', 
  'boolean', 
  'date', 
  'array', 
  'object'
];

export function validateSchemaStructure(attributes: { [key: string]: SchemaAttribute }): ValidationResult {
  const errors: string[] = [];

  for (const [key, attribute] of Object.entries(attributes)) {
    // Validate type
    if (!validTypes.includes(attribute.type)) {
      errors.push(`Invalid type "${attribute.type}" for field "${key}". Valid types are: ${validTypes.join(', ')}`);
    }

    // Validate object properties if type is object
    if (attribute.type === 'object' && attribute.properties) {
      const nestedValidation = validateSchemaStructure(attribute.properties);
      if (!nestedValidation.isValid) {
        errors.push(...(nestedValidation.errors || []).map(err => `${key}.${err}`));
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

export function validateDataAgainstSchema(
  data: any,
  schema: { [key: string]: SchemaAttribute }
): ValidationResult {
  const errors: string[] = [];

  for (const [key, schemaAttribute] of Object.entries(schema)) {
    if (!validateField(data[key], schemaAttribute)) {
      errors.push(`Invalid value for field: ${key}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

function validateField(value: any, schemaAttribute: SchemaAttribute): boolean {
  if (schemaAttribute.isArray) {
    if (!Array.isArray(value)) return false;
    return value.every(item => validateType(item, schemaAttribute.type));
  }

  if (schemaAttribute.isObject) {
    if (typeof value !== 'object' || value === null) return false;
    if (!schemaAttribute.properties) return true;
    
    return Object.entries(schemaAttribute.properties).every(([propKey, propSchema]) => 
      validateField(value[propKey], propSchema)
    );
  }

  return validateType(value, schemaAttribute.type);
}

function validateType(value: any, type: PrimitiveType | NonPrimitiveType): boolean {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'date':
      return value instanceof Date || !isNaN(Date.parse(value));
    default:
      return false;
  }
}