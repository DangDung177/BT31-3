var express = require('express');
var router = express.Router();
const roleSchema = require('../schemas/role');

const { check_authentication } = require("../utils/check_auth");
const { isAdmin } = require("../utils/check_role");

// GET all roles - không yêu cầu đăng nhập
router.get('/', async function (req, res, next) {
  try {
    let roles = await roleSchema.find({});
    res.send({
      success: true,
      data: roles
    });
  } catch (error) {
    next(error);
  }
});

// CREATE role - chỉ ADMIN
router.post('/', check_authentication, isAdmin, async function (req, res, next) {
  try {
    let body = req.body;
    let newRole = new roleSchema({
      name: body.name
    });
    await newRole.save();
    res.status(200).send({
      success: true,
      data: newRole
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE role - chỉ ADMIN
router.put('/:id', check_authentication, isAdmin, async function (req, res, next) {
  try {
    let body = req.body;
    let role = await roleSchema.findByIdAndUpdate(req.params.id, { name: body.name }, { new: true });
    res.status(200).send({
      success: true,
      data: role
    });
  } catch (error) {
    next(error);
  }
});

// DELETE role - chỉ ADMIN
router.delete('/:id', check_authentication, isAdmin, async function (req, res, next) {
  try {
    let role = await roleSchema.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      data: role
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
