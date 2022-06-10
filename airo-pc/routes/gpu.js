import express from "express";

import {allgpu, gpuid, gpumanufacturer, gamerGPU, kuliGPU, entryLevelGPU, midLevelGPU, highEndGPU, inputGPU, updateGPU, deleteGPU} from "../controllers/gpuBin.js";

const router = express.Router();

router.get('/', allgpu);
router.get('/:id', gpuid);
router.get('/brand/:brand', gpumanufacturer);
router.get('/gaming/true', gamerGPU);
router.get('/gaming/false', kuliGPU);
router.get('/price/entry', entryLevelGPU);
router.get('/price/mid', midLevelGPU);
router.get('/price/high', highEndGPU);
router.post('/', inputGPU);
router.delete('/:id', deleteGPU);
router.patch('/:id', updateGPU);

export default router;

