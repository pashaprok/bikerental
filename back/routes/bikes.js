const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');
const cors = require('./cors');

//route all bikes
router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bikes);
    } catch(err) {
        res.json({message: err});
    }
})
.post(cors.cors, async (req, res) => {
    const bike = new Bike({
        name: req.body.name,
        type: req.body.type,
        isRented: req.body.isRented,
        price: req.body.price
    });

    try {
        const savedBike = await bike.save();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(savedBike);
    } catch(err) {
        res.json({message: err});
    }
});

//route specific bike
router.route('/:bikeId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, async (req, res) => {
    try{
        const bike = await Bike.findById(req.params.bikeId);
        res.json(bike);
    } catch(err) {
        res.json({message: err});
    }
})
.patch(cors.cors, async (req, res) => {
    try{
        const updatedBike = await Bike.updateOne({_id: req.params.bikeId}, {
            $set: {
                name: req.body.name,
                type: req.body.type,
                isRented: req.body.isRented,
                price: req.body.price
            }
        });
        res.json(updatedBike);
    } catch(err) {
        res.json({message: err});
    }
})
.delete(cors.cors, async (req, res) => {
    try{
        const removedBike = await Bike.findByIdAndRemove(req.params.bikeId);
        res.json(removedBike);
    } catch(err) {
        res.json({message: err});
    }
})

module.exports = router;