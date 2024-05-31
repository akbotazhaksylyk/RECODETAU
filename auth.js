const express = require('express');
const router = express.Router();
const User = require('./models/User');
// Import bcrypt if you want to hash passwords
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try {
        // Hash password before saving it to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with the hashed password
        const newUser = new User({
            name: req.body.name,
            place: req.body.place,
            email: req.body.email,
            password: hashedPassword
        });

        // Save the new user
        await newUser.save();

        // Redirect to login page or wherever you want
        res.redirect('/overview');
    } catch (err) {
        console.error(err);
        // Handle errors, maybe render form again with error messages
        res.status(500).send('Error registering new user, please try again.');
    }
});

module.exports = router;
