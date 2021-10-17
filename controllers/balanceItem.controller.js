const BalanceItem = require('../models/BalanceItem');
const { validationResult } = require('express-validator');

module.exports.getPaidItems = async (req, res) => {
  try {
    const paidItems = await BalanceItem.find({ sourceBalance: req.body.id });
    res.json(paidItems);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};

module.exports.create = async (req, res) => {
  try {
    const { paidItemName, price, id } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Название и сумма не могут быть пустыми',
      });
    }

    const paidItem = await BalanceItem({
      paidItemName,
      price,
      sourceBalance: id,
      user: req.user.userId,
    });

    await paidItem.save((err) => {
      if (err) {
        console.log({ message: err });
      }
    });

    res.status(201).json({ message: 'Удачно' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};

module.exports.delete = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};