import express, { Router } from 'express';
import {
  createSchema,
  getSchemas,
  getSchemaById,
  updateSchema,
  deleteSchema
} from '../controllers/schema.controller';

const router: Router = express.Router();

router.post('/', createSchema);
router.get('/', getSchemas);
router.get('/:id', getSchemaById);
router.put('/:id', updateSchema);
router.delete('/:id', deleteSchema);

export default router;