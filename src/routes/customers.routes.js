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

//get routes by name and available
router.get('/:name/:available', async (req, res) => {
    const { name, available } = req.params;
    try {
        const customers = await Customer.find({ name, available });
        res.json(customers);
    } catch (error) {
        console.error('Error finding customer data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get routes by name and turn
router.get('/name/:name/:turn', async (req, res) => {
    const { name, turn } = req.params;
    try {
        const customers = await Customer.find({ name, turn });
        res.json(customers);
    } catch (error) {
        console.error('Error finding customer data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//add meny registers
router.post('/', async (req, res) => {
    const customers = req.body;
    await Customer.insertMany(customers);
    res.json({ status: 'Customers Saved' });
});

//update a register
router.put('/:name/:turn', async (req, res) => {
    const { name, customerName, workplace, turn, available, served, servedId } = req.body;
    const newCustomer = { name, customerName, workplace, turn, available, served, servedId };
    await Customer.findOneAndUpdate({ name: req.params.name, turn: req.params.turn }, newCustomer, { new: true });
    res.json({ status: 'Customer Updated' });
});

//update all registers for available and customerName
router.put('/updateKeys', async (req, res) => {
    const { newAvailableValue, newCustomerNameValue } = req.body;

    try {
        await Customer.updateMany({}, { $set: { available: newAvailableValue, customerName: newCustomerNameValue } });
        res.json({ status: 'Updating values in all documents' });
    } catch (error) {
        console.error('Error updating values in all documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//update all registers
router.put('/reset', async (req, res) => {
    try {
        await Customer.updateMany({}, { $set: { customerName: "", available: "yes", served: "no", servedId: 0 } });
        res.json({ status: 'Updating values in all documents' });
    } catch (error) {
        console.error('Error updating values in all documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;