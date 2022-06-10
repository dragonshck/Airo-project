import express from "express";

import {allram, ramid, rammanufacturer, gamerRAM, kuliRAM, entryLevelRAM, midLevelRAM, highEndRAM, inputRAM, updateRAM, deleteRAM} from "../controllers/ramBin.js";

const router = express.Router();

router.get('/', allram);
router.get('/:id', ramid);
router.get('/brand/:brand', rammanufacturer);
router.get('/gaming/true', gamerRAM);
router.get('/gaming/false', kuliRAM);
router.get('/price/entry', entryLevelRAM);
router.get('/price/mid', midLevelRAM);
router.get('/price/high', highEndRAM);
router.post('/', inputRAM);
router.delete('/:id', deleteRAM);
router.patch('/:id', updateRAM);

export default router;