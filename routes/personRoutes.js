const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

router.post("/", async (req, res) => {
    try {
        const data = req.body; //assuming the request body contains the person data

        //create a new person document using the mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error!" });
    }
});

router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "waiter" || workType == "manager") {
            const response = await Person.find({ work: workType });
            console.log("Data fetched!");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid work type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error!" });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched!");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error!" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(
            personId,
            updatedPersonData,
            {
                new: true, //Return updated document
                runValidators: true, //Run mongoose validation
            }
        );
        if (!response) {
            return res.status(404).json({ error: "Person not found!" });
        }

        console.log("Data updated!");
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: "Internal server error!" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found!' });
        }
        console.log('Data deleted');
        res.status(200).json({ message: 'person deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error!' });
    }
})
module.exports = router;
