const express = require('express');
const router = express.Router();
const actions = require('../data/helpers/actionModel.js');

//READ
router.get("/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.status(500).json({ message: "Must have ID" });
    } else {
      actions
        .get(id)
        .then((response) => {
          res.status(200).json({ response });
        })
        .catch((error) => {
          res
            .status(404)
            .json({ message: "There was an error with your request" });
        });
    }
  });
  
  //CREATE
  router.post("/", (req, res) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      res
        .status(500)
        .json({ message: "Must provide project ID, description and notes" });
    } else if (description.length > 127) {
      res
        .status(500)
        .json({ message: "Description must be less than 128 characters" });
    } else {
      actions
        .insert(req.body)
        .then((response) => {
          res.status(201).json({ response });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(404)
            .json({ message: "Can not complete your request at this time" });
        });
    }
  });
  

  //UPDATE
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!id) {
      res.status(500).json({ message: "Must provide ID" });
    } else {
      actions
        .update(id, changes)
        .then((response) => {
          res.status(200).json({ response });
        })
        .catch((error) => {
          res.status(404).json({ message: "There was an error" });
        });
    }
  });
  

  //DELETE
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.status(500).json({ message: "Must provide ID" });
    } else {
      actions
        .remove(id)
        .then((response) => {
          res.status(200).json({ response });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(404)
            .json({ message: "there was an error deleting at this time" });
        });
    }
  });
  
  module.exports = router;
  