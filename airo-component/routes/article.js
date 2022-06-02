var express = require('express');
var router = express.Router();

const Validator = require('fastest-validator');

const { ArticleModel } = require('../models')

const v = new Validator();


// GET ALL ARTICLE FROM DATABASE
router.get('/', async (req, res) =>{
    const article = await ArticleModel.findAll();
    return res.json(article);
});

// GET ARTICLE BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const article = await ArticleModel.findByPk(id);
    return res.json(article || {});
});

//POST DATA ARTICLE TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        judul: 'string',
        image_url: 'string|optional',
        isi_artikel: 'string'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const article = await ArticleModel.create(req.body);
    res.json(article)
});

// UPDATE ARTICLE DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let article = await ArticleModel.findByPk(id);

    if (!article) {
        return res.json({ message: 'Article Not Found !!'});
    }

    
    const schema = {
        judul: 'string|optional',
        image_url: 'string|optional',
        isi_artikel: 'string|optional',
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    article = await article.update(req.body);
    res.json(article);

});

//DELETE ARTICLE DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const article = await ArticleModel.findByPk(id);

    if (!article) {
        return res.json({ message: 'Article Not Found !!'});
    }

    await article.destroy();
    res.json({
        message: "Article Data Deleted"
    })

});



module.exports = router;