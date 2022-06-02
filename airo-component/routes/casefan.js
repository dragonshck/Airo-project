var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { CaseFanModel } = require('../models')

const v = new Validator();
// GET ALL CASE FAN DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const casefan = await CaseFanModel.findAll();
    return res.json(casefan);
});

// GET CASE FAN BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const casefan = await CaseFanModel.findByPk(id);
    return res.json(casefan || {});
});

// GET CASE FAN BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const casefan = await CaseFanModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(casefan || {});

});

//POST DATA CASE FAN TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        airflow: 'string',
        color: 'string|optional',
        noise_level: 'string',
        pwm: 'boolean',
        rpm: 'string',
        size: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const casefan = await CaseFanModel.create(req.body);
    res.json(casefan)
});

// UPDATE CASE FAN DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let casefan = await CaseFanModel.findByPk(id);

    if (!casefan) {
        return res.json({ message: 'Case Fan Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        airflow: 'string|optional',
        color: 'string|optional',
        noise_level: 'string|optional',
        pwm: 'boolean|optional',
        rpm: 'string|optional',
        size: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    casefan = await casefan.update(req.body);
    res.json(casefan)
});

//DELETE CASEFAN DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const casefan = await CaseFanModel.findByPk(id);

    if (!casefan) {
        return res.json({ message: 'Case Fan Not Found !!'});
    }

    await casefan.destroy();
    res.json({
        message: "Case Fan Data Deleted"
    })

});

module.exports = router;