const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  const allAttractions = {};

  Promise.all([
    models.Hotel.findAll({
      include: ['place']
    }),
    models.Restaurant.findAll({
      include: ['place']
    }),
    models.Activity.findAll({
      include: ['place']
    })
  ])
    .then(values => {
      [
        allAttractions.hotels,
        allAttractions.restaurants,
        allAttractions.activities
      ] = values;
      res.json(allAttractions);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;
