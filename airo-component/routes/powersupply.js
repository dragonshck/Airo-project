var express = require('express');
var router = express.Router();

const Validator = require('fastest-validator');

const { PowerSupplyModel } = require('../models')

const v = new Validator();

// GET ALL POWER SUPPLY DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const powersupply = await PowerSupplyModel.findAll();
    return res.json(powersupply);
});

// GET POWER SUPPLY BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const powersupply = await PowerSupplyModel.findByPk(id);
    return res.json(powersupply || {});
});

// GET POWER SUPPLY BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const powersupply = await PowerSupplyModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(powersupply || {});

});

//POST DATA POWER SUPPLY TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        wattage: 'string',
        modular: 'string',
        form_factor: 'string',
        efficiency_rating: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const powersupply = await PowerSupplyModel.create(req.body);
    res.json(powersupply)
});

// UPDATE POWER SUPPLY DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let powersupply = await PowerSupplyModel.findByPk(id);

    if (!powersupply) {
        return res.json({ message: 'Power Supply Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        wattage: 'string|optional',
        modular: 'string|optional',
        form_factor: 'string|optional',
        efficiency_rating: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    powersupply = await powersupply.update(req.body);
    res.json(powersupply)
});

//DELETE CASEFAN DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const powersupply = await PowerSupplyModel.findByPk(id);

    if (!powersupply) {
        return res.json({ message: 'Power Supply Not Found !!'});
    }

    await powersupply.destroy();
    res.json({
        message: "Power Supply Data Deleted"
    })

});
module.exports = router;