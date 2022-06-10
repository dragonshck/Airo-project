import express from "express";

import { allcpu, cpuid, cpumanufacturer, gamerCPU, kuliCPU, entryLevelCPU, midLevelCPU, highEndCPU, inputCPU, updateCPU, deleteCPU } from "../controllers/cpuBin.js"

const router = express.Router();

router.get('/', allcpu);
router.get('/:id', cpuid);
router.get('/brand/:brand', cpumanufacturer);
router.get('/gaming/true', gamerCPU);
router.get('/gaming/false', kuliCPU);
router.get('/price/entry', entryLevelCPU);
router.get('/price/mid', midLevelCPU);
router.get('/price/high', highEndCPU);
router.post('/', inputCPU);
router.delete('/:id', deleteCPU);
router.patch('/:id', updateCPU);

export default router;

