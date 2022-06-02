var express = require('express');
var router = express.Router();

const Validator = require('fastest-validator');

const { MoboModel } = require('../models')

const v = new Validator();

// GET ALL MOTHERBOARD DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const mobo = await MoboModel.findAll();
    return res.json(mobo);
});

// GET MOTHERBOARD BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const mobo = await MoboModel.findByPk(id);
    return res.json(mobo || {});
});

// GET MOTHERBOARD BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const mobo = await MoboModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(mobo || {});

});

//POST DATA MOTHERBOARD TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        color: 'string|optional',
        form_factor: 'string',
        max_memory: 'string',
        socket_cpu: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const mobo = await MoboModel.create(req.body);
    res.json(mobo)
});

// UPDATE MOTHERBOARD DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let mobo = await MoboModel.findByPk(id);

    if (!mobo) {
        return res.json({ message: 'Motherboard Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        color: 'string|optional',
        form_factor: 'string|optional',
        max_memory: 'string|optional',
        socket_cpu: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    mobo = await mobo.update(req.body);
    res.json(mobo)
});

//DELETE CASEFAN DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const mobo = await MoboModel.findByPk(id);

    if (!mobo) {
        return res.json({ message: 'Motherboard Not Found !!'});
    }

    await mobo.destroy();
    res.json({
        message: "Motherboard Data Deleted"
    })

});

module.exports = router;