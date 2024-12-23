import { Request, Response, NextFunction } from 'express';
import Schema from '../models/Schema';
import { validateSchemaStructure } from '../utils/validation';


export const createSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, attributes } = req.body;

    if (!name || typeof name !== 'string') {
      res.status(400).json({ message: 'Invalid schema name' });
      return;
    }

    const existingSchema = await Schema.findOne({ name });
    if (existingSchema) {
      res.status(409).json({ message: 'Schema with this name already exists' });
      return;
    }

    if (!attributes || typeof attributes !== 'object') {
      res.status(400).json({ message: 'Invalid attributes' });
      return;
    }

    const validation = validateSchemaStructure(attributes);
    if (!validation.isValid) {
      res.status(400).json({ 
        message: 'Invalid schema structure', 
        errors: validation.errors 
      });
      return;
    }

    const schema = await Schema.create({
      name,
      attributes
    });

    res.status(201).json(schema);
  } catch (error:any) {
    if (error.code === 11000) { // MongoDB duplicate 
      res.status(409).json({ message: 'Schema with this name already exists' });
      return;
    }
    next(error);
  }
};

export const getSchemas = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schemas = await Schema.find();
    res.json(schemas);
  } catch (error) {
    next(error);
  }
};

export const getSchemaById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schema = await Schema.findById(req.params.id);
    if (!schema) {
      res.status(404).json({ message: 'Schema not found' });
      return;
    }
    res.json(schema);
  } catch (error) {
    next(error);
  }
};

export const updateSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, attributes } = req.body;

    if (attributes) {
      const validation = validateSchemaStructure(attributes);
      if (!validation.isValid) {
        res.status(400).json({ 
          message: 'Invalid schema structure', 
          errors: validation.errors 
        });
        return;
      }
    }

    const schema = await Schema.findByIdAndUpdate(
      req.params.id,
      { name, attributes },
      { new: true, runValidators: true }
    );
    if (!schema) {
      res.status(404).json({ message: 'Schema not found' });
      return;
    }
    res.json(schema);
  } catch (error) {
    next(error);
  }
};

export const deleteSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schema = await Schema.findByIdAndDelete(req.params.id);
    if (!schema) {
      res.status(404).json({ message: 'Schema not found' });
      return;
    }
    res.json({ message: 'Schema deleted successfully' });
  } catch (error) {
    next(error);
  }
};