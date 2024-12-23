import { Request, Response, NextFunction } from 'express';
import Instance from '../models/Instance';
import Schema from '../models/Schema';
import { validateDataAgainstSchema } from '../utils/validation';
import { SchemaAttribute } from '../types';

export const createInstance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { schemaId } = req.params;
      const { name, data } = req.body; 
  
      if (!name || typeof name !== 'string') {
        res.status(400).json({ message: 'Name is required and must be a string' });
        return;
      }
  
      const schema = await Schema.findById(schemaId);
      if (!schema) {
        res.status(404).json({ message: 'Schema not found' });
        return;
      }
  
      const attributes: { [key: string]: SchemaAttribute } = {};
      schema.attributes.forEach((value: SchemaAttribute, key: string) => {
        attributes[key] = value;
      });
      const validation = validateDataAgainstSchema(data, attributes); 
  
      if (!validation.isValid) {
        res.status(400).json({
          message: 'Invalid data format',
          errors: validation.errors
        });
        return;
      }
  
      // Check for duplicate name
      const existingInstance = await Instance.findOne({ schemaId, name });
      if (existingInstance) {
        res.status(409).json({ 
          message: 'Instance with this name already exists for this schema' 
        });
        return;
      }
  
      // Create instance
      const instance = await Instance.create({
        name,
        schemaId,
        data
      });
  
      res.status(201).json(instance);
    } catch (error) {
      next(error);
    }
  };

export const updateInstance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { schemaId, instanceId } = req.params;
    const data = req.body;

    // Find schema
    const schema = await Schema.findById(schemaId);
    if (!schema) {
      res.status(404).json({ message: 'Schema not found' });
      return;
    }

    // Convert MongoDB Map to plain object
    const attributes: { [key: string]: SchemaAttribute } = {};
    schema.attributes.forEach((value: SchemaAttribute, key: string) => {
      attributes[key] = value;
    });

    // Validate data against schema
    const validation = validateDataAgainstSchema(data, attributes);

    if (!validation.isValid) {
      res.status(400).json({
        message: 'Invalid data format',
        errors: validation.errors
      });
      return;
    }

    const instance = await Instance.findOneAndUpdate(
      { _id: instanceId, schemaId },
      { data },
      { new: true, runValidators: true }
    );

    if (!instance) {
      res.status(404).json({ message: 'Instance not found' });
      return;
    }

    res.json(instance);
  } catch (error) {
    next(error);
  }
};

export const getInstances = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { schemaId } = req.params;
    const instances = await Instance.find({ schemaId });
    res.json(instances);
  } catch (error) {
    next(error);
  }
};

export const getInstance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { schemaId, instanceId } = req.params;
    const instance = await Instance.findOne({
      _id: instanceId,
      schemaId
    });

    if (!instance) {
      res.status(404).json({ message: 'Instance not found' });
      return;
    }

    res.json(instance);
  } catch (error) {
    next(error);
  }
};

export const deleteInstance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { schemaId, instanceId } = req.params;
    const instance = await Instance.findOneAndDelete({
      _id: instanceId,
      schemaId
    });

    if (!instance) {
      res.status(404).json({ message: 'Instance not found' });
      return;
    }

    res.json({ message: 'Instance deleted successfully' });
  } catch (error) {
    next(error);
  }
};