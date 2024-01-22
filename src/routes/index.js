const { Router } = require('express');
const router = Router();

//files
const employees = require('../employees.json');

//routes
//get all routes
router.get('/employees', (req, res) => {
    res.send(employees);
});

//add new register
router.post('/employees', (req, res) => {
    const { name, workplace, available } = req.body;
    if (name && workplace && available) {
        const id = employees.length + 1;
        const newEmployees = { id, ...req.body };
        employees.push(newEmployees);
        res.json(newEmployees);
    } else {
        res.status(500).json({ error: 'There was an error' })
    }
});

//update a register
router.put('/employees/:name', (req, res) => {
    const { name } = req.params;
    const { available } = req.body;
    if (name && available) {
        employees.forEach((employee) => {
            if (employee.name == name) {
                // employee.name = name
                employee.available = available;
            }
        });
        res.json(employees);
    }else {
        res.status(500).json({ error: 'Name is required.' });
    };
});

module.exports = router;