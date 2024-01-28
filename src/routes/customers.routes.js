const { Router } = require('express');
const router = Router();

//files
const Customer = require('../models/customers');

//routes
//get all routes
router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});

//add meny registers
router.post('/', async(req,res) => {
    const customers = req.body;
    await Customer.insertMany(customers);
    res.json({ status: 'Customers Saved' });
});

//update a register
router.put('/:id', async(req, res) => {
    const { name, customerName, workplace, available } = req.body;
    const newCustomer = { name, customerName, workplace, available };
    await Customer.findByIdAndUpdate(req.params.id, newCustomer);
    res.json({status: 'Customer Updated'});

});

module.exports = router;