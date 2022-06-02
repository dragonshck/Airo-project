var express = require('express');
var router = express.Router();

const Validator = require('fastest-validator');

const { RamModel } = require('../models')
const { Op } = require('sequelize')
const v = new Validator();


// GET ALL RAM DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const ram = await RamModel.findAll();
    return res.json(ram);
});

// GET RAM BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const ram = await RamModel.findByPk(id);
    return res.json(ram || {});
});

// GET RAM BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const ram = await RamModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(ram || {});

});


// GET RAM BY IS_GAMING = TRUE
router.get('/gaming/true', async (req, res) =>{
    //const brand = req.params.brand;
    const ram = await RamModel.findAll({
        where: {
            is_gaming: true
        }
    });
    return res.json(ram || {});

});

// GET RAM BY IS_GAMING = FALSE
router.get('/gaming/false', async (req, res) =>{
    //const brand = req.params.brand;
    const ram = await RamModel.findAll({
        where: {
            is_gaming: false
        }
    });
    return res.json(ram || {});

});

// GET RAM BY IS PRICE ENTRY LEVEL
router.get('/price/entry', async (req, res) =>{
    //const value = req.query.price_idr;
    const ram = await RamModel.findAll({
        where: { 
            price_idr:{
                [Op.lt]: 500000
            }
        }
    });
    return res.json(ram || {});

});

// GET RAM BY IS PRICE MID LEVEL
router.get('/price/mid', async (req, res) =>{
    //const value = req.query.price_idr;
    const ram = await RamModel.findAll({
        where: { 
            price_idr:{
                [Op.between]: [500000, 800000]
            }
        }
    });
    return res.json(ram || {});

});

// GET RAM BY IS PRICE HIGH LEVEL
router.get('/price/high', async (req, res) =>{
    //const value = req.query.price_idr;
    const ram = await RamModel.findAll({
        where: { 
            price_idr:{
                [Op.gt]: 800000
            }
        }
    });
    return res.json(ram || {});

});

//POST DATA RAM TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        color: 'string|optional',
        modules: 'string',
        speed: 'string',
        is_gaming: 'boolean',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const ram = await RamModel.create(req.body);
    res.json(ram)
});

// UPDATE CASE FAN DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let ram = await RamModel.findByPk(id);

    if (!ram) {
        return res.json({ message: 'RAM Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        color: 'string|optional',
        modules: 'string|optional',
        speed: 'string|optional',
        is_gaming: 'boolean|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    ram = await ram.update(req.body);
    res.json(ram)
});

//DELETE CASEFAN DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const ram = await RamModel.findByPk(id);

    if (!ram) {
        return res.json({ message: 'RAM Not Found !!'});
    }

    await ram.destroy();
    res.json({
        message: "RAM Data Deleted"
    })

});

module.exports = router;