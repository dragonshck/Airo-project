import express from 'express';

import { allmobo, moboid, mobomanufacturer, gamerMotherboard, kuliMotherboard, entryLevelMotherboard, midLevelMotherboard, highEndMotherboard, inputMotherboard, updateMotherboard, deleteMotherboard } from '../controllers/motherboardBin.js';

const router = express.Router();

router.get('/', allmobo);
router.get('/:id', moboid);
router.get('/brand/:brand', mobomanufacturer);
router.get('/gaming/true', gamerMotherboard);
router.get('/gaming/false', kuliMotherboard);
router.get('/price/entry', entryLevelMotherboard);
router.get('/price/mid', midLevelMotherboard);
router.get('/price/high', highEndMotherboard);
router.post('/', inputMotherboard);
router.delete('/:id', deleteMotherboard);
router.patch('/:id', updateMotherboard);

export default router;