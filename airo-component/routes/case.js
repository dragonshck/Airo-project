var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');
const { Op } = require('fastest-validator');

const { CaseModel } = require('../models')

const v = new Validator();

// GET ALL CASE DATA FROM DATABASE
router.get('/', async (req, res) =>{
    const cases = await CaseModel.findAll();
    return res.json(cases);
});

// GET CASE BY ID
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const cases = await CaseModel.findByPk(id);
    return res.json(cases || {});
});

// GET CASE BY BRAND
router.get('/brand/:brand', async (req, res) =>{
    const brand = req.params.brand;
    const cases = await CaseModel.findAll({
        where: {
            brand: brand
        }
    });
    return res.json(cases || {});

});



//POST DATA CASE TO DATABASE
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        price_idr: 'number',
        brand: 'string',
        color: 'string|optional',
        power_supply: 'string',
        side_panel: 'string',
        type: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }

    const cases = await CaseModel.create(req.body);
    res.json(cases)
});

// UPDATE CASE DATA TO DATABASE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
 
    let cases = await CaseModel.findByPk(id);

    if (!cases) {
        return res.json({ message: 'Case Not Found !!'});
    }

    
    const schema = {
        name: 'string|optional',
        price_idr: 'number|optional',
        brand: 'string|optional',
        color: 'string|optional',
        power_supply: 'string|optional',
        side_panel: 'string|optional',
        type: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res
        .status(400)
        .json(validate);

    }
    
    cases = await cases.update(req.body);
    res.json(cases);

});

//DELETE CASE DATA FROM DATABASE

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
 
    const cases = await CaseModel.findByPk(id);

    if (!cases) {
        return res.json({ message: 'Case Not Found !!'});
    }

    await cases.destroy();
    res.json({
        message: "Case Data Deleted"
    })

});
module.exports = router;