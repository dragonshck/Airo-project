import express from "express";

import { allarticle, articleid, inputArticle } from "../controllers/articleBin.js";
const router = express.Router();

router.get('/', allarticle);
router.get('/:id', articleid);
router.post('/', inputArticle);

export default router;