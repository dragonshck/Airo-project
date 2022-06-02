var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { CpuModel } = require('../models')
const { Op } = require('sequelize')

const v = new Validator();

// GET ALL CPU DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const cpu = await CpuModel.findAll();
    return res.json(cpu);
});

// GET CPU BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const cpu = await CpuModel.findByPk(id);
    return res.json(cpu || {});
});


// GET CPU BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const cpu = await CpuModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(cpu || {});

});

// GET CPU BY IS GAMING CATEGORY = TRUE
router.get('/gaming/true', async (req, res) =>{
    //const gaming = req.params.is_gaming;
    const cpu = await CpuModel.findAll({
        where: {
            is_gaming: true
        }
    });
    return res.json(cpu || {});

});

// GET CPU BY IS GAMING CATEGORY = FALSE
router.get('/gaming/false', async (req, res) =>{
    //const gaming = req.params.is_gaming;
    const cpu = await CpuModel.findAll({
        where: {
            is_gaming: false
        }
    });
    return res.json(cpu || {});

});

// GET CPU BY IS PRICE ENTRY LEVEL
router.get('/price/entry', async (req, res) =>{
    //const value = req.query.price_idr;
    const cpu = await CpuModel.findAll({
        where: { 
            price_idr:{
                [Op.lt]: 3000000
            }
        }
    });
    return res.json(cpu || {});

});

// GET CPU BY IS PRICE MID LEVEL
router.get('/price/mid', async (req, res) =>{
    //const value = req.query.price_idr;
    const cpu = await CpuModel.findAll({
        where: { 
            price_idr:{
                [Op.between]: [3000000, 5000000]
            }
        }
    });
    return res.json(cpu || {});

});

// GET CPU BY IS PRICE HIGH LEVEL
router.get('/price/high', async (req, res) =>{
    //const value = req.query.price_idr;
    const cpu = await CpuModel.findAll({
        where: { 
            price_idr:{
                [Op.gt]: 5000000
            }
        }
    });
    return res.json(cpu || {});

})



//POST DATA CPU TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        tdp: 'string',
        core_clock: 'string',
        core_count: 'string',
        is_gaming: 'boolean',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const cpu = await CpuModel.create(req.body);
    res.json(cpu)
});

// UPDATE CPU DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let cpu = await CpuModel.findByPk(id);

    if (!cpu) {
        return res.json({ message: 'Case Fan Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        tdp: 'string|optional',
        core_clock: 'string|optional',
        core_count: 'string|optional',
        is_gaming: 'boolean|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    cpu = await cpu.update(req.body);
    res.json(cpu)
});

//DELETE CASEFAN DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const cpu = await CpuModel.findByPk(id);

    if (!cpu) {
        return res.json({ message: 'CPU Not Found !!'});
    }

    await cpu.destroy();
    res.json({
        message: "CPU Data Deleted"
    })

});

module.exports = router;