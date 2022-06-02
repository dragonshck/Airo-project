var express = require('express');
var router = express.Router();

const Validator = require('fastest-validator');

const { StorageModel } = require('../models')

const v = new Validator();

// GET ALL STORAGE DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const storage = await StorageModel.findAll();
    return res.json(storage);
});

// GET STORAGE BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const storage = await StorageModel.findByPk(id);
    return res.json(storage || {});
});

// GET STORAGE BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const storage = await StorageModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(storage || {});

});



//POST STORAGE TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        capacity: 'string',
        connection: 'string',
        form_factor: 'string',
        type: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const storage = await StorageModel.create(req.body);
    res.json(storage)
});

// UPDATE CASE FAN DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let storage = await StorageModel.findByPk(id);

    if (!storage) {
        return res.json({ message: 'Storage Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        capacity: 'string|optional',
        connection: 'string|optional',
        form_factor: 'string|optional',
        type: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    storage = await storage.update(req.body);
    res.json(storage)
});

//DELETE CASEFAN DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const storage = await StorageModel.findByPk(id);

    if (!storage) {
        return res.json({ message: 'Storage Not Found !!'});
    }

    await storage.destroy();
    res.json({
        message: "Storage Data Deleted"
    })

});


module.exports = router;