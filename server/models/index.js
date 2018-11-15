const db = require('./db');
const Sequelize = require('sequelize');

const Place = db.define('place', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  phone: Sequelize.STRING
});

const Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_stars: Sequelize.FLOAT,
  amenities: Sequelize.STRING
});

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cuisine: Sequelize.STRING,
  price: Sequelize.INTEGER
});

const Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age_range: Sequelize.STRING
});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
  Place,
  Hotel,
  Restaurant,
  Activity,
  db
}
