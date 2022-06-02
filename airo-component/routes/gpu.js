var express = require('express');
var router = express.Router();

const Validator = require('fastest-validator');
const { GpuModel } = require('../models')
const { Op } = require('sequelize')

const v = new Validator();



// GET ALL GPU DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const gpu = await GpuModel.findAll();
    return res.json(gpu);
});

// GET GPU BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const gpu = await GpuModel.findByPk(id);
    return res.json(gpu || {});
});

// GET GPU BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const gpu = await GpuModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(gpu || {});

});

// GET GPU BY IS GAMING = TRUE
router.get('/gaming/true', async (req, res) =>{
    //const brand = req.params.brand;
    const gpu = await GpuModel.findAll({
        where: {
            is_gaming: true
        }
    });
    return res.json(gpu || {});

});

// GET GPU BY IS GAMING = FALSE
router.get('/gaming/false', async (req, res) =>{
    //const brand = req.params.brand;
    const gpu = await GpuModel.findAll({
        where: {
            is_gaming: false
        }
    });
    return res.json(gpu || {});

});

// GET GPU BY PRICE ENTRY
router.get('/price/entry', async (req, res) =>{
    //const brand = req.params.brand;
    const gpu = await GpuModel.findAll({
        where: {
            price_idr: {
                [Op.lt]: 5000000
            }
        }
    });
    return res.json(gpu || {});

});

// GET GPU BY PRICE MID
router.get('/price/mid', async (req, res) =>{
    //const brand = req.params.brand;
    const gpu = await GpuModel.findAll({
        where: {
            price_idr: {
                [Op.between]: [6000000, 8000000]
            }
        }
    });
    return res.json(gpu || {});

});

// GET GPU BY PRICE high
router.get('/price/high', async (req, res) =>{
    //const brand = req.params.brand;
    const gpu = await GpuModel.findAll({
        where: {
            price_idr: {
                [Op.gt]: 9000000
            }
        }
    });
    return res.json(gpu || {});

});


//POST GPU TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        chipset: 'string',
        manufacturer: 'string',
        memory: 'string',
        is_gaming: 'boolean',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const gpu = await GpuModel.create(req.body);
    res.json(gpu)
});

// UPDATE GPU DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let gpu = await GpuModel.findByPk(id);

    if (!gpu) {
        return res.json({ message: 'Case Fan Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        chipset: 'string|optional',
        manufacturer: 'string|optional',
        memory: 'string|optional',
        is_gaming: 'boolean|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    gpu = await gpu.update(req.body);
    res.json(gpu)
});

//DELETE GPU DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const gpu = await GpuModel.findByPk(id);

    if (!gpu) {
        return res.json({ message: 'GPU Not Found !!'});
    }

    await gpu.destroy();
    res.json({
        message: "GPU Data Deleted"
    })

});


module.exports = router;