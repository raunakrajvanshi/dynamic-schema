import { Schema, model, Document } from 'mongoose';
import { SchemaAttribute } from '../types';

interface ISchemaModel extends Document {
  name: string;
  attributes: Map<string, SchemaAttribute>;
}

const schemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  attributes: {
    type: Map,
    of: {
      type: { type: String, enum: ['string', 'number', 'boolean', 'date'] },
      isArray: Boolean,
      isObject: Boolean,
      properties: { type: Map, of: Schema.Types.Mixed }
    }
  }
});

export default model<ISchemaModel>('Schema', schemaSchema);