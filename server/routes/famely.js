const express = require("express");
const bcrypt = require("bcrypt");
const { FamelyModel } = require("../models/famely"); // Update the import path to the correct location
const { checkName } = require("../db/checkName");
const { createNewUser } = require("../services/femely.service");

const router = express.Router();

// Listener for the homepage route as configured in the rout
router.get("/", async (req, res) => {
  try {
    const famelys = await FamelyModel.find();
    res.json(famelys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/checkValidity", async (req, res) => {
  try {
    const famely = await FamelyModel.findOne({ name: req.body.name });
    if (!famely) {
      res.json({ ok: false });
    }
    bcrypt.compare(req.body.pass, famely.pass, (error, result) => {
      if (!result) {
        res.json({ ok: false });
      } else {
        res.json(famely);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Update a famely `b`y ID
router.put("/:idEdit", async (req, res) => {
  try {
    const updateData = req.body;
    const updatedFamily = await FamelyModel.findByIdAndUpdate(
      req.params.idEdit,
      updateData,
      { new: true } // This option returns the modified document
    );

    // Check if the document was found and updated
    if (!updatedFamily) {
      return res.status(404).json({ message: "Family not found" });
    }

    res.json(updatedFamily);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating family" });
  }
});
// Create a new famely
router.post("/", async (req, res) => {
  try {
    const user = await createNewUser({
      name: req.body.name,
      pass: req.body.pass,
    });

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
