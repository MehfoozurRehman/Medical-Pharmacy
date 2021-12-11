const express = require("express");
const monk = require("monk");
const Joi = require("@hapi/joi");

const router = express.Router();

const db = monk(
  "mongodb+srv://admin:adminhasaccess@cluster0.nvrd4.mongodb.net/medical_pharmacy?retryWrites=true&w=majority"
);

const users = db.get("users");

const schema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  isAdmin: Joi.bool(),
  picture: Joi.string().trim(),
  dateCreated: Joi.date().required(),
  dateUpdated: Joi.date().required(),
});

// read all
router.get("/", async (req, res, next) => {
  try {
    const items = await users.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});
// read one
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await users.findOne({
      _id: id,
    });
    if (!item) next();
    res.json(item);
  } catch (error) {
    next(error);
  }
});
// create one
router.post("/", async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await users.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});
// update one
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await schema.validateAsync(req.body);
    const item = await users.findOne({
      _id: id,
    });
    if (!item) next();
    await users.update(
      { _id: id },
      {
        $set: value,
      }
    );
    res.json(value);
  } catch (error) {
    next(error);
  }
});
// delete one
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await users.remove({
      _id: id,
    });
    res.json({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});
// delete one
router.delete("/", async (req, res, next) => {
  try {
    await users.remove();
    res.json({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
