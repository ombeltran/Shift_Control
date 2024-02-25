const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');

// Files
const Users = require('../models/users');

// Validate password
router.post('/validate', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await Users.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ error: 'Incorrect username' });
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (validPassword) {
            res.status(201).json({ status: 'Successfully login' });
        } else {
            res.status(500).json({ error: 'Wrong password' });
        }
    } catch (error) {
        console.error('Error login user:', error);
        res.status(500).json({ error: 'Wrong user name or password' });
    }
});

// New user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ status: 'User successfully registered' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Update password
router.put('/:user', async (req, res) => {
    try {
        const { username, password, newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ error: 'Password is required for updating user' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const newUser = { username, password: hashedPassword };

        await Users.findOneAndUpdate({ username: req.params.user }, newUser, { new: true });
        res.json({ status: 'User Updated' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
