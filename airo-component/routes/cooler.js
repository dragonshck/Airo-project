var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { CoolerModel } = require('../models')

const v = new Validator();

// GET ALL COOLER DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const cooler = await CoolerModel.findAll();
    return res.json(cooler)
});

// GET COOLER BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const cooler = await CoolerModel.findByPk(id);
    return res.json(cooler || {});
});

// GET COOLER BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const cooler = await CoolerModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(cooler || {});

});

//POST DATA COOLER TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        color: 'string|optional',
        fan_rpm: 'string',
        noise_level: 'string',
        type: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const cooler = await CoolerModel.create(req.body);
    res.json(cooler)
});

// UPDATE COOLER DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let cooler = await CoolerModel.findByPk(id);

    if (!cooler) {
        return res.json({ message: 'Cooler Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        color: 'string|optional|optional',
        fan_rpm: 'string|optional',
        noise_level: 'string|optional',
        type: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    cooler = await cooler.update(req.body);
    res.json(cooler)
});

//DELETE COOLER DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const cooler = await CoolerModel.findByPk(id);

    if (!cooler) {
        return res.json({ message: 'Cooler Not Found !!'});
    }

    await cooler.destroy();
    res.json({
        message: "Cooler Data Deleted"
    })

});

module.exports = router;