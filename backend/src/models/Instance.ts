import mongoose, { Schema, Document } from 'mongoose';

interface IInstance extends Document {
  name: string;
  schemaId: mongoose.Types.ObjectId;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const InstanceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  schemaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schema',
    required: true
  },
  data: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});


InstanceSchema.index({ schemaId: 1, name: 1 }, { unique: true });

export default mongoose.model<IInstance>('Instance', InstanceSchema);