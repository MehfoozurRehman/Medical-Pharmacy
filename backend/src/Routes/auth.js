const express = require("express");
const monk = require("monk");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const router = express.Router();

const db = monk(
  "mongodb+srv://admin:adminhasaccess@cluster0.nvrd4.mongodb.net/medical_pharmacy?retryWrites=true&w=majority"
);

const auth = db.get("auth");

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
    const items = await auth.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});
// read one
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await auth.findOne({
      _id: id,
    });
    if (!item) next();
    bcrypt.compare(req.body.password, item.password, (err, result) => {
      if (!result) {
        res.json({
          message: "You are not authenticated",
        });
      } else {
        res.json({
          name: item.name,
          email: item.email,
          isAdmin: item.isAdmin,
          picture: item.picture,
        });
      }
    });
  } catch (error) {
    next(error);
  }
});
// create one
router.post("/", async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    bcrypt.hash(value.password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        await auth.insert({
          name: value.name,
          email: value.email,
          password: hash,
          isAdmin: value.isAdmin,
          picture: value.picture,
          dateCreated: value.dateCreated,
          dateUpdated: value.dateUpdated,
        });
        res.json({
          name: value.name,
          email: value.email,
          isAdmin: value.isAdmin,
          picture: value.picture,
        });
      }
    });
  } catch (error) {
    next(error);
  }
});
// update one
router.put("/", async (req, res, next) => {
  try {
    // const { id } = req.params;
    const value = await schema.validateAsync(req.body);
    const item = await auth.findOne({
      email: req.body.email,
    });
    if (!item) next();
    bcrypt.compare(req.body.password, item.password, async (err, result) => {
      if (!result) {
        res.json({
          message: "Incorrect Password",
        });
      } else {
        bcrypt.hash(value.password, 10, async (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            await auth.update(
              { email: req.body.email },
              {
                $set: {
                  name: value.name,
                  email: value.email,
                  password: hash,
                  isAdmin: value.isAdmin,
                  picture: value.picture,
                  dateCreated: value.dateCreated,
                  dateUpdated: value.dateUpdated,
                },
              }
            );
            res.json({
              name: item.name,
              email: item.email,
              isAdmin: item.isAdmin,
              picture: item.picture,
            });
          }
        });
      }
    });
  } catch (error) {
    next(error);
  }
});
// delete one
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await auth.remove({
      _id: id,
    });
    res.json({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});
// delete all
router.delete("/", async (req, res, next) => {
  try {
    await auth.remove();
    res.json({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
