import express, { Router } from 'express';
import {
  createInstance,
  getInstances,
  getInstance,
  updateInstance,
  deleteInstance
} from '../controllers/instance.controller';

const router: Router = express.Router({ mergeParams: true });

router.post('/', createInstance);
router.get('/', getInstances);
router.get('/:instanceId', getInstance);
router.put('/:instanceId', updateInstance);
router.delete('/:instanceId', deleteInstance);

export default router;