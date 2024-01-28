const { Router } = require('express');
const router = Router();

//files
const Employee = require('../models/employees');

//routes
//get all routes
router.get('/', async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

//add new register
router.post('/', async(req, res) => {
    const { name, workplace, available } = req.body;
    const employee = new Employee({name, workplace, available});
    await employee.save();
    res.json({status: 'Employees Saved'});
});

//update a register
router.put('/:name', async(req, res) => {
    const { name, workplace, available } = req.body;
    const newEmployee = { name, workplace, available };
    await Employee.findOneAndUpdate({ name: req.params.name }, newEmployee, { new: true });
    res.json({status: 'Employees Updated'});

});

module.exports = router;