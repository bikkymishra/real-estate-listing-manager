const express = require("express");
const router = express.Router();

const Property = require("../models/Property");

// GET all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET a single property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE a property by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, price, location, type } = req.body;

    // Validation
    if (!title || !price || !location || !type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title,
        price,
        location,
        type,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST a new property
router.post("/", async (req, res) => {
  try {
    const { title, price, location, type } = req.body;

    // Validation
    if (!title || !price || !location || !type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newProperty = new Property({
      title,
      price,
      location,
      type,
    });

    const savedProperty = await newProperty.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
// GET one property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// UPDATE a property
router.put("/:id", async (req, res) => {
  try {
    const { title, price, location, type } = req.body;

    if (!title || !price || !location || !type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title,
        price,
        location,
        type,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// DELETE a property
router.delete("/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});