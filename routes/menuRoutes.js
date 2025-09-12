const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log("Data saved!");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error!' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Data fetched successfully!");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error!' });
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const response = await MenuItem.find({ taste: taste });
            console.log("Data fetched!");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid taste type!' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error!' });
    }
})

module.exports = router;