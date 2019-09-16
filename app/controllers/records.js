const modelRecords = require('../models/records');

const functions = require('../../_config/functions');

// Model functions ->
exports.getRecords = (req, res) => {

  const { startDate, endDate, minCount, maxCount } = req.body

  // Checking input values
  if (!functions.isValidDate(startDate) || !functions.isValidDate(endDate) ||
      !parseInt(minCount)               || !parseInt(maxCount) ) 
    {
      return res.status(400).send({
        code: 2,
        msg: 'Please check your input values.'
      });
      // todo; addLog failed
  }
  
  modelRecords.aggregate([
    {
      // Adding "totalCount"
      $addFields: {
        totalCount: { $sum: "$counts" }
      }
    },
    {
      // Adding input filters
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        },
        totalCount: {
          $gt: parseInt(minCount),
          $lt: parseInt(maxCount)
        }              
      }
    },
    {
      // Selecting fields
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1
      }
    }
  ]).exec((err, data) => {
    if (err) {
      return res.status(500).send({
        code: 3,
        msg: 'Something go wrong with your request.'
      });
      // todo; addLog failed
    }
    res.status(200).send({
      code: 0,
      msg: 'Success',
      records: data
    });
    // todo; addLog success
  })
}

module.exports