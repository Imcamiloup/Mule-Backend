const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_NAME } = process.env;

const AdminModel = require("../models/Admin");
const ClientModel = require("../models/Client");
const DriverModel = require("../models/Driver");
const FreigthModel = require("../models/Freigth");
const VehicleModel = require("../models/Vehicle");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE_NAME}`,
  { logging: false }
);

AdminModel(sequelize);
ClientModel(sequelize);
DriverModel(sequelize);
FreigthModel(sequelize);
VehicleModel(sequelize);

const { Admin, Client, Driver, Freigth, Vehicle } = sequelize.models;



module.exports = sequelize;
